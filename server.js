// This will we the starting file of the project


const express = require("express")
const mongoose = require("mongoose")
const app = express()
const server_config = require("./configs/server.config")
const db_config = require("./configs/db.config")
const user_model = require("./models/user.model") 
const bcrypt = require("bcryptjs")

app.use(express.json()) //middleware,,, convert jason into javasvript obj.


/*
   Create an admin user at the staring of the application
   if not already present
*/

// Connection with MongoDB
mongoose.connect(db_config.DB_URL)

const db = mongoose.connection

db.on("error" , ()=>{
    console.log('Error while connecting to the mongoDB')
})

db.once("open" , ()=>{
    console.log("Connected to mongoDB")
    init()  // it will initialise my database
})

async function init(){
    try{
        let user = await user_model.findOne({userId : "admin"})

        if(user){
            console.log("Admin is already present")
            return
        }

      
        

    }
    catch(err){
        console.log("Error while reading the data")
    }
    

    try{
        user = await user_model.create({
            name : "Prince",
            userId : "admin",
            email : "shrivastavaprince@gmail.com",
            userType : "ADMIN",
            password : bcrypt.hashSync("Welcome" ,8)
        })
        console.log("Admin created ", user)

    }
    catch(err){
        console.log("Error while create admin" , err)
    }
}

/* 
* Stitch the route to the server

*/
require("./routes/auth.routes")(app) // calling routes and passing apps obj
require("./routes/category.routes")(app)

/*
   Start the server
*/

app.listen((require("./configs/server.config")).PORT, ()=>{
    console.log("Server started at port num : ", (require("./configs/server.config")).PORT)
})
