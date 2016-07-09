const express = require('express');
const router = express.Router();
const authMiddleware = require('basicauth-middleware');

const GeoData = require('../src/geo-data');

const auth = authMiddleware(
  process.env.ADMIN_USER,
  process.env.ADMIN_PASSWORD
);


router.post('/path', auth, (req, res, next) => {
  const x = parseFloat(req.body.x, 10)
  const y = parseFloat(req.body.y, 10)
  const depth = parseFloat(req.body.depth, 10)
  if(!isNaN(x) && !isNaN(y) && !isNaN(depth)) {
  GeoData.addPoint({x, y, depth})
    .then(() => res.sendStatus(201))
    .catch(next)
  } else {
    res.sendStatus(400);
  }
});

router.post('/data', auth, (req, res, next) => {
  res.sendStatus(501)
});

module.exports = router;

