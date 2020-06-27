const fs = require('fs'),
    path = require('path'),
    util = require('util');

const dbFile = path.join(__dirname, '..', '/db/data.json');

//callback based
/* function getAllBugs(callback){
    fs.readFile(dbFile, function(err, fileContents){
        if (err){
            return callback(err);
        }
        const bugsList = JSON.parse(fileContents);
        return callback(null, bugsList);
    });
}

function saveBugs(bugs, callback){
    fs.writeFile(dbFile, JSON.stringify(bugs), callback);
} */

//using promises
/* function getAllBugs() {
    return new Promise(function(resolve, reject){
        fs.readFile(dbFile, function (err, fileContents) {
            if (err) {
                return reject(err);
            }
            const bugsList = JSON.parse(fileContents);
            return resolve(bugsList);
        });
    });
    
}

function saveBugs(bugs) {
    return new Promise(function(resolve, reject){
        fs.writeFile(dbFile, JSON.stringify(bugs), function(err){
            if (err) return reject(err);
            resolve();
        });
    })
} */

//using util.promisify
/* const readFileAsync = util.promisify(fs.readFile),
    writeFileAsync = util.promisify(fs.writeFile);

function getAllBugs() {
    return readFileAsync(dbFile, {encoding: 'utf8'})
        .then(fileContents => JSON.parse(fileContents));
}

function saveBugs(bugs) {
    return writeFileAsync(dbFile, JSON.stringify(bugs));
} */

//using bluebird
const bluebird = require('bluebird');
bluebird.promisifyAll(fs);

function getAllBugs() {
    return fs.readFileAsync(dbFile, { encoding: 'utf8' })
        .then(fileContents => JSON.parse(fileContents));
}

function saveBugs(bugs) {
    return fs.writeFileAsync(dbFile, JSON.stringify(bugs));
}

module.exports = { getAllBugs, saveBugs };