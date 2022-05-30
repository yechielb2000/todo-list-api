# nodejs-server-todo-list
Node JS server for [todo list app](https://github.com/yechielb2000/TodoList)
## Instructions for using the server
1. Make a new database in your MongoDB with a collection named `users` .
2. Click on `connect` then `connect your application` , change the driver to `node js` and `version 4.0 or later` and copy the link they give you.
3. In the server code go to `nodejs-server-todo-list/routes/index.js` and paste your link here    
    
    ```js
      const db = mongoose.connect(<PASTE-HERE-YOUR-LINK>)
     .then(()=> console.log('connected to database'))
     .catch((error)=> {console.log(error)})
     ``` 
   Now on your terminal run `npm start` and you are good to go.
## Schemas   
### User :
```js
mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  email: String,
  password: String
}), "users")
```
### Task : 
```js
mongoose.Schema({
    title: String,
    text: String,
    deadlineDate: Number
  })
```
## Routes and their use 
Very important ➡ the server gets url params only from `query` (you can change this in the code)
##### `/` Requirements : none
homepage : there is nothing to do here
## Users route
##### `/users` Requirements : none
Returns all users 
##### `/users/user` Requirements : name, password
Returns user 
##### `/users/user-by-id` Requirements : id
Returns user 
##### `/users/delete` Requirements : id
Deletes user
##### `/users/new` Requirements : name, email, password (name in users collection must be unique)
Returns user 
## Tasks route 
##### `/tasks` Requirements : collectionId (it's the user id that you get when the user sign in)
Returns all tasks 
##### `/tasks/delete` Requirements :  collectionId, id(task id)
Deletes task 
##### `/tasks/new` Requirements : title, text, deadlineDate, collectionId
Returns task
