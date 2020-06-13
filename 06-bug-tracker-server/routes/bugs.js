const express = require('express'),
    router = express.Router(),
    createError = require('http-errors')

let bugList = [
    { id: 1, name: 'Server communication failure', isClosed: false},
    { id: 2, name: 'User actions not recognized', isClosed: false },
    { id: 3, name: 'Data integrity checks failed', isClosed: false},
];

function getById(bugId){
    return bugList.find(bug => bug.id === bugId)
}

//effective route path -> /bugs/
router.get('/', (req,res, next) => {
    res.json(bugList);
});

// /bugs/1, /bugs/2
router.get('/:id', (req, res, next) => {
    const bugId = parseInt(req.params.id),
        bug = getById(bugId);
    if (!bug){
        return next(createError(404));
    }
    res.json(bug);
});

router.post('/', (req, res, next) => {
    const bugData = req.body,
        newBugId = bugList.reduce((result, bug) => result > bug.id ? result : bug.id) + 1
        newBug = { ...bugData, id : newBugId };
        bugList.push(newBug);
    res.status(201).json(newBug);
});

router.put('/:id', (req, res, next) => {
    const bugId = parseInt(req.params.id),
        bug = getById(bugId),
        updatedBug = req.body;
    if (!bug) {
        return next(createError(404));
    }   
    bugList = bugList.map(existingBug => existingBug.id === bugId ? updatedBug : existingBug);
    res.json(updatedBug);
});

router.delete('/:id', (req, res, next) => {
    const bugId = parseInt(req.params.id),
        bug = getById(bugId);
    if (!bug) {
        return next(createError(404));
    }
    bugList = bugList.filter(existingBug => existingBug.id !== bugId);
    res.status(200).json();
});

module.exports = router;