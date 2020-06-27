const fs = require('fs'),
    path = require('path');

const dbFile = path.join(__dirname, '..', '/db/data.json');

function getAllBugs(){
    const fileContents = fs.readFileSync(dbFile);
    return JSON.parse(fileContents);
}

function saveBugs(bugs){
    fs.writeFileSync(dbFile, JSON.stringify(bugs));
}

module.exports = { getAllBugs, saveBugs };