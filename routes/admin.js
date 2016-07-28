const express = require('express');
const router = express.Router();
const auth = require('express-authentication');
const basic = require('express-authentication-basic');
const moment = require('moment');

const GeoData = require('../src/geo-data');

const basicAuth = basic((creds, cb) => {
  if((creds.username === process.env.BOAT1_USER && creds.password === process.env.BOAT1_PASSWORD) ||
     (creds.username === process.env.BOAT2_USER && creds.password === process.env.BOAT2_PASSWORD)) {
    cb(null, true, { user: creds.username });
  } else {
    cb(null, false, { error: 'Invalid user' });
  }
});

router.use(basicAuth);

router.post('/api/path', auth.required(), (req, res, next) => {
  const vessel = auth.of(req).authentication.user;
  const x = parseFloat(req.body.x, 10)
  const y = parseFloat(req.body.y, 10)

  const odepth = parseFloat(req.body.depth, 10)
  if(vessel === 'boat-1' || vessel === 'boat-2') depth = 0;
  else depth = odepth;

  const datetime = moment(req.body.datetime);

  if(!isNaN(x) && !isNaN(y) && !isNaN(depth) && datetime.isValid()) {
    GeoData.addPoint({x, y, depth, boat: auth.of(req).authentication.user, datetime})
      .then(() => res.sendStatus(201))
      .catch(next)
  } else {
    res.sendStatus(400);
  }
});

router.post('/api/data', auth.required(), (req, res, next) => {
  res.sendStatus(501)
});

module.exports = router;

