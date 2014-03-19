var http = require("http");
var staticHandler = require("./static-handler");
var static = require('node-static');
var util = require('util');
var url = require('url');
var httpHelpers = require('./http-helpers.js');


var port = 8080;
var ip = "127.0.0.1";




var routes = {
  '/': staticHandler.handleRequest,
  '/index.html': staticHandler.handleRequest
};


var router = function(request, response) {
  console.log('serving request type ' + request.method + ' for url ' + request.url);
  var parsedURL = url.parse(request.url);
  var route = routes[parsedURL.pathname];
  if (route) {
    route(request, response);
  } else {
    response.writeHead(200, httpHelpers.headers);
    response.end();
  }
};


var server = http.createServer(router);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
