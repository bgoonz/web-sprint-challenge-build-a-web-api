// Write your "projects" router here!

/*

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
const {projectExists, validateCompleted, validateProject } = require('./projects-middleware');

const projects = require('./projects-model');
const actions = require('../actions/actions-model')

const router = express.Router();

router.get("/", (req, res, next) => {
    projects.get()
     .then(resp => {
         res.status(200).json(response);
     }).catch(next)
})

router.get("/:id",projectExists, (req, res, next) => {
    const { id } = req.params;

    projects.get(id)
    .then((response) => {
        res.status(200).json(response);
    }).catch(next);
})

router.get('/:id/actions',projectExists, (req, res, next) => {
    const { id } = req.params;

    actions.getByProjectId(id)
        .then((response) => {
            res.status(200).json(response);
        }).catch(next);
})

router.post("/", validateProject, (req, res, next) => {
    const neoProject = req.body;

    projects.insert(neoProject)
        .then((response) => {
            res.status(201).json(response);
        }).catch(next);
})

router.put("/:id", [projectExists, validateProject, validateCompleted], (req, res, next) => {
    const { id } = req.params;
    const updateThis = req.body

    updateThis.id = id;

    projects.update(id, updateThis)
        .then(() => {
            projects.get(id)
                .then((response) => {
                    res.status(201).json(response);
                }).catch(next);
        }).catch(next);
})

router.delete("/:id",projectExists, (req, res, next) => {
    const { id } = req.params;

    projects.remove(id)
        .then((response) => {
            if (resp === -1) {
                res
                  .status(500)
                  .json({
                    message:
                      " error http status 500 (Internal Server Errorerror)cannot delete requested project",
                  });
            } else {
                res.status(200).json(response);
            }
        })
        .catch(next);
})

module.exports = router;
