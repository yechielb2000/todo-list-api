const Task = require("../schemas/task");

function newTask(req, res) {
  new Task({
    title: req.query.title,
    task: req.query.task,
    created_at: Date.now(),
    start_date: req.query.start_date,
    end_date: req.query.end_date,
    done: false,
    assignees: req.query.assignees,
  })
    .save()
    .then(() => res.sendStatus(200))
    .catch((err) => console.log(err));
}

function deleteTask(req, res) {
  Task.findOneAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch((err) => res.sendStatus(err.status).json({ error: err }));
}

function getTask(req, res) {
  Task.findById(req.params.id)
    .then((result) => res.sendStatus(200).send(result))
    .catch((err) => console.log(err));
}

function updateTask(req, res) {
  Task.findByIdAndUpdate(req.params.id, req.query)
    .then(() => res.sendStatus(200))
    .catch((err) => res.sendStatus(err.status));
}

module.exports = {
  newTask,
  deleteTask,
  getTask,
  updateTask,
};
