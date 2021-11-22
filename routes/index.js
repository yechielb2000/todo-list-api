const express = require('express')
const packageJson = require('../package.json')
const router = express.Router()
const mongoose = require('mongoose')

//routers
const user = require('./user')
const task = require('./task')

mongoose.connect(packageJson.env.mongoLink)
.then(()=> console.log('connected to database'))
.catch((error)=> {console.log(error)})


router.get('/', function(req, res) {
  res.render('index', {title: 'Home'})
})

router.get('/users', user.getAllUsers)

router.get('/tasks', task.getAllTasks)

router.get('/users/user', user.getUserById)

router.delete('/users/delete', user.deleteUser)

router.delete('/tasks/delete', task.deleteTask)

router.get('/users/new', user.newUser)

router.post('/tasks/new', task.newTask)

module.exports = router
