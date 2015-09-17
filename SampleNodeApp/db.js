/*
var mongoose = require("mongoose");
var db = mongoose.connection;
mongoose.connect('mongodb://localhost/mydate');
db.once('open', function() {
  console.log("Connected to MongoDB");
});

var employeeSchema=new mongoose.Schema({
    ename:String,
    eage : Number,
    edept : String
})

var employee = mongoose.model('employee',employeeSchema);
/!*var empinsert=new employee({
    ename:"xxx",
    eage:29,
    edept:"IT"
})

empinsert.save(function(err,user){
     console.log(user);
    }
)*!/

module.exports =db;
module.exports=mongoose;
module.exports =employee;*/
