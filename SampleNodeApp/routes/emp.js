var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var empdb=require('./db.js');
var employeeproxy=empdb.employee;
router.get('/', function(req, res, next) {
    var empval =req.body.empdata;
    var empinsert=new employeeproxy({
        ename:empval.empname,
        eage:empdata.empage,
        edept:empdata.empdept
    })

    empinsert.save(function(err,user){
            console.log(user);
        }
    )

  //  res.render('index', { title: 'Express' });
});

module.exports = router;
