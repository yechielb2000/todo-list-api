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
        res.status(200).send(result)
      })
      .catch(() => {
        User.on('index', function(err) {
          if (err)
            res.status(403).send(null)
            console.log({message: err})
            return
          })}) 
}

function getAllUsers(req, res){

  User.find()
    .then((result) => {
      res.status(200).send(result)
      res.render('users', {title: "Users", users: result})
      console.log(result)
    })
    .catch((error) => console.log(error))
}

function loginUser(req, res){
  
  User.findOne({name: req.query.name})
  .then((result) =>{
    if(req.query.password === result.password){
      console.log({response: result, message: "logged in"})  
      res.status(200).send(result);
    }else res.status(401).send(null)
  })
  .catch((error) => console.log(error))
}

function deleteUser(req, res) {

  User.findOneAndDelete(req.query.id)
  .then((user) =>{
    res.status(200).send({user: user, message: "user has been deleted successfully!"});
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