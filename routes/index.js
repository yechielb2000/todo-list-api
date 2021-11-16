const express = require('express')
const packageJson = require('../package.json')
const router = express.Router()
const mongoose = require('mongoose')

//routers
const user = require('./user')
const task = require('./task')


mongoose.connect(packageJson.env.mongoLink).then(()=> console.log('connected to database')).catch((error)=> {console.log(error)})


router.get('/', function(req, res) {
  res.render('index', { title: 'Todo list server' })
})

router.get('/users', function(req, res) {
  if (req.body.id) {
    user.getUserById
  }else{
    user.getAllUsers
  }
})

router.post('/users/new', user.newUser)

router.post('/tasks/new', task.newTask)

module.exports = router
