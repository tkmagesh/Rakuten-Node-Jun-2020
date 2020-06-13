const express = require('express'),
    router = express.Router(),
    createError = require('http-errors');
    bugService = require('../services/bugService');

//effective route path -> /bugs/
router.get('/', (req,res, next) => {
    res.json(bugService.getAll());
});

// /bugs/1, /bugs/2
router.get('/:id', (req, res, next) => {
    const bugId = parseInt(req.params.id),
        bug = bugService.getById(bugId);
    if (!bug){
        return next(createError(404));
    }
    res.json(bug);
});

router.post('/', (req, res, next) => {
    const bugData = req.body;
    const newBug = bugService.save(bugData);
    res.status(201).json(newBug);
});

router.put('/:id', (req, res, next) => {
    const bugId = parseInt(req.params.id),
        updatedBugData = req.body;
    const updatedBug = bugService.update(bugId, updatedBugData);
    if (updatedBug){
        res.json(updatedBug);
    } else {
        next(createError(404));
    }
});

router.delete('/:id', (req, res, next) => {
    const bugId = parseInt(req.params.id);
    const result = bugService.remove(bugId);
    if (!result){
        next(createError(404));
    } else {
        res.status(200).json();
    }
});

module.exports = router;