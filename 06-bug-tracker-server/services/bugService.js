const bugDb = require('./bugDb');

//the following line has to be removed

//using callbacks
/* function getAll(callback){
    //replace the following code with the 'async' alternative
    bugDb.getAllBugs(function(err, bugsList){
        return callback(err, bugsList);
    });
} */

//using promises
function getAll() {
    return bugDb.getAllBugs();
}

function getById(bugId) {
    const bugList = bugDb.getAllBugs();
    return bugList.find(bug => bug.id === bugId);
}

function save(bugData){
    //read from the file
    const bugList = bugDb.getAllBugs();
    const newBugId = bugData.id !== 0 ? bugData.id : bugList.reduce((result, bug) => result > bug.id ? result : bug.id) + 1;
        newBug = { ...bugData, id: newBugId };
    bugList.push(newBug);
    //write into the file
    bugDb.saveBugs(bugList);
    return newBug;
}

function update(bugId, updatedBug){
    const bug = getById(bugId);
    let bugList = bugDb.getAllBugs();
    if (!bug) {
        return null;
    }
    bugList = bugList.map(existingBug => existingBug.id === bugId ? updatedBug : existingBug);
    bugDb.saveBugs(bugList);
    return updatedBug;
}

function remove(bugId){
    const bug = getById(bugId);
    if (!bug) {
        return null;
    }
    let bugList = bugDb.getAllBugs();
    bugList = bugList.filter(existingBug => existingBug.id !== bugId);
    bugDb.saveBugs(bugList);
    return {};
}

module.exports = { getAll, getById, save, update, remove };