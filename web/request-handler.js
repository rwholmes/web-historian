var fs = require('fs');
var path = require('path');
var archive = require('../helpers/archive-helpers');
var util = require('util');
var webroot = './public';
var httpHelpers = require('./http-helpers.js');
var querystring = require('querystring');
var http = require('http');

var servePage = function(req, res, fileName) {
  fs.readFile(fileName, function(err, data) {
    res.writeHead(200, httpHelpers.headers);
    res.end(data + '');
  });
};

var getIndex = function(req, res) {
  var fileName = path.join(archive.paths.siteAssets, './index.html');
  servePage(req, res, fileName);

  // fs.readFile(path.join(archive.paths.siteAssets, './index.html'), function(err, data) {
  //   res.writeHead(200, httpHelpers.headers);
  //   res.end(data + '');
  // });

};

var postIndex = function(req, res) {
  // grab form data
  httpHelpers.collectData(req, function(data) {
    var postUrl = data.split('=')[1];
    // check if url is in list
    archive.isUrlInList(postUrl, function(found){
      if (found) {
        // if yes, check if its archived
        archive.isURLArchived(postUrl, function(exists) {
          if (exists) {
            // if archived, serve it
          } else {
            // if not archived, show loading
          }

        });
      } else {
        // if no, add to the list
          // add to list
          // show loading
      }

    });

  });
};

// var postIndex = function(req, res) {
//   var postData = '';
//   var fileName = path.join(archive.paths.siteAssets, './loading.html');
//   req.on('data', function(data) {
//     postData += data;
//   });
//   req.on('end', function() {
//     var postUrl = querystring.parse(postData)['url'];
//     archive.readListOfUrls(postUrl);
//     servePage(req, res, fileName);
//   });
// };

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
