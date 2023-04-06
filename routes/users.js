const User = require("../schemas/user");
const Task = require("../schemas/task");

function newUser(req, res) {
  if (!isNaN(req.body)) {
    //this is not enough
    res.sendStatus(400);
    return;
  }

  new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    created_at: Date.now(),
    tel: req.body.tel,
  })
    .save()
    .then(() => res.sendStatus(200))
    .catch(() => {
      User.on("index", (err) => {
        if (err) res.sendStatus(403);
        console.log({ message: err });
        return;
      });
    });
}

function login(req, res) {
  User.findOne({ username: req.body.username })
    .then((result) => {
      if (req.body.password === result.password) {
        res.sendStatus(200);
      } else res.sendStatus(401);
    })
    .catch((err) => console.log(err));
}

function getUser(req, res) {
  User.findById(req.query.id)
    .then((result) => {
      // (note: this will return users credentials. kinda problematic)
      res.sendStatus(200).json({ result: result });
    })
    .catch((err) => console.log(err));
}

function deleteUser(req, res) {
  User.findOneAndDelete(req.param.id)
    .then(() => res.sendStatus(200))
    .catch((error) => console.log(error));
}

function getUserTasks(req, res) {
  Task.find({ assignees: { $in: [req.param.userId] } })
    .then((result) => {
      res.sendStatus(200).json(result);
      res.render("data", { title: "Tasks", data: result });
    })
    .catch((err) => res.sendStatus(err.status || 500).json({ error: err }));
}

module.exports = {
  newUser,
  login,
  getUser,
  deleteUser,
  getUserTasks,
};
