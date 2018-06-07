const express = require('express');
const app = express()

app.use(express.static(__dirname + 'src/static/'));

app.get('/*', function(req,res) {
  res.sendFile('src/index.html' , { root : __dirname});
});

app.listen(8081, function () {
  console.log('app listening on port 8081!')
});
