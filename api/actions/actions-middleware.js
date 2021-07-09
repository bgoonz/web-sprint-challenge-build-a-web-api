const db = require('./actions-model')
const dbp = require('../projects/projects-model')

// add middlewares here related to actions
module.exports = {
    actionExists,
    projectExists,
    validateAction,
    actionValidationComplete
}

function actionExists(req, res, next) {
    const { id } = req.params;

    db.get(id)
        .then(resp => {
            if (resp === undefined || resp === null) {
                res.status(404).json({ message: "Could not acess a record that contained the action corresponding with provided ID "})
            } else {
                req.action = resp;
                next();
            }
        }).catch(err => {
            res.status(500).json({ 
                message: "Internal Server Error",
                err: err 
            })
        })
}

function projectExists(req, res, next) {
    const { project_id } = req.params;

    dbp.get(project_id)
        .then(resp => {
            if (resp === undefined || resp === null) {
                res.status(404).json({ message: "that action id does not exist "})
            } else {
                req.project = resp;
                next();
            }
        }).catch(err => {
            res.status(500).json({ 
                message: "Internal Server Error",
                err: err 
            })
        })
}

function validateAction(req, res, next) {
    ;

    if (!req.body) {
        res.status(400).json({ message: "no action object sent as JSON" })
    } else if (!req.body.notes) {
        res.status(400).json({ message: "notes field is required "});
    } else if (!req.body.description) {
        res.status(400).json({ message: "description field is required "});
    } else if (!req.body.project_id) {
        res.status(400).json({ message: "project_id is required "});
    } else {
        next();
    }
}

function actionValidationComplete(req, res, next) {
    ;

    if (!req.body) {
        res.status(400).json({ message: "no action object sent as JSON" })
    } else if (!req.body.completed) {
        res.status(400).json({ message: "after initial creation, completed field is required "});
    } else {
        next();
    }
}
