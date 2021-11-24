const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    title: String,
    text: String,
    deadlineDate: Number
  })

function newTask(req, res){

    console.log(req.query)

    let Task = mongoose.model("Task", taskSchema, req.query.collectionId) 
  
    new Task({
        title: req.query.title,
        text: req.query.text,
        deadlineDate: req.query.deadlineDate
    }).save()
    .then((result) => {
        console.log(result)
        res.status(200)
    })
    .catch((error) => console.log("error : " + error))
}

function getAllTasks(req, res){

    let Task = mongoose.model("Task", taskSchema, req.query.collectionId) 

    Task.find()
    .then((result) => {
        res.status(200)
        res.render('tasks', {title: "Tasks", tasks: result})
        console.log(result)
    })
    .catch((error) => console.log(error))
}

function deleteTask(req, res){

    Task.findOneAndDelete(req.body.id)
    .then((task) => {
        res.status(200)
        console.log(task)
    })
    .catch((error)=>{
        console.log(error)
      })
}

module.exports = {
    newTask,
    getAllTasks,
    deleteTask
}
