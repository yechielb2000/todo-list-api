const mongoose = require('mongoose')

const User = mongoose.model('User', mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  email: String,
  password: String
}), "users")

function newUser(req, res){

    new User({
      name: req.query.name,
      email: req.query.email,
      password: req.query.password
      }).save()
      .then((result) => {
        console.log(result)
        res.status(200).json(result)
      })
      .catch(() => {
        User.on('index', function(err) {
          if (err)
            res.status(403).json({message: err})
            console.log({message: err})
            return
          })}) 
}

function getAllUsers(req, res){

  User.find()
    .then((result) => {
      res.status(200)
      res.render('users', {title: "Users", users: result})
      console.log(result)
    })
    .catch((error) => console.log(error))
}

function loginUser(req, res){
  
  User.findById(req.query.id)
  .then((result) =>{
    if(req.query.name === result.name && req.query.password === result.password){
      console.log({status: 200, response: result, message: "logged in"})  
      res.status(200).json({status: 200, response: result, message: "logged in"});
    }else res.status(401).json({status: 401, message: "incorrect details"})
  })
  .catch((error) => console.log(error))
}

function deleteUser(req, res) {

  User.findOneAndDelete(req.query.id)
  .then((user) =>{
    res.status(200).json({status:200, user: user, message: "user has been deleted successfully!"});
    console.log(user)
  })
  .catch((error) => console.log(error))
 
}

module.exports = {
    newUser,
    getAllUsers,
    loginUser,
    deleteUser
}