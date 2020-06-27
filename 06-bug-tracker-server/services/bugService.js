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
async function getAll() {
    return await bugDb.getAllBugs();
}

async function getById(bugId) {
    const bugList = await bugDb.getAllBugs();
    return bugList.find(bug => bug.id === bugId);
}

async function save(bugData){
    //read from the file
    const bugList = await bugDb.getAllBugs();
    const newBugId = bugData.id !== 0 ? bugData.id : bugList.reduce((result, bug) => result > bug.id ? result : bug.id) + 1;
        newBug = { ...bugData, id: newBugId };
    bugList.push(newBug);
    //write into the file
    await bugDb.saveBugs(bugList);
    return newBug;
}

async function update(bugId, updatedBug){
    const bug = await getById(bugId);
    let bugList = await bugDb.getAllBugs();
    if (!bug) {
        return null;
    }
    bugList = bugList.map(existingBug => existingBug.id === bugId ? updatedBug : existingBug);
    await bugDb.saveBugs(bugList);
    return updatedBug;
}

async function remove(bugId){
    const bug = await getById(bugId);
    if (!bug) {
        return null;
    }
    let bugList = await bugDb.getAllBugs();
    bugList = bugList.filter(existingBug => existingBug.id !== bugId);
    await bugDb.saveBugs(bugList);
    return {};
}

module.exports = { getAll, getById, save, update, remove };