const http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url'),
    querystring = require('querystring')
    chalk = require('chalk'),
    calculator = require('./calculator');

var staticResExtns = ['.html', '.css', '.js', '.xml', '.json', '.png', '.ico', '.txt'];

function isStatic(resource){
    var resourceExtn = path.extname(resource);
    return staticResExtns.indexOf(resourceExtn) >= 0 ;
}

const server = http.createServer((req, res) => {
    const urlObj = url.parse(req.url);
    console.log(chalk.yellow(req.method) + '\t' + chalk.green(urlObj.pathname));

    const resourceName = urlObj.pathname === '/' ? 'index.html' : urlObj.pathname;
    if (isStatic(resourceName)){
        const resourceFullName = path.join(__dirname, resourceName);
        if (!fs.existsSync(resourceFullName)) {
            res.statusCode = 404;
            res.end();
            return;
        }
        const stream = fs.createReadStream(resourceFullName);
        stream.pipe(res);
    } else if (urlObj.pathname === '/calculator' && req.method === 'GET'){
        var queryData = querystring.parse(urlObj.query),
            x = parseInt(queryData.x),
            y = parseInt(queryData.y),
            op = queryData.op,
            result = calculator[op](x,y);

        res.write(result.toString());
        res.end();
    } else if (urlObj.pathname === '/calculator' && req.method === 'POST') {
        var rawData = '';
        req.on('data', chunk => rawData += chunk );
        req.on('end', () => {
            var bodyData = querystring.parse(rawData),
                x = parseInt(bodyData.x),
                y = parseInt(bodyData.y),
                op = bodyData.op,
                result = calculator[op](x, y);

            res.write(result.toString());
            res.end();
        });
    } else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(8080);

server.on('listening', () => {
    console.log(chalk.cyan('Server listening on port 8080'));
});