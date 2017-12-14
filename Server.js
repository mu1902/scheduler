var http = require("http");
var rr = require("./code/rr").rr;
var agenda = require("./index").agenda;

var log4js = require("log4js");
log4js.configure("./log/config.json");
var console_log = log4js.getLogger('console');

if (!isNaN(process.argv[2])) {
    var port = process.argv[2];
} else {
    var port = 17619;
}

var server = http.createServer(function (request, response) {
    rr(request, response, __dirname + "/public", agenda);
});

server.listen(port);

console_log.info("Server runing at port: " + port + ".");
