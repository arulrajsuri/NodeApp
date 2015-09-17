var express =require('express');
var router = express.Router();
console.log("loading api");
/*router.route('/posts').post(
function(req,res)
{
console.log("trying to connect Database");
    console.log("Data inserted");
    res.send("data inserted");
}
);*/

router.route('/posts').get(
    function(req,res)
    {
        console.log(req.query.myval);
        console.log("trying to connect Database using get request");
        console.log("Data inserted ");
        res.send("data inserted into Database");
    }
);


router.route('/posts').post(
    function(req,res)
    {
        var emp={
            empname :'xxx',
            empage:29,
            empdept:'IT'
        }
       console.log(req.body.myval);
        console.log("trying to connect Database using get request");
        console.log("Data inserted ");
        res.send(emp);
    }
);

module.exports=router;