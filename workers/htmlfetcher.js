// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.

var http = require('http');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');

var writeToArchive = function(fileName, body) {
  console.log('fileName-----------------');
  console.log(fileName);
  fs.writeFile(fileName, body, function(err) {
    console.log('BODY -- ' + body);
    if (err) { console.log(err); }
    console.log('writing body to file');
  });
};

var scrape = function(url) {
  var req = http.get('http://' + url, function(res){
    console.log('ENTERED SCRAPE');
    // console.log(res);
    var body = '';
    res.on('data', function(data) {
      body += data;
    });
    res.on('end', function() {
      // console.log('BODY -- ' + body);
      var fileName = archive.paths.archivedSites + '/' + url;
      writeToArchive(fileName, body);
    });
  });
  req.end();
};

scrape('www.hackreactor.com');
