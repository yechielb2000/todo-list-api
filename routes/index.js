const express = require('express')
const packageJson = require('../package.json')
const router = express.Router()
const tasksRouter = express.Router()
const userRouter = express.Router()
const mongoose = require('mongoose')

//routes
const user = require('./user')
const task = require('./task')

mongoose.connect(packageJson.env.mongoLink)
.then(()=> console.log('connected to database'))
.catch((error)=> {console.log(error)})

router.get('/', function(req, res) {
  res.render('index', {title: 'Home'})
})

//gets collectionId from query 
tasksRouter.get('/' , task.getAllTasks)

//gets nothing
userRouter.get('/', user.getAllUsers)

//gets userId from query 
userRouter.get('/user', user.getUserById)

userRouter.delete('/delete', user.deleteUser)

//gets collectionId and id(task id) from query
tasksRouter.delete('/delete', task.deleteTask)

//gets name, email, password from query
userRouter.get('/new', user.newUser)

//gets title, text, deadlineDate and collectionId from query
tasksRouter.get('/new', task.newTask)
 
module.exports = {
  router,
  tasksRouter,
  userRouter
}
