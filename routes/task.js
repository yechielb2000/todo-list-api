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
        res.status(200).send(result)
        console.log(result)
    })
    .catch((error) => console.log(error))
}

function deleteTask(req, res){

    Task.findOneAndRemove(req.body.id)
    .then((result) => {
        res.status(200)
        console.log(result)
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
