// Write your "actions" router here!
const express = require('express');
const {actionExists, projectExists, validateAction, actionValidationComplete } = require('./actions-middleware');

const actions = require('./actions-model');

const router = express.Router();

router.get("/", (req, res, next) => {
    actions.get()
     .then(resp => {
         res.status(200).json(resp);
     }).catch(next)
})

router.get("/:id",actionExists, (req, res, next) => {
    const { id } = req.params;

    actions.get(id)
    .then(resp => {
        res.status(200).json(resp);
    }).catch(next)
})

router.post("/", [projectExists, validateAction], (req, res, next) => {
    const neoAction = req.body

    actions.insert(neoAction)
        .then((resp) => {
            res.status(201).json(resp);
        }).catch(next);
})

router.put("/:id", [projectExists, validateAction, actionValidationComplete], (req, res, next) => {
    const { id } = req.params;
    const neoAction = req.body

    actions.update(id, neoAction)
        .then((resp) => {
            res.status(201).json(resp);
        }).catch(next);
})

router.delete('/:id',actionExists, (req, res, next) => {
    const { id } = req.params;

    actions.remove(id)
        .then((resp) => {
            res.status(201).json(resp);
        }).catch(next);
})

module.exports = router;
