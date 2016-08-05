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
