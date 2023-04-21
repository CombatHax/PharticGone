"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var fs_1 = require("fs");
var client = "client";
var fileTypes = {
    ".js": "text/javascript",
    ".css": "text/css",
    ".html": "text/html",
    ".png": "image/png"
};
var server = (0, http_1.createServer)(function (req, res) {
    if (req.method == "GET" && req.url) {
        if (req.url === '/') {
            (0, fs_1.readFile)("".concat(client, "/front/main.html"), function (err, data) {
                if (err) {
                    res.end("File not found");
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                res.end();
            });
            return;
        }
        var url = new URL(req.url, "http://".concat(res.getHeaders().host));
        (0, fs_1.readFile)("".concat(client).concat(req.url), function (err, data) {
            console.log("Request for: ".concat(client).concat(req.url));
            if (err) {
                res.end("File not found");
                return;
            }
            var fileType = req.url.slice(req.url.indexOf("."));
            if (fileType in fileTypes)
                res.writeHead(200, { "Content-Type": fileTypes[fileType] });
            res.write(data);
            res.end();
            return;
        });
    }
});
server.listen(42069);
