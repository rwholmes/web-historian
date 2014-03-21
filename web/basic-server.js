var http = require("http");
var rh = require("./request-handler");
var util = require('util');
var url = require('url');
var httpHelpers = require('./http-helpers.js');

var port = 8080;
var ip = "127.0.0.1";

var requestHandler = function(request, response) {
  console.log('serving request type ' + request.method + ' for url ' + request.url);
  rh.handleRequest(request, response);
};

var server = http.createServer(requestHandler);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
