var http = require('http');  //http的模块;
var url = require('url');   //url模块;
var fs = require('fs');      //fs模块;
var querystring = require('querystring');//一个和参数相关的帮助类
var bodyParser = require('body-parser');
var path = require('path');
var express = require('express');
var config = require('config-lite')(__dirname);
var pkg = require('./package');
var winston = require('winston');
var expressWinston = require('express-winston');

var app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));


// 正常请求的日志
app.use(expressWinston.logger({
  transports: [
    new (winston.transports.Console)({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/success.log'
    })
  ]
}));

// 错误请求的日志
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/error.log'
    })
  ]
}));



app.listen(config.port, function () {
    console.log(config.port);
  });


