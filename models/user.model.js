const mongoose = require("mongoose")


/*
*name
*userId
*password
*email
*usertype
*/

const userSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        minlength : 10,
        unique : true 
    },
    usertype : {
        type : String,
        required : true,
        default : "CUSTOMER",
        enum : ["CUSTOMER", "ADMIN"]
    }
    
        
},{timestamps : true,versionKey:false})

module.exports = mongoose.model("user", userSchema)  // it will create users collections
