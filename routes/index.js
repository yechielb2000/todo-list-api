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

tasksRouter.get('/' , task.getAllTasks)

userRouter.get('/', user.getAllUsers)

userRouter.get('/user', user.getUserById)

userRouter.delete('/delete', user.deleteUser)

tasksRouter.delete('/delete', task.deleteTask)

userRouter.get('/new', user.newUser)

tasksRouter.get('/new', task.newTask)
 
module.exports = {
  router,
  tasksRouter,
  userRouter
}
