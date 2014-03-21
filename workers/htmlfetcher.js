var http = require('http');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');

var writeToArchive = function(fileName, body) {
  fs.writeFile(fileName, body, function(err) {
    if (err) { console.log('writeToArchive error'); }
  });
};

var scrape = function(url) {
  var req = http.get('http://' + url, function(res){
    var body = '';
    res.on('data', function(data) {
      body += data;
    });
    res.on('end', function() {
      var fileName = archive.paths.archivedSites + '/' + url;
      writeToArchive(fileName, body);
    });
  });
  req.end();
};

fs.readFile(archive.paths.list, function(err, data) {
  var sites = data.toString().split('\n');
  sites.pop();
  for (var i=0; i<sites.length; i++) {
    scrape(sites[i]);
  }
});

