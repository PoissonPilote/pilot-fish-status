const GeoData = module.exports;
const pg = require('./postgresql');
const uuid = require('uuid');
const SQL = require('sql-template');
const _ = require('lodash');


GeoData.planned = [
  {"x": 50.28341066036231, "y": -4.099965205703702},
  {"x": 49.46669828578129, "y": -3.1124501431219125},
  {"x": 49.25418508359819, "y": -2.5166659769336794},
  {"x": 48.93830412480373, "y": -2.4375005663552116},
  {"x": 48.64999032281427, "y": -2.0416016510681554}
]

GeoData.limitEast = [
  {"x": 50.14999340012238, "y": -3.7999936045625056},
  {"x": 50.05836109096597, "y": -3.533312257773267 },
  {"x": 49.64169718331717, "y": -2.9666682926421712},
  {"x": 49.45837827198426, "y": -2.8666897359942247},
  {"x": 49.36667633413579, "y": -2.683350801476293 },
  {"x": 49.29168541193866, "y": -2.4833218257856853},
  {"x": 48.94587241113839, "y": -2.345822116296906 },
  {"x": 48.73164611988923, "y": -2.0541326561466713},
  {"x": 48.65001413122865, "y": -2.0416465650648523}
]

GeoData.limitWest = [
  {"x": 50.0833318946359, "y": -4.0000225802531135},
  {"x": 49.4583314276314, "y": -3.3499284092586374},
  {"x": 49.2250408295279, "y": -2.5832644512362735},
  {"x": 48.9333092520255, "y": -2.5166659769336794},
  {"x": 48.7316758318984, "y": -2.3132864170894614},
  {"x": 48.6499962749189, "y": -2.0416285994661734}
]

GeoData.getTrace = () => {
  return pg.query(SQL`SELECT position_id, point, depth, boat, datetime from position order by datetime asc`)
    .then(
      res => _.groupBy(res, 'boat'));
}

GeoData.addPoint = ({x, y, depth, boat, datetime}) => {
  const position_id = uuid.v4();
  return pg.query(
    SQL`insert into position (position_id, point, depth, boat, datetime) values
        (${position_id}, ${'(' + x +',' + y + ')'}::point, ${depth}, ${boat}::boat, ${datetime})`
  ).then(() => ({
      position_id,
      point: {x, y},
      depth,
      boat,
      datetime
  }));
}
