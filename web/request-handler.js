var fs = require('fs');
var path = require('path');
var archive = require('../helpers/archive-helpers');
var util = require('util');
var webroot = './public';
var httpHelpers = require('./http-helpers.js');
var querystring = require('querystring');
var http = require('http');

var getIndex = function(req, res) {
  console.log('++++++++req.url++++++++');
  console.log(req.url);
  // archive.readListOfUrls();
  fs.readFile(path.join(archive.paths.siteAssets, './index.html'), function(err, data) {
    res.writeHead(200, httpHelpers.headers);
    res.end(data + '');
  });

};

// ss: modified to use .on
var postIndex = function(req, res) {
  var sites = archive.readListOfUrls();
  var postData = '';
  var postUrl;
  req.on('data', function(data) {
    postData += data;
  });
  req.on('end', function() {
    var postUrl = querystring.parse(postData)['url'];
    console.log('----POSTURL----');
    console.log(postUrl);
    if (archive.isUrlInList(postUrl, sites)) {
      console.log('PLACEHOLDER -- serve up archived site');
      // serve up archived site
    } else {
      console.log('PLACEHOLDER -- add url to list');
      // add url to list
      // archive.addUrlToList(postUrl);
    }
  });

  // old code ///////////////
  // // Grab array of sites in sites.txt
  // var sites = archive.readListOfUrls();
  // var booVal = archive.isUrlInList(req.url, sites);
  // if(sites[0] === 'www.google.com') {
  //   console.log('trueeeeeeeeeee');
  // }
  // console.log('----sites[0]');
  // console.log(sites[0]);

  // // Check if url is in sites array

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

  var action = actions[req.method];
  if (action) {
    action(req, res);
  } else {
    res.writeHead(404, httpHelpers.headers);
    res.end();
  }
};
