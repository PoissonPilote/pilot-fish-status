const express = require('express');
const busboy = require('connect-busboy');
const router = express.Router();

router.use(busboy({ immediate: true }));
router.post('/inbound-email', (req, res, next) => {
  console.log(req.busboy);
  console.log(req.body);
  req.busboy.on('field', (k, v, kt, kv) => {
    console.log({ k, v, kt, kv});
  })
  req.busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    console.log('got file: ' + fieldname + ' ' + filename);
  })
  res.sendStatus(200);
});

module.exports = router;
