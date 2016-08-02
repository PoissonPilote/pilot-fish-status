const express = require('express');
const router = express.Router();
const auth = require('express-authentication');
const basic = require('express-authentication-basic');
const moment = require('moment');

const Data = require('../src/data');
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

router.post('/api/data', auth.required(), (req, res, next) => {
  Data.handleBatch(req.body).then(() => {
    res.sendStatus(201);
  });
});

module.exports = router;

