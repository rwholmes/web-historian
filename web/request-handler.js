var fs = require('fs');
var path = require('path');
var archive = require('../helpers/archive-helpers');
var util = require('util');
var webroot = './public';
var httpHelpers = require('./http-helpers.js');
var querystring = require('querystring');
var http = require('http');

var getIndex = function(req, res) {
  fs.readFile(path.join(archive.paths.siteAssets, './index.html'), function(err, data) {
    res.writeHead(200, httpHelpers.headers);
    res.end(data + '');
  });

};

var postIndex = function(req, res) {
  var postData = '';
  req.on('data', function(data) {
    postData += data;
  });
  req.on('end', function() {
    var postUrl = querystring.parse(postData)['url'];
    archive.readListOfUrls(postUrl);
  });
};

var options = function(req, res){
  res.writeHead(200, httpHelpers.headers);
  res.end();
};

var actions = {
  'GET': getIndex,
  'POST': postIndex,
  'OPTIONS': options
};

exports.handleRequest = function (req, res) {
  var action = actions[req.method];
  if (action) {
    action(req, res);
  } else {
    res.writeHead(404, httpHelpers.headers);
    res.end();
  }
};
