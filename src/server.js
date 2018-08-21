const express = require('express');
const app = express()

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/assets/'));
app.set('views', './src/views');


const loadPage = (req,res)=> {
  res.render('index', { title: 'Zippy Poll', message: 'Coming Soon!' });
}

app.get('/*', loadPage );

app.listen(8081, function () {
  console.log('app listening on port 8081!')
});
