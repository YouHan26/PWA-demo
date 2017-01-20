/**
 * Created by YouHan on 2017/1/20.
 */
var express = require('express');
var app = express();
var http = require('http');
var https = require('https');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var compression = require('compression');
var helmet = require('helmet');

// var webpack = require('webpack'),
//   webpackDevMiddleware = require('webpack-dev-middleware'),
//   webpackHotMiddleware = require('webpack-hot-middleware'),
//   webpackDevConfig = require('./webpack.config.js');
//
// var compiler = webpack(webpackDevConfig);

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// // attach to the compiler & the server
// app.use(webpackDevMiddleware(compiler, {
//   // public path should be the same with webpack config
//   publicPath: webpackDevConfig.output.publicPath,
//   noInfo: true,
//   stats: {
//     colors: true
//   }
// }));
// app.use(webpackHotMiddleware(compiler));

//use gzip compression--生产环境中应放置在反向代理环节
app.use(compression());

app.use(helmet());

/**
 * body parser
 */
/**
 * change the max request limit
 */
app.use(bodyParser.json({
  limit: '50mb'
})); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb'
})); // for parsing application/x-www-form-urlencoded

/**
 * cookie parser
 */
app.use(cookieParser());

/**
 * static files
 */
app.use(express.static(__dirname + '/src'));

app.get('/index', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/src/index.html'));
});

app.get('/getList', function (req, res) {
  res.send({
    success: true,
    data: {}
  });
});


http.createServer(app).listen(8080, "0.0.0.0");

const options = {
  key: fs.readFileSync('./key/key.pem'),
  cert: fs.readFileSync('./key/cert.pem')
};

https.createServer(options, app).listen(8443, '0.0.0.0');
