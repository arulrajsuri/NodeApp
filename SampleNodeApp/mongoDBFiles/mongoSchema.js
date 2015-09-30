var mongoose=require('mongoose');
var db=require('./mongoConnect');

var schemaobjj=db.mongooseObj.Schema.Types.ObjectId;

var Schema =
{
    messageSchema:new mongoose.Schema(
        {
            messageType :String,
            messageData :String,
            messageLikes:Number,
            messagePostedDate :Date
        }

    ),
    commentSchema:new mongoose.Schema(

        {
            messageId:{type:schemaobjj},
            messageComments:[
                {
                    name : String,
                    comment:String
                }
            ]
        }
    ),
    userSchema:new mongoose.Schema(
        {
            userName :String,
            passWord :String
        }

    )


}

    /*new mongoose.Schema(
    {
        messageType :String,
        messageData :String,
        messageLikes:Number,
        messagePostedDate :Date
    }

);

var commentSchema =new mongoose.Schema(

    {
        messageId:{type:schemaobjj},
        messageComments:[
            {
                name : String,
                comment:String
            }
        ]
    }
)*/
module.exports=Schema;
