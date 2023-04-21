import { createServer } from 'http';
import { readFile, writeFile } from 'fs';

const client: string = "client";
const fileTypes = {
    ".js": "text/javascript",
    ".css": "text/css",
    ".html": "text/html",
    ".png": "image/png"
}

const server = createServer((req, res) => {
    if(req.method == "GET" && req.url) {
        if(req.url === '/') {
            readFile(`${client}/front/main.html`, (err, data) => {
                if(err) {
                    res.end("File not found");
                    return;
                }
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            });
            return;
        }
        const url: URL = new URL(req.url, `http://${res.getHeaders().host}`);
        readFile(`${client}${req.url}`, (err, data) => {
            console.log(`Request for: ${client}${req.url}`)
            if(err) {
                res.end("File not found");
                return;
            }
            const fileType: string = req.url.slice(req.url.indexOf("."));
            if(fileType in fileTypes) res.writeHead(200, {"Content-Type": fileTypes[fileType]});
            res.write(data);
            res.end();
            return;
        });
    }
});
server.listen(42069);