const User = require('../models/user')

function newUser(req, res){

    new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        createdAt: new Date()

        }).save()
        .then((result) => {
          console.log(result)
          res.status(200)
        })
        .catch((error) => console.log(error))
}

function getAllUsers(req, res){

  User.find()
    .then((result) => {
      res.status(200).send(result)
      console.log(result)
    })
    .catch((error) => console.log(error))
}

function getUserById(req, res){

  User.findOne(req.body.id).then((result) =>{

    console.log(result)

    console.log(req.body.name + " " + result.name)
    console.log(req.body.password + " " + result.password)

    // if(req.body.name == result.name && req.body.password == result.password){
    //   // res.status(200).send()
    // }else{
    //   // res.status(401).send()
    // }
   
  })
  .catch((error) => console.log(error))

}

function deleteUser(req, res) {

  User.findOneAndDelete(req.body.id)
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