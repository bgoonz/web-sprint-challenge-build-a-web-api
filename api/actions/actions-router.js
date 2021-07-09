// Write your "actions" router here!

/*
Inside api/actions/actions-router.js build endpoints for performing CRUD operations on actions:

 [GET] /api/actions
Returns an array of actions (or an empty array) as the body of the response.
 [GET] /api/actions/:id
Returns an action with the given id as the body of the response.
If there is no action with the given id it responds with a status code 404.
 [POST] /api/actions
Returns the newly created action as the body of the response.
If the request body is missing any of the required fields it responds with a status code 400.
When adding an action make sure the project_id provided belongs to an existing project.
 [PUT] /api/actions/:id
Returns the updated action as the body of the response.
If there is no action with the given id it responds with a status code 404.
If the request body is missing any of the required fields it responds with a status code 400.
 [DELETE] /api/actions/:id
Returns no response body.
If there is no action with the given id it responds with a status code 404.

*/// Write your "actions" router here!
const express = require('express');
const { checkActionExists, checkProjectExists, validateAction, validateActionCompleted } = require('./actions-middleware');

const actions = require('./actions-model');

const router = express.Router();

router.get("/", (req, res, next) => {
    actions.get()
     .then(resp => {
         res.status(200).json(resp);
     }).catch(next)
})

router.get("/:id", checkActionExists, (req, res, next) => {
    const { id } = req.params;

    actions.get(id)
    .then(resp => {
        res.status(200).json(resp);
    }).catch(next)
})

router.post("/", [checkProjectExists, validateAction], (req, res, next) => {
    const neoAction = req.body

    actions.insert(neoAction)
        .then((resp) => {
            res.status(201).json(resp);
        }).catch(next);
})

router.put("/:id", [checkProjectExists, validateAction, validateActionCompleted], (req, res, next) => {
    const { id } = req.params;
    const neoAction = req.body

    actions.update(id, neoAction)
        .then((resp) => {
            res.status(201).json(resp);
        }).catch(next);
})

router.delete('/:id', checkActionExists, (req, res, next) => {
    const { id } = req.params;

    actions.remove(id)
        .then((resp) => {
            res.status(201).json(resp);
        }).catch(next);
})

module.exports = router;
