// add middlewares here related to actions
const db = require("./actions-model");
const dbp = require("../projects/projects-model");

// add middlewares here related to actions
module.exports = {
  checkAction,
  checkProject,
  validateAction,
  actionValidationCompleted,
};

function checkAction(req, res, next) {
  //checking to see if action exists
  const { id } = req.parameters;

  db.get(id)
    .then((actions) => {
      if (resp=== undefined || resp === null) {
        res
          .status(404)
          .json({
            message:
              "error the action specified by the user provided Id could not be found ",
          });
      } else {
        req.action = resp;
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

function checkProject(req, res, next) {
  const { project_id } = req.parameters;

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

function validateAction(req, res, next) {
  const neoAction = req.body;

  if (!neoAction) {
    res.status(400).json({ message: "no action object sent as JSON" });
  } else if (!neoAction.notes) {
    res.status(400).json({ message: "notes field is required " });
  } else if (!neoAction.description) {
    res.status(400).json({ message: "description field is required " });
  } else if (!neoAction.project_id) {
    res.status(400).json({ message: "project_id is required " });
  } else {
    next();
  }
}

function actionValidationCompleted(req, res, next) {
  const neoAction = req.body;

  if (!neoAction) {
    res
      .status(400)
      .json({ message: "error action object must be provided in JSON format" });
  } else if (!neoAction.completed) {
    res
      .status(400)
      .json({
        message:
          "error please make sure that the completed field is provided a boolean argument",
      });
  } else {
    next(); //sucess
  }
}
