const express = require('express');
const router = express.Router();

const GeoData = require('../src/geo-data');

router.get('/api/path', (req, res, next) => {
  GeoData.getTrace()
    .then(points => res.send(points))
    .catch(next)
});

router.get('/api/data', (req, res, next) => {
  // ToDo
});

router.get('/api/transect', (req, res, next) => {
  res.send({
    planned: GeoData.planned,
    limitEast: GeoData.limitEast,
    limitWest: GeoData.limitWest
  })
});

module.exports = router;
