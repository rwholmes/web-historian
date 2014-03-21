var fs = require('fs');
var path = require('path');
var _ = require('underscore');

exports.paths = paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

exports.isUrlInList = function(postUrl, callback){
  fs.readFile(exports.paths.list, function(err, data) {
    var found = false;
    var sites = data.toString().split('\n');
    sites.pop();
    var sitesObj = {};
    for (var i=0; i<sites.length; i++) {
      sitesObj[sites[i]] = true;
    }
    if (sitesObj[postUrl]) {
      found = true;
    }
    callback(found);
  });
};

exports.addUrlToList = function(postUrl, callback){
  buffer = new Buffer(postUrl + '\n');
  fs.appendFile(exports.paths.list, buffer, function() {
    console.log('entered callback for fs.appendfile');
  });
};

exports.isURLArchived = function(postUrl, callback){
  var fileName = exports.paths.archivedSites + '/' + postUrl;
  fs.exists(fileName, function(bool) {
    callback(bool);
  });
};

exports.serveArchivedURL = function(fileName){
  fs.readFile(fileName, function(err, data) {
    res.writeHead(200, httpHelpers.headers);
    res.end(data + '');
  });
};
