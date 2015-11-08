var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/mydatabase');
//mongodb://localhost/mydatabase
//mongodb://herokuMongo:heroku123@ds045608.mongolab.com:45608/heroku_p55cpvzz
//mongodb://herokuMongo:heroku123@ds045608.mongolab.com:45608/heroku_p55cpvzz
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
