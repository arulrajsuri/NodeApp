var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/mydatabase');
var db =mongoose.connection;

db.on('error',console.error);
db.once('open',function()
{
    console.log("Successfully Connected to Mongo Database");
})
var exportObject={
    mongooseObj:mongoose,
    mongooseDBCon:db
}


module.exports=exportObject;
