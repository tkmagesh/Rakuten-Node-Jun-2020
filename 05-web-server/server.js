const http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url'),
    querystring = require('querystring');

/* 
req - IncomingMessage -> ReadableStream
res - ServerResponse -> WritableStream
*/
/* const server = http.createServer((req, res) => {
    res.write('<h1>Welcome to Node.js</h1>');
    res.end();
}); */
console.log(__dirname);

const server = http.createServer((req, res) => {
    const urlObj = url.parse(req.url);
    console.log(querystring.parse(urlObj.query));
    
    const resourceName = urlObj.pathname === '/' ? 'index.html' : urlObj.pathname;
    const resourceFullName = path.join(__dirname, resourceName);
    if (!fs.existsSync(resourceFullName)) {
        res.statusCode = 404;
        res.end();
        return;
    }
    const stream = fs.createReadStream(resourceFullName);
    /* stream.on('data', chunk => res.write(chunk));
    stream.on('end', () => res.end()); */
    stream.pipe(res);
});

server.listen(8080);

server.on('listening', () => {
    console.log('Server listening on port 8080');
});