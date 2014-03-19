var path = require('path');
var archive = require('../helpers/archive-helpers');
var static = require('node-static');
var util = require('util');
var webroot = './public';
var httpHelpers = require('./http-helpers.js');

var file = new(static.Server)(webroot, {
  cache: 600,
  headers: httpHelpers.headers
});


var getIndex = function(req, res) {
  file.serve(req, res, function(err, result) {
    if (err) {
      console.error('Error serving %s - %s', req.url, err.message);
      res.writeHead(200, httpHelpers.headers); // need 2nd arg? err.headers
      res.end();
    }
    // console.log(req.url);
    // console.log(res.message);
  });
};

var postIndex = function(req, res) {
  console.log('post attempted, functionality to be added later');
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
  // res.end(archive.paths.list);

  console.log('im in your static handler, killing ur doods');
  console.log(req.method);
  var action = actions[req.method];
  if (action) {
    action(req, res);
  } else {
    res.writeHead(404, httpHelpers.headers);
    res.end();
  }
};
