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

module.exports = {
    newTask
}
