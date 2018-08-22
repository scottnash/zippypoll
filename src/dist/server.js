"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _server = require("react-dom/server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.set('view engine', 'pug');
app.use('/assets/scripts', _express2.default.static('./src/dist/scripts'));
app.use('/assets/css', _express2.default.static('./src/dist/css'));
app.set('views', './src/views');

var loadPage = function loadPage(req, res) {
  res.render('index', { title: 'Zippy Poll', message: 'Coming Soon!!' });
};

app.get('/*', loadPage);

app.listen(8081, function () {
  console.log('app listening on port 8081!');
});