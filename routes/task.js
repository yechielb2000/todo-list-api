const Task = require('../models/task')

function newTask(req, res){
    
    new Task({
        title: req.body.title,
        text: req.body.text,
        picked_date: new Date(parseInt(+req.body.picked_date)),
        createdAt: new Date()
    
        }).save()
        .then((result) => {
            console.log(result)
            res.status(200)
        })
        .catch((error) => console.log(error))
}

function getAllTasks(req, res){

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
