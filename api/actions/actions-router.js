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
*/


const express = require('express');
const { actionExists,projectExists, validateAction, actionValidationComplete } = require('./actions-middleware');

const actions = require('./actions-model');

const router = express.Router();

router.get("/", (req, res, next) => {
    actions.get()
     .then(resp => {
         res.status(200).json(response);
     }).catch(next)
})

router.get("/:id", actionExists, (req, res, next) => {
    const { id } = req.params;

    actions.get(id)
    .then(resp => {
        res.status(200).json(response);
    }).catch(next)
})

router.post("/", [projectExists, validateAction], (req, res, next) => {
    const neoAction = req.body

    actions.insert(neoAction)
        .then((response) => {
            res.status(201).json(response);
        }).catch(next);
})

router.put("/:id", [projectExists, validateAction, actionValidationComplete], (req, res, next) => {
    const { id } = req.params;
    const neoAction = req.body

    actions.update(id, neoAction)
        .then((response) => {
            res.status(201).json(response);
        }).catch(next);
})

router.delete('/:id', actionExists, (req, res, next) => {
    const { id } = req.params;

    actions.remove(id)
        .then((response) => {
            res.status(201).json(response);
        }).catch(next);
})

module.exports = router;
