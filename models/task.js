const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({

    title: String,
    text: String,
    createAt: Number,
    deadlineDate: Number
})

module.exports = mongoose.model('Task', taskSchema)