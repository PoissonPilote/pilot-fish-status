const express = require('express');
const busboy = require('connect-busboy');
const router = express.Router();
const crypto = require('crypto');

const key = process.env.MAILGUN_API_KEY;
const checkSignature = (timestamp, token, signature) => {
  const hmac = crypto.createHmac('sha256', key);
  hmac.update(timestamp + token);
  const digest = hmac.digest('hex');
  return digest === signature;
}

router.use(busboy({ immediate: true }));
router.post('/api/inbound-email', (req, res, next) => {
  console.log("Inbound email");
  if(checkSignature(req.body.timestamp, req.body.token, req.body.signature)) {
    console.log(req.body['X-Spot-Type']);
    if(req.body['X-Spot-Type'] === 'NEWMOVEMENT') {
      GeoData.addPoint({
        x: req.body['X-Spot-Latitude'],
        y: req.body['X-Spot-Longitude'],
        depth: 0,
        boat: 'sub'
      }).then(() => {
        console.log("Point inserted");
        res.sendStatus(201)
      });
    } else {
      res.sendStatus(200);
    }
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
