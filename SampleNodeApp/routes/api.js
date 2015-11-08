var express =require('express');
var router = express.Router();
console.log("loading api");
var models=require('../mongoDBFiles/mongoModel');
/*router.route('/posts').post(
function(req,res)
{
console.log("trying to connect Database");
    console.log("Data inserted");
    res.send("data inserted");
}
);*/
/*var Message=models.MessageModel;
var insertobj=new Message(
    {
        messageType :'T',
        messageData :'xxx',
        messageLikes:0,
        messagePostedDate :new Date()
    }

)*/
var Message=models.MessageModel;

router.route('/likes').post(
    function(req,res)
    {
console.log(req.body.messageID);
        var messageid=req.body.messageID
        Message.findById(messageid,
        function(err,message)
        {
            message.messageLikes=message.messageLikes+1;
            message.save(function(err,data)
                {
                    console.log("saved");
                    /*res.header("Access-Control-Allow-Origin", "*");
                    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
                    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");*/
                    res.send(data);
                }
            )

        }
        );

    }

)

/*router.route('/viewData').get(
    function(req,res)
    {
        req.query.
    }
);*/


router.route('/posts').get(
    function(req,res)
    {
console.log("Request Paramater::"+req.query.message);
        var message =req.query.message;
        if(message=='ViewData')
        {
            var messagequery=Message.find();
            messagequery.sort('-messagePostedDate');
            messagequery.select('_id messageType messageData messageLikes messagePostedDate');
            messagequery.exec(
                function(err,messages)
                {
                    res.send(messages);
                }
            )
        }
        else
        {
            var messageObject;
            var messagequery=Message.find({'messageType':message});
            messagequery.sort('-messagePostedDate');
            messagequery.select('_id messageType messageData messageLikes messagePostedDate');
            messagequery.exec(
                function(err,messages)
                {
                    /*res.header("Access-Control-Allow-Origin", "*");
                     res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
                     res.header("Access-Control-Allow-Methods", "GET, PUT, POST");*/
                    res.send(messages);
                }
            )
            //console.log("messageObject::"+messageObject.length);
            //res.send(messageObject);
        }

    }
);

router.route('/posts').post(
    function(req,res)
    {
        var insertobj;
        req.body.myval.forEach(
            function(value)
            {
                insertobj=new Message(
                    {
                        messageType :value.messageType,
                        messageData :value.messageData,
                        messageLikes:0,
                        messagePostedDate :value.messageDate
                    }
                );

                insertobj.save(function(err,data)
                {
                    if(err) console.log(err);
                    console.log("inserted");
                })
                console.log(value.messageType);
            }
        )
       /* res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST");*/
        res.send(insertobj);
       /*objarray.forEach(entry)
        {*/

       /* }*/
       // console.log(req.body.myval);

        /*var emp={
            empname :'xxx',
            empage:29,
            empdept:'IT'
        }
       console.log(req.body.myval);
        console.log("trying to connect Database using get request");
        console.log("Data inserted ");
        res.send(emp);*/
    }
);

var user

var User=models.UserModel;

router.route('/adduser').post(
    function(req,res)
    {
        var val=req.body.myval;
        var insertobj=new User(
            {
                userName:val.username,
                passWord:val.password

            }
        );

        insertobj.save();
        console.log("uservalue::"+val.username);
        console.log("uservalue::"+val.password);
    }

)


router.route('/userlogin').post(
    function(req,res)
    {
        var val=req.body.myval;
        /*var insertobj=new User(
            {
                userName:val.username,
                passWord:val.password

            }
        );*/
        console.log("logging::"+val.username);
        var userquery=User.find( { $and: [ { userName: val.username }, { passWord:val.password } ] } );
userquery.exec(
    function(err,messages)
    {
        console.log("dsfsdgfsdg");
        console.log(messages);
        /*res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, x-requested-with");
        res.header("Access-Control-Max-Age","99999");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST ,OPTIONS");*/
        res.send(messages);
    }
);

        console.log("uservalue::"+val.username);
        console.log("uservalue::"+val.password);
    }

)

module.exports=router;