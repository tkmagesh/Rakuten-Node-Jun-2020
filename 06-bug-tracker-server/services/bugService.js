let bugList = [
    { id: 1, name: 'Server communication failure', isClosed: false},
    { id: 2, name: 'User actions not recognized', isClosed: false },
    { id: 3, name: 'Data integrity checks failed', isClosed: false},
];

function getAll(){
    return [...bugList];
}

function getById(bugId) {
    return bugList.find(bug => bug.id === bugId);
}

function save(bugData){
    const newBugId = bugData.id !== 0 ? bugData.id : bugList.reduce((result, bug) => result > bug.id ? result : bug.id) + 1;
        newBug = { ...bugData, id: newBugId };
    bugList.push(newBug);
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