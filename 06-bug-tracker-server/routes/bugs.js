const express = require('express'),
    router = express.Router(),
    createError = require('http-errors');
    bugService = require('../services/bugService');

//effective route path -> /bugs/
/* router.get('/', (req,res, next) => {
    bugService.getAll(function(err, bugsList){
        if (err){
            return next(err);
        }
        res.json(bugsList);
    })
});
 */

//using promises
/* router.get('/', (req, res, next) => {
    const p = bugService.getAll();
    p.then(function(bugsList){
        res.json(bugsList);
    })
    .catch(function(err){
        next(err);
    });
}); */

//using async await
router.get('/', async (req, res, next) => {
    const bugsList = await bugService.getAll();
    res.json(bugsList);
});

// /bugs/1, /bugs/2
router.get('/:id', async (req, res, next) => {
    const bugId = parseInt(req.params.id),
        bug = await bugService.getById(bugId);
    if (!bug){
        return next(createError(404));
    }
    res.json(bug);
});

router.post('/', async (req, res, next) => {
    const bugData = req.body;
    const newBug = await bugService.save(bugData);
    res.status(201).json(newBug);
});

router.put('/:id', async (req, res, next) => {
    const bugId = parseInt(req.params.id),
        updatedBugData = req.body;
    const updatedBug = await bugService.update(bugId, updatedBugData);
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