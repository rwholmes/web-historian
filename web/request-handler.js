var fs = require('fs');
var path = require('path');
var archive = require('../helpers/archive-helpers');
var util = require('util');
var webroot = './public';
var httpHelpers = require('./http-helpers.js');
var querystring = require('querystring');
var http = require('http');

// var httpHelpers.servePage = function(req, res, fileName) {
//   fs.readFile(fileName, function(err, data) {
//     res.writeHead(200, httpHelpers.headers);
//     res.end(data + '');
//   });
// };

// figure out how to grab url, then join it to archive.paths.siteAssets
var getIndex = function(req, res) {
  var fileName = path.join(archive.paths.siteAssets, './index.html');
  console.log('********req.url.charAt[1]');
  console.log(req.url.charAt(1));
  if (req.url === '/loading.html') {
    fileName = path.join(archive.paths.siteAssets, './loading.html');
  } else if (req.url.charAt(1) === 'w') {
    console.log('-------looking for archive website');
    console.log(path.join(archive.paths.archivedSites, req.url));
    fileName = path.join(archive.paths.archivedSites, req.url);
  }
  httpHelpers.servePage(res, fileName, httpHelpers.headers);
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
            httpHelpers.sendRedirect(res, '/' + postUrl);
          } else {
            // if not archived, show loading
            httpHelpers.sendRedirect(res, '/loading.html');
          }

        });
      } else {
        // if no, add to the list and show load page
        archive.addUrlToList(postUrl, function() {});
        httpHelpers.sendRedirect(res, '/loading.html');
      }

    });

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
