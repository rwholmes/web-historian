var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.collectData = function(req, callback) {
  var postData = '';
  req.on('data', function(data) {
    postData += data;
  });
  req.on('end', function() {
    callback(postData);
  });
};

exports.sendRedirect = function(res, path) {
  exports.servePage(res, path, { 'Location': path }, 302);
};

exports.servePage = function(res, path, header, statusCode) {
  statusCode = statusCode || 200;
  fs.readFile(path, function(err, data) {
    res.writeHead(statusCode, header);
    res.end(data + '');
  });
};
