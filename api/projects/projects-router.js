// Write your "projects" router here!

/*
/*
Endpoints
Inside api/projects/projects-router.js build the following endpoints:

 [GET] /api/projects
Returns an array of projects as the body of the response.
If there are no projects it responds with an empty array.
 [GET] /api/projects/:id
Returns a project with the given id as the body of the response.
If there is no project with the given id it responds with a status code 404.
 [POST] /api/projects
Returns the newly created project as the body of the response.
If the request body is missing any of the required fields it responds with a status code 400.
 [PUT] /api/projects/:id
Returns the updated project as the body of the response.
If there is no project with the given id it responds with a status code 404.
If the request body is missing any of the required fields it responds with a status code 400.
 [DELETE] /api/projects/:id
Returns no response body.
If there is no project with the given id it responds with a status code 404.
 [GET] /api/projects/:id/actions
Returns an array of actions (could be empty) belonging to a project with the given id.
If there is no project with the given id it responds with a status code 404.

*/





const express = require('express');
const { checkProjectExists, validateCompleted, validateProject } = require('./projects-middleware');

const projects = require('./projects-model');
const actions = require('../actions/actions-model')

const router = express.Router();

router.get("/", (req, res, next) => {
    projects.get()
     .then(resp => {
         res.status(200).json(resp);
     }).catch(next)
})

router.get("/:id", checkProjectExists, (req, res, next) => {
    const { id } = req.parameters;

    projects.get(id)
    .then((resp) => {
        res.status(200).json(resp);
    }).catch(next);
})

router.get('/:id/actions', checkProjectExists, (req, res, next) => {
    const { id } = req.parameters;

    actions.getByProjectId(id)
        .then((resp) => {
            res.status(200).json(resp);
        }).catch(next);
})

router.post("/", validateProject, (req, res, next) => {
    const neoProject = req.body;

    projects.insert(neoProject)
        .then((resp) => {
            res.status(201).json(resp);
        }).catch(next);
})

router.put("/:id", [checkProjectExists, validateProject, validateCompleted], (req, res, next) => {
    const { id } = req.parameters;
    const updateThis = req.body

    updateThis.id = id;

    projects.update(id, updateThis)
        .then(() => {
            projects.get(id)
                .then((resp) => {
                    res.status(201).json(resp);
                }).catch(next);
        }).catch(next);
})

router.delete("/:id", checkProjectExists, (req, res, next) => {
    const { id } = req.parameters;

    projects.remove(id)
        .then((resp) => {
            if (resp === -1) {
                res.status(500).json({ message: "error deleting requested project" })
            } else {
                res.status(200).json(resp);
            }
        })
        .catch(next);
})

module.exports = router;
