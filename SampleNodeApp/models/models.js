var mongoose = require("mongoose");

var employeeSchema=new mongoose.Schema({
    ename:String,
    eage : Number,
    edept : String
});

var empdata= mongoose.model('employee',employeeSchema);


