var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

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


exports.readListOfUrls = function(postUrl){
  fs.readFile(exports.paths.list, function(err, data) {
    var sites = data.toString().split('\n');
    sites.pop();
    var sitesObj = {};
    for (var i=0; i<sites.length; i++) {
      sitesObj[sites[i]] = true;
    }
    exports.isUrlInList(postUrl, sitesObj);
  });
};

exports.isUrlInList = function(postUrl, sitesObj){
  if (sitesObj[postUrl]) {
    exports.isURLArchived(postUrl);
  } else {
    exports.addUrlToList(postUrl);
  }
  // for (var i = 0; i < urlArray.length; i++) {
  //   if (postUrl === urlArray[i]) {
  //     exports.isURLArchived(postUrl);
  //     return;
  //   } else {
  //     exports.addUrlToList(postUrl);
  //   }
  // }
};


exports.addUrlToList = function(postUrl){
  buffer = new Buffer(postUrl + '\n');
  fs.appendFile(exports.paths.list, buffer, function() {
    console.log('entered callback for fs.appendfile');
    exports.isURLArchived(postUrl);
  });
};

exports.isURLArchived = function(postUrl){
  var fileName = exports.paths.archivedSites + '/' + postUrl;
  fs.readFile(fileName, function(err, data) {
    if (err) {
      console.log('url not found in archived sites');
      exports.downloadUrls(postUrl);
    } else {
      console.log('congrats, url found!!!');
      exports.serveArchivedURL(postUrl);
    }
  });
};

exports.serveArchivedURL = function(postUrl){

};

exports.downloadUrls = function(postUrl){
};
