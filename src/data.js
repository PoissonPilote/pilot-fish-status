const Data = module.exports;
const pg = require('./postgresql');
const uuid = require('uuid');
const SQL = require('sql-template');
const _ = require('lodash');
const moment = require('moment');
const Promise = require('bluebird');

const GeoData = require('./geo-data.js');


Data.handleBatch = (values) => {
  return Promise.all(values.map(Data.handleBatchElement));
}

Data.handleBatchElement = (element) => {
  const datetime = moment(element.datetime);

  return pg.query(
    SQL`insert into data (datum_id, raw_data, paddle, oxygen, datetime) values
    (${uuid.v4()}, ${JSON.stringify(element)}::json, ${element.paddle}, ${element.oxygen}, ${datetime})`
  ).then((e,r) => {
    return Promise.all(["boat-1", "boat-2", "sub"].map(Data.handlePosition(element, datetime)));
  });
}

Data.cleanupPositions = (element, boat) => {
  if(element[boat + "[x]"] && element[boat + "[y]"] || element[boat + "[depth]"]) {
    element[boat] = {
      x: element[boat + "[x]"],
      y: element[boat + "[y]"],
      depth: element[boat + "[depth]"]
    }
  }
  return element;
}

Data.handlePosition = (element, datetime) => (boat) => {
  element = Data.cleanupPositions(element, boat);
  if(element[boat]) {
    const {x, y, depth} = element[boat];;
    return GeoData.addPoint({x, y, depth, boat, datetime})
  } else {
    return Promise.resolve({});
  }
}

Data.getLast = (item) => {
  if(item === 'paddle' || item === 'oxygen') {
    return pg.query(`select ${item} from data where ${item} is not null order by datetime limit 1`)
      .then(r => r[0][item]);
  } else {
    return null;
  }
}

Data.getLastItems = () => {
  return Promise.props({
      paddle: Data.getLast('paddle'),
      oxygen: Data.getLast('oxygen')
  });
}
