var url = require("url");
var fs = require("fs");
var path = require("path");
var qs = require('querystring');
var mime = require("./mime").types;
var config = require("./config").config;
var router = require("./router").router;

exports.rr = function (req, res, _path) {
    var postData = "";
    //path = pathname + search
    var pathname = url.parse(req.url).pathname;

    if (pathname.slice(-1) === '/') {
        pathname = pathname + config.main;
    }

    var realPath = _path + pathname;
    //ext属性包括“.”号，slice去除“.”号
    var ext = path.extname(realPath).slice(1) || 'unknown';
    var contentType = mime[ext] || 'application/json';

    var response = function (result, code, file, err) {
        switch (code) {
            case 400:
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end("找不到路径或文件");
                break;
            case 500:
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end(err);
                break;
            case 200:
                res.writeHead(200, { 'Content-Type': contentType });
                res.write(file, "binary");
                res.end();
                break;
            default:
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(JSON.stringify(result));
                break;
        }
    };

    if (ext == 'unknown') {
        //ajax请求
        if (!router[pathname]) {
            response(null, 404);
        } else {
            req.setEncoding("utf8");
            req.addListener("data", function (postDataChunk) {
                postData += postDataChunk;
            });
            req.addListener("end", function () {
                if (postData == "") {
                    router[pathname]({}, response);
                } else {
                    try {
                        var obj = JSON.parse(postData);
                    } catch (e) {
                        var obj = qs.parse(postData);
                    }
                    router[pathname](obj, response);
                }
            });
        }
    } else {
        //静态文件请求
        if (!fs.existsSync(realPath) && !fs.existsSync(filePath)) {
            response(null, 404);
        } else {
            if (fs.existsSync(realPath)) {
                fs.readFile(realPath, "binary", function (err, file) {
                    if (err) {
                        response(null, 500, null, err);
                    } else {
                        response(null, 200, file);
                    }
                });
            } else {
                fs.readFile(filePath, "binary", function (err, file) {
                    if (err) {
                        response(null, 500, null, err);
                    } else {
                        response(null, 200, file);
                    }
                });
            }
        }
    }
};