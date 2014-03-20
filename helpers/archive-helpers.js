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

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

// exports.initiateHelpers = function(someUrl){
//   var array = exports.readListOfUrls();
//   console.log(array);
//   console.log(someUrl);
//   console.log(exports.isUrlInList(someUrl, array));
// };

exports.readListOfUrls = function(){
  var sites = fs.readFileSync(exports.paths.list, 'utf8').split('\n');
  sites.pop();
  return sites;

};

exports.isUrlInList = function(someUrl, urlArray){
  for (var i=0; i<urlArray.length; i++) {
    if (someUrl === urlArray[i]) {
      return true;
    }
  }
  return false;
};

exports.addUrlToList = function(){
};

exports.isURLArchived = function(){
};

exports.downloadUrls = function(){
};
