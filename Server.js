var http = require("http");
var rr = require("./code/rr").rr;
var agenda = require("./index").agenda;

if (!isNaN(process.argv[2])) {
    var port = process.argv[2];
} else {
    var port = 17619;
}

var server = http.createServer(function (request, response) {
    rr(request, response, __dirname + "/public", agenda);
});

server.listen(port);

console.log("Server runing at port: " + port + ".");
