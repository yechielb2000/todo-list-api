const express = require("express");
const mongoose = require("mongoose");
const indexRouter = express.Router();
const taskRouter = express.Router();
const userRouter = express.Router();
const tasks = require("./tasks");
const users = require("./users");

const db = mongoose.connect(/*enter link to access the mongoDB*/)
.then(()=> console.log('connected to database'))
.catch((error)=> {console.log(error)})

indexRouter.get("/", function (req, res) {
  res.render("index", { title: "To-Do-List-App" });
});

taskRouter.post("/", tasks.newTask);
taskRouter.get("/:id", tasks.getTask);
taskRouter.put("/:id", tasks.updateTask);
taskRouter.delete("/:id", tasks.deleteTask);

userRouter.post("/", users.newUser);
userRouter.get("/login", users.login);
userRouter.get("/:id", users.getUser);
userRouter.get("/:userId/tasks", users.getUserTasks);
userRouter.delete("/:id", users.deleteUser);

module.exports = {
  indexRouter,
  taskRouter,
  userRouter,
};
