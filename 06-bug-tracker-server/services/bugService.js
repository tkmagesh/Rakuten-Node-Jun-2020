const fs = require('fs'),
    path = require('path')

const dbFile = path.join(__dirname, '..', '/db/data.json');

//the following line has to be removed
let bugList = [];

function getAll(){
    //replace the following code with the 'async' alternative
    const rawData = fs.readFileSync(dbFile),
        bugList = JSON.parse(rawData);
    return bugList;
}

function getById(bugId) {
    return bugList.find(bug => bug.id === bugId);
}

function save(bugData){
    //read from the file
    const rawData = fs.readFileSync(dbFile),
        bugList = JSON.parse(rawData);
    const newBugId = bugData.id !== 0 ? bugData.id : bugList.reduce((result, bug) => result > bug.id ? result : bug.id) + 1;
        newBug = { ...bugData, id: newBugId };
    bugList.push(newBug);
    //write into the file
    fs.writeFileSync(dbFile, JSON.stringify(bugList));
    return newBug;
}

function update(bugId, updatedBug){
    const bug = getById(bugId);
    if (!bug) {
        return null;
    }
    bugList = bugList.map(existingBug => existingBug.id === bugId ? updatedBug : existingBug);
    return updatedBug;
}

function remove(bugId){
    const bug = getById(bugId);
    if (!bug) {
        return null;
    }
    bugList = bugList.filter(existingBug => existingBug.id !== bugId);
    return {};
}

module.exports = { getAll, getById, save, update, remove };