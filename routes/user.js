const mongoose = require('mongoose')

function newUser(req, res){

  if(!User.findById(req.query.name)){

    const User = mongoose.model('User', mongoose.Schema({
      name: String,
      email: String,
      password: String
    }), "users")

    new User({
      name: req.query.name,
      email: req.query.email,
      password: req.query.password
      }).save()
      .then((result) => {
        console.log(result)
        res.status(200).json({id: result._id})
      })
      .catch((error) => console.log(error)) 
  }else{
    res.status(403).send({message: "This name is taken. Try another one"})
  }
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

function getUserById(req, res){
  
  User.findById(req.query.id).then((result) =>{

    if(req.query.name === result.name && req.query.password === result.password)
      res.status(200)
    else res.status(401)
    
  
  })
  .catch((error) => console.log(error))
}

function deleteUser(req, res) {

  User.findOneAndDelete(req.query.id)
  .then((user) =>{
    res.status(200)
    console.log(user)
  })
  .catch((error) => console.log(error))
 
}

module.exports = {
    newUser,
    getAllUsers,
    getUserById,
    deleteUser
}