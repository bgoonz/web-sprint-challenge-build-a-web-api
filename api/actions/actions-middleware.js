const db = require("./actions-model");
const dbp = require("../projects/projects-model");

// add middlewares here related to actions
module.exports = {
  checkActionExists,
  checkProjectExists,
  validateAction,
  validateActionCompleted,
};

function checkActionExists(req, res, next) {
  const { id } = req.params;

  db.get(id)
    .then((actions) => {
      if (resp=== undefined || resp === null) {
        res.status(404).json({ message: "the ID provided does not correspond with an action that exists in the database " });
      } else {
        req.action = resp;
        next();
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Internal Server Error ",
        err: err,
      });
    });
}

function checkProjectExists(req, res, next) {
  const { project_id } = req.params;

  dbp
    .get(project_id)
    .then((actions) => {
      if (resp=== undefined || resp === null) {
        res.status(404).json({ message: "that action id does not exist " });
      } else {
        req.project = resp;
        next();
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving record",
        err: err,
      });
    });
}

// middleware to validate required notes and description fields for actions
function validateAction (req, res, next) {
    const { description, notes, project_id } = req.body
    if (!notes || !notes.trim() || !description || !description.trim() || !project_id) {
        res.status(400).json({
            message: "missing required field (notes or description)"
        })
    } else {
        req.notes = notes.trim()
        req.description = description.trim()
        req.project_id = project_id
        next()
    }
}

function validateActionCompleted(req, res, next) {
  const neoAction = req.body;

  if (!neoAction) {
    res.status(400).json({ message: "no action object sent as JSON" });
  } else if (!neoAction.completed) {
    res
      .status(400)
      .json({
        message: "after initial creation, completed field is required ",
      });
  } else {
    next();
  }
}
