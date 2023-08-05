const express = require('express');

const app = express();

app.get('/test', function(req, res) {
  res.status(200).json({ msg: 'ok' });
});

app.listen(5000);