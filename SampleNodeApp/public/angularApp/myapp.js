var app=angular.module("myapp",["ngRoute","firebase"]);

app.value('MessageValues',{
    thoughtData : "Thought for the Day",
    infoData : "Info for the Day",
    funData : "Fun for the Day",
    messageData : "Message for the Day",
    newsData : "News for the Day",
    adminData: "admin console"
});

app.config(function($routeProvider)
    {
        $routeProvider.when('/contact',{
            templateUrl: 'contact.html',
            controller: 'appController'
            }
                         )
            .when('/about',{
                templateUrl: 'about.html',
                controller: 'appController'

             }
                  )
            .when('/thought',{
                templateUrl: 'thought2.html',
                controller: 'thoughtController'
            }
        )
            .when('/info',{
                templateUrl: 'info.html',
                controller: 'infoController'
            }
        )
            .when('/fun',{
                templateUrl: 'fun.html',
                controller: 'funController'
            }
        )

            .when('/news',{
                templateUrl: 'news.html',
                controller: 'newsController'
            }
        )

            .when('/message',{
                templateUrl: 'message.html',
                controller: 'messageController'
            }
        )
            .when('/login',{
                templateUrl: 'login.html',
                controller: 'loginController'
            }
        )

            .when('/admin',{
                templateUrl: 'admin.html',
                controller: 'adminController'
            }
        )


    }


);
app.factory("SharedService",function()
{
var serviceObj={
    hideValue:false
}
    return serviceObj;
});

app.directive('display',function($timeout)
{
    var directive={};
    directive.restrict ='E';
    directive.scope={};
  //  directive.require='ngModel';
    directive.scope.datevalue="=selectedDate";
   directive.templateUrl="directiveTemplate.html";
    directive.replace=true;
    directive.link=function(scope,element,attrs)
    {
     //   scope.display= $(element).datepicker();
        $(element).datepicker({
            dateFormat: 'mm/dd/yy',
            onSelect: function (date) {
                var timeVal=new Date();
                var hours = timeVal.getHours();
                var minutes = timeVal.getMinutes();
                var seconds=timeVal.getSeconds();
                var ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12;
                hours = hours ? hours : 12;
                minutes = minutes < 10 ? '0'+minutes : minutes;
                seconds = seconds <10 ?  '0'+seconds : seconds;
                var strTime = hours + ':' + minutes + ':' + seconds+ ' '+ ampm;

                date =date + " " +strTime;
                scope.datevalue = date;
                scope.$digest();
                scope.$apply();
            }
        });
      //  console.log("datevalue::"+scope.datevalue); DD, d  MM, yy
    //    scope.datevalue="Modifying date value";
      //  var elem = angular.element(document.querySelector('#datepicker'));
       // angular.element(elem).triggerHandler('click');


        //    scope.display= $(elem).datepicker();


     /*angular.element(document).ready(
         function()
         {
             scope.display= $("#datepicker").datepicker();
         });*/
//         scope.display= $("#datepicker").datepicker();
//$("#datepicker").datepicker();;

    }

    return directive;
})

app.controller("navController",function($rootScope,$scope)
    {
$rootScope.hideValue=false;
        $scope.checkJumbo=function()
        {
            if(!$scope.localHide)
            {
                $rootScope.hideValue=false;
            }
            /*$rootScope.$watch('hideValue',function(oldval,newval)
                {
                    $scope.localHide=newval;
                }
            )*/
        }
$scope.adminToggle=function()
{
    //console.log("Function called" + $rootScope.hideValue);
    if(! $rootScope.hideValue)
    {
        $rootScope.hideValue=true;
        console.log("jumbo invisible");
    }
    else
    {
        $rootScope.hideValue=false;
        console.log("jumbo visible");
    }
}
    }
);

app.controller("jumboController",function($rootScope,$scope)
    {
        //console.log("jumbo value::" + $rootScope.hideValue);
        $scope.localHide;
        $rootScope.$watch('hideValue',function(oldval,newval)
        {
        $scope.localHide=newval;
        }
        )
//$scope.hideValue=SharedService.hideValue;
    }
);


app.controller("appController", function ($scope) {

});


app.controller("loginController", function ($rootScope,$scope,$http,$timeout,$firebaseArray,$location,MessageValues) {


    $scope.loginHideValue=false;

    $scope.username="";
    $scope.password="";
    $scope.logindisabled=true;
    $scope.logindatacount=2;
    $scope.uservalueavailable=false;
    $scope.passwordvalueavailable=false;
    $scope.errormessagehide=true;
    $scope.$watch('username',function(newvalue,oldvalue)
        {
            console.log("newvalue::"+newvalue);
            if(newvalue!='')
            {
                $scope.errormessagehide=true;
                $scope.uservalueavailable=true;
            }
            else
            {
                $scope.uservalueavailable=false;

            }

        }
    )


    $scope.$watch('password',function(newvalue,oldvalue)
        {
            if(newvalue!='')
            {

                $scope.errormessagehide=true;
                $scope.passwordvalueavailable=true;

            }
            else
            {
                $scope.passwordvalueavailable=false;

            }

        }
    )

    $scope.$watch('uservalueavailable',function(newvalue,oldvalue)
    {

        if(newvalue)
        {
            $scope.logindatacount++;
        }
        else
        {
            $scope.logindatacount--;
        }
    })

    $scope.$watch('passwordvalueavailable',function(newvalue,oldvalue)
    {
        if(newvalue)
        {
            $scope.logindatacount++;
        }
        else
        {
            $scope.logindatacount--;
        }
    })

    $scope.$watch('logindatacount',function(newvalue,oldvalue)
        {
            console.log("logindatacount::"+newvalue);
            if(newvalue==2)
            {
                $scope.logindisabled=false;
            }
            else
            {
                $scope.logindisabled=true;
            }

        }
    )


    $rootScope.$watch('hideValue',function(oldvalue,newvalue)
    {
        $scope.loginHideValue=!oldvalue;

    });
    $scope.adminvalidate=function()
    {

var userval={
    username:$scope.username,
    password:$scope.password
}
        $http({
            url: 'https://whatventwell.herokuapp.com/api/userlogin',
            method: "POST",
            headers:{'Content-Type': 'application/x-www-form-urlencoded'},
            data:{myval: userval}
//https://whatventwell.herokuapp.com/   http://localhost:3000/api/adduser
        }).success(
            function(data,status,headers,config)
            {

console.log("length::"+data.length);
                if(data.length>0)
                {
                    $location.path("/admin")
                }
                else
                {
                    $scope.errormessagehide=false;
                    $scope.username="";
                    $scope.password="";
                }
            }
        )
    }


})

app.controller("thoughtController", function ($scope,$http,$timeout,$firebaseArray,MessageValues) {

    var ref ;
    $scope.firethoughtmessagescount;
    $scope.tempcomments;
    $scope.loading=false;

    function getCommentsRef()
    {
        return new Firebase("https://samplenodeapp.firebaseio.com/thoughts/comments");
    }

    //$scope.firebasemessages = $firebaseArray(ref);
    $scope.messagetitle = MessageValues.thoughtData;
    $scope.thoughtContainer = "";
    $scope.messageLikes = "99";

    $scope.$watch('firethoughtmessagescount',function(){

    })
    $scope.addFireMessage = function() {
        var currentIndex = $('div.active').index();
        var messageidvalue=$scope.thoughtContainer[currentIndex]._id
        console.log($scope.firethoughtmessagescount.$indexFor(messageidvalue));

            console.log("name::"+$scope.name);
            if($scope.firethoughtmessagescount.$indexFor(messageidvalue)==-1)
            {
                var ref = new Firebase("https://samplenodeapp.firebaseio.com/thoughts/comments/"+messageidvalue);
                $scope.firethoughtmessagescount = $firebaseArray(ref);
                $scope.firethoughtmessagescount.$add({from:$scope.name,body:$scope.msg});
                $scope.firethoughtmessagescount = $firebaseArray(getCommentsRef());

                $scope.name="";
                $scope.msg="";

            }
            else{
                var ref = new Firebase("https://samplenodeapp.firebaseio.com/thoughts/comments/"+messageidvalue);
                $scope.firethoughtmessagescount = $firebaseArray(ref);
                $scope.firethoughtmessagescount.$add({from:$scope.name,body:$scope.msg});
                $scope.firethoughtmessagescount = $firebaseArray(getCommentsRef());
                $scope.name="";
                $scope.msg="";

            }



        //LISTEN FOR RETURN KEY
        /*var currentIndex = $('div.active').index();
        var messageidvalue=$scope.thoughtContainer[currentIndex]._id

        if (e.keyCode === 13 && $scope.msg) {
            //ALLOW CUSTOM OR ANONYMOUS USER NAMES
            var fireObj={
                messageId : messageidvalue,
                messageComments :{from:name,body:$scope.msg}
            };
            var name = $scope.name || "anonymous";
            $scope.firebasemessages.({from:name,body:$scope.msg,messagid:messageidvalue});
            //RESET MESSAGE
            $scope.msg = "";
        }*/
    }


    $scope.addLikes = function ()
    {
        var currentIndex = $('div.active').index();
        var messageid=$scope.thoughtContainer[currentIndex]._id
        console.log($scope.thoughtContainer[currentIndex]._id);
        console.log($scope.thoughtContainer[currentIndex].messageData);
        $http(
            {
                url: 'https://whatventwell.herokuapp.com/api/likes',
                method: "POST",
                data : {messageID :messageid }
            }
//https://whatventwell.herokuapp.com/   http://localhost:3000
        ).success(
            function(data,status,headers,config)
            {
                for(var i=0;i<$scope.thoughtContainer.length;i++)
                {
                    if($scope.thoughtContainer[i]._id==data._id)
                    {
                        $scope.thoughtContainer[i].messageLikes=data.messageLikes;
                    }
                }
                $scope.messageLikes=data.messageLikes;
            }
        )

            }
$scope.hiddenvalue;
    $scope.navigate =function(data)
    {
       // var sample=$('#hiddenvalue').val();
//console.log(data);
        $scope.messageLikes=$scope.thoughtContainer[data].messageLikes;

        for(var i=0;i<$scope.firethoughtmessagescount.length;i++)
        {
            if($scope.firethoughtmessagescount[i].$id==$scope.thoughtContainer[data]._id)
            {
                $scope.tempcomments=$scope.firethoughtmessagescount[i];
                break;
            }
            else
            {
                $scope.tempcomments="";
            }

        }
        //console.log($scope.thoughtContainer[data].messageData);

    }
    $scope.displaypositionprev=function()
    {
        var sample=$('div.active').index()-1;
        console.log("$('div.active').index()-1::"+sample);
        var currentIndex = $('div.active').index()-1<$scope.thoughtContainer.length ? (($('div.active').index()-1)!=-1 ? $('div.active').index()-1 : 5):0;
     //   alert($scope.thoughtContainer.length);
      //  alert("currentIndex::"+currentIndex);
        console.log("currentIndex::"+currentIndex);
        $scope.messageLikes=$scope.thoughtContainer[currentIndex].messageLikes;
        console.log($scope.thoughtContainer[currentIndex].messageData);
        var messageid=$scope.thoughtContainer[currentIndex]._id;

        console.log("$scope.thoughtContainer[currentIndex]._id:"+$scope.thoughtContainer[currentIndex]._id);

        for(var i=0;i<$scope.firethoughtmessagescount.length;i++)
        {
            console.log("$scope.firethoughtmessagescount[i].$id:"+$scope.firethoughtmessagescount[i].$id);
            if($scope.firethoughtmessagescount[i].$id==$scope.thoughtContainer[currentIndex]._id)
            {
                $scope.tempcomments=$scope.firethoughtmessagescount[i];
                break;
            }
            else
            {
                $scope.tempcomments="";
            }

        }

    }
    $scope.displaypositionnext=function()
    {
        var currentIndex = $('div.active').index()+1<$scope.thoughtContainer.length?$('div.active').index()+1 : 0;
       // alert($scope.thoughtContainer.length);
        //alert("currentIndex::"+currentIndex);
        $scope.messageLikes=$scope.thoughtContainer[currentIndex].messageLikes;
console.log($scope.thoughtContainer[currentIndex].messageData);

        for(var i=0;i<$scope.firethoughtmessagescount.length;i++)
        {
            if($scope.firethoughtmessagescount[i].$id==$scope.thoughtContainer[currentIndex]._id)
            {
                $scope.tempcomments=$scope.firethoughtmessagescount[i];
                break;
            }
            else
            {
                $scope.tempcomments="";
            }

        }

    }

    $scope.displaythoughts=function()
    {

        $scope.thoughtContainer.forEach(
            function(value)
            {
                console.log(value.messageData);
            }

        )
    }

    $scope.display=function()
    {
        $http(
            {
                url: 'https://whatventwell.herokuapp.com/api/posts?message=T',
                method: "GET"
            }

        ).success(
            function(data,status,headers,config)
            {


               /* var obj={
                    thoughtObj : data
                }*/
                $scope.thoughtContainer=data;

                console.log($scope.thoughtContainer.length);
                var sample=$('div.active').index()+1;
                $scope.messageLikes=$scope.thoughtContainer[sample].messageLikes;

               /* data.forEach(function(value)
                    {
                        console.log(value.messageData);
                    }
                );*/
         //   console.log("success");


            }
        );
        ref = new Firebase("https://samplenodeapp.firebaseio.com/thoughts/comments");
        $scope.firethoughtmessagescount=$firebaseArray(ref);
      $scope.firethoughtmessagescount.$loaded().then(function()
      {
          var sample=$('div.active').index();
         // console.log("commentsCount display initilization:"+$scope.firethoughtmessagescount.length);
          for(var i=0;i<$scope.firethoughtmessagescount.length;i++)
          {
              console.log("$scope.firethoughtmessagescount[i].$id:"+$scope.firethoughtmessagescount[i].$id);
              if($scope.firethoughtmessagescount[i].$id==$scope.thoughtContainer[sample]._id)
              {
                  $scope.tempcomments=$scope.firethoughtmessagescount[i];
                  break;
              }
              else
              {
                  $scope.tempcomments="";
              }

          }
          $scope.loading=true;
      })



    }

});

app.controller("infoController", function ($scope,$http,$timeout,$firebaseArray,MessageValues) {
    $scope.messagetitle=MessageValues.infoData;

    var ref ;
    $scope.firethoughtmessagescount;
    $scope.tempcomments;
    $scope.loading=false;

    function getCommentsRef()
    {
        return new Firebase("https://samplenodeapp.firebaseio.com/info/comments");
    }

    //$scope.firebasemessages = $firebaseArray(ref);
    $scope.thoughtContainer = "";
    $scope.messageLikes = "99";

    $scope.$watch('firethoughtmessagescount',function(){

    })
    $scope.addFireMessage = function() {
        var currentIndex = $('div.active').index();
        var messageidvalue=$scope.thoughtContainer[currentIndex]._id
        console.log($scope.firethoughtmessagescount.$indexFor(messageidvalue));

        console.log("name::"+$scope.name);
        if($scope.firethoughtmessagescount.$indexFor(messageidvalue)==-1)
        {
            var ref = new Firebase("https://samplenodeapp.firebaseio.com/info/comments/"+messageidvalue);
            $scope.firethoughtmessagescount = $firebaseArray(ref);
            $scope.firethoughtmessagescount.$add({from:$scope.name,body:$scope.msg});
            $scope.firethoughtmessagescount = $firebaseArray(getCommentsRef());

            $scope.name="";
            $scope.msg="";

        }
        else{
            var ref = new Firebase("https://samplenodeapp.firebaseio.com/info/comments/"+messageidvalue);
            $scope.firethoughtmessagescount = $firebaseArray(ref);
            $scope.firethoughtmessagescount.$add({from:$scope.name,body:$scope.msg});
            $scope.firethoughtmessagescount = $firebaseArray(getCommentsRef());
            $scope.name="";
            $scope.msg="";

        }



        //LISTEN FOR RETURN KEY
        /*var currentIndex = $('div.active').index();
         var messageidvalue=$scope.thoughtContainer[currentIndex]._id

         if (e.keyCode === 13 && $scope.msg) {
         //ALLOW CUSTOM OR ANONYMOUS USER NAMES
         var fireObj={
         messageId : messageidvalue,
         messageComments :{from:name,body:$scope.msg}
         };
         var name = $scope.name || "anonymous";
         $scope.firebasemessages.({from:name,body:$scope.msg,messagid:messageidvalue});
         //RESET MESSAGE
         $scope.msg = "";
         }*/
    }


    $scope.addLikes = function ()
    {
        var currentIndex = $('div.active').index();
        var messageid=$scope.thoughtContainer[currentIndex]._id
        console.log($scope.thoughtContainer[currentIndex]._id);
        console.log($scope.thoughtContainer[currentIndex].messageData);
        $http(
            {
                url: 'https://whatventwell.herokuapp.com/api/likes',
                method: "POST",
                data : {messageID :messageid }
            }

        ).success(
            function(data,status,headers,config)
            {
                for(var i=0;i<$scope.thoughtContainer.length;i++)
                {
                    if($scope.thoughtContainer[i]._id==data._id)
                    {
                        $scope.thoughtContainer[i].messageLikes=data.messageLikes;
                    }
                }
                $scope.messageLikes=data.messageLikes;
            }
        )

    }
    $scope.hiddenvalue;
    $scope.navigate =function(data)
    {
        // var sample=$('#hiddenvalue').val();
//console.log(data);
        $scope.messageLikes=$scope.thoughtContainer[data].messageLikes;

        for(var i=0;i<$scope.firethoughtmessagescount.length;i++)
        {
            if($scope.firethoughtmessagescount[i].$id==$scope.thoughtContainer[data]._id)
            {
                $scope.tempcomments=$scope.firethoughtmessagescount[i];
                break;
            }
            else
            {
                $scope.tempcomments="";
            }

        }
        //console.log($scope.thoughtContainer[data].messageData);

    }
    $scope.displaypositionprev=function()
    {
        var sample=$('div.active').index()-1;
        console.log("$('div.active').index()-1::"+sample);
        var currentIndex = $('div.active').index()-1<$scope.thoughtContainer.length ? (($('div.active').index()-1)!=-1 ? $('div.active').index()-1 : 5):0;
        //   alert($scope.thoughtContainer.length);
        //  alert("currentIndex::"+currentIndex);
        console.log("currentIndex::"+currentIndex);
        $scope.messageLikes=$scope.thoughtContainer[currentIndex].messageLikes;
        console.log($scope.thoughtContainer[currentIndex].messageData);
        var messageid=$scope.thoughtContainer[currentIndex]._id;

        console.log("$scope.thoughtContainer[currentIndex]._id:"+$scope.thoughtContainer[currentIndex]._id);

        for(var i=0;i<$scope.firethoughtmessagescount.length;i++)
        {
            console.log("$scope.firethoughtmessagescount[i].$id:"+$scope.firethoughtmessagescount[i].$id);
            if($scope.firethoughtmessagescount[i].$id==$scope.thoughtContainer[currentIndex]._id)
            {
                $scope.tempcomments=$scope.firethoughtmessagescount[i];
                break;
            }
            else
            {
                $scope.tempcomments="";
            }

        }

    }
    $scope.displaypositionnext=function()
    {
        var currentIndex = $('div.active').index()+1<$scope.thoughtContainer.length?$('div.active').index()+1 : 0;
        // alert($scope.thoughtContainer.length);
        //alert("currentIndex::"+currentIndex);
        $scope.messageLikes=$scope.thoughtContainer[currentIndex].messageLikes;
        console.log($scope.thoughtContainer[currentIndex].messageData);

        for(var i=0;i<$scope.firethoughtmessagescount.length;i++)
        {
            if($scope.firethoughtmessagescount[i].$id==$scope.thoughtContainer[currentIndex]._id)
            {
                $scope.tempcomments=$scope.firethoughtmessagescount[i];
                break;
            }
            else
            {
                $scope.tempcomments="";
            }

        }

    }

    $scope.displaythoughts=function()
    {

        $scope.thoughtContainer.forEach(
            function(value)
            {
                console.log(value.messageData);
            }

        )
    }

    $scope.display=function()
    {
        $http(
            {
                url: 'https://whatventwell.herokuapp.com/api/posts?message=I',
                method: "GET"
            }

        ).success(
            function(data,status,headers,config)
            {


                /* var obj={
                 thoughtObj : data
                 }*/
                $scope.thoughtContainer=data;

                console.log($scope.thoughtContainer.length);
                var sample=$('div.active').index()+1;
                $scope.messageLikes=$scope.thoughtContainer[sample].messageLikes;

                /* data.forEach(function(value)
                 {
                 console.log(value.messageData);
                 }
                 );*/
                //   console.log("success");


            }
        );
        ref = new Firebase("https://samplenodeapp.firebaseio.com/info/comments");
        $scope.firethoughtmessagescount=$firebaseArray(ref);
        $scope.firethoughtmessagescount.$loaded().then(function()
        {
            var sample=$('div.active').index();
            // console.log("commentsCount display initilization:"+$scope.firethoughtmessagescount.length);
            for(var i=0;i<$scope.firethoughtmessagescount.length;i++)
            {
                console.log("$scope.firethoughtmessagescount[i].$id:"+$scope.firethoughtmessagescount[i].$id);
                if($scope.firethoughtmessagescount[i].$id==$scope.thoughtContainer[sample]._id)
                {
                    $scope.tempcomments=$scope.firethoughtmessagescount[i];
                    break;
                }
                else
                {
                    $scope.tempcomments="";
                }

            }
            $scope.loading=true;
        })



    }







});

app.controller("newsController", function ($scope,$http,$timeout,$firebaseArray,MessageValues) {

    var ref ;
    $scope.firethoughtmessagescount;
    $scope.tempcomments;
    $scope.loading=false;

    function getCommentsRef()
    {
        return new Firebase("https://samplenodeapp.firebaseio.com/news/comments");
    }

    //$scope.firebasemessages = $firebaseArray(ref);
    $scope.messagetitle = MessageValues.newsData;
    $scope.thoughtContainer = "";
    $scope.messageLikes = "99";

    $scope.$watch('firethoughtmessagescount',function(){

    })
    $scope.addFireMessage = function() {
        var currentIndex = $('div.active').index();
        var messageidvalue=$scope.thoughtContainer[currentIndex]._id
        console.log($scope.firethoughtmessagescount.$indexFor(messageidvalue));

        console.log("name::"+$scope.name);
        if($scope.firethoughtmessagescount.$indexFor(messageidvalue)==-1)
        {
            var ref = new Firebase("https://samplenodeapp.firebaseio.com/news/comments/"+messageidvalue);
            $scope.firethoughtmessagescount = $firebaseArray(ref);
            $scope.firethoughtmessagescount.$add({from:$scope.name,body:$scope.msg});
            $scope.firethoughtmessagescount = $firebaseArray(getCommentsRef());

            $scope.name="";
            $scope.msg="";

        }
        else{
            var ref = new Firebase("https://samplenodeapp.firebaseio.com/news/comments/"+messageidvalue);
            $scope.firethoughtmessagescount = $firebaseArray(ref);
            $scope.firethoughtmessagescount.$add({from:$scope.name,body:$scope.msg});
            $scope.firethoughtmessagescount = $firebaseArray(getCommentsRef());
            $scope.name="";
            $scope.msg="";

        }



        //LISTEN FOR RETURN KEY
        /*var currentIndex = $('div.active').index();
         var messageidvalue=$scope.thoughtContainer[currentIndex]._id

         if (e.keyCode === 13 && $scope.msg) {
         //ALLOW CUSTOM OR ANONYMOUS USER NAMES
         var fireObj={
         messageId : messageidvalue,
         messageComments :{from:name,body:$scope.msg}
         };
         var name = $scope.name || "anonymous";
         $scope.firebasemessages.({from:name,body:$scope.msg,messagid:messageidvalue});
         //RESET MESSAGE
         $scope.msg = "";
         }*/
    }


    $scope.addLikes = function ()
    {
        var currentIndex = $('div.active').index();
        var messageid=$scope.thoughtContainer[currentIndex]._id
        console.log($scope.thoughtContainer[currentIndex]._id);
        console.log($scope.thoughtContainer[currentIndex].messageData);
        $http(
            {
                url: 'https://whatventwell.herokuapp.com/api/likes',
                method: "POST",
                data : {messageID :messageid }
            }

        ).success(
            function(data,status,headers,config)
            {
                for(var i=0;i<$scope.thoughtContainer.length;i++)
                {
                    if($scope.thoughtContainer[i]._id==data._id)
                    {
                        $scope.thoughtContainer[i].messageLikes=data.messageLikes;
                    }
                }
                $scope.messageLikes=data.messageLikes;
            }
        )

    }
    $scope.hiddenvalue;
    $scope.navigate =function(data)
    {
        // var sample=$('#hiddenvalue').val();
//console.log(data);
        $scope.messageLikes=$scope.thoughtContainer[data].messageLikes;

        for(var i=0;i<$scope.firethoughtmessagescount.length;i++)
        {
            if($scope.firethoughtmessagescount[i].$id==$scope.thoughtContainer[data]._id)
            {
                $scope.tempcomments=$scope.firethoughtmessagescount[i];
                break;
            }
            else
            {
                $scope.tempcomments="";
            }

        }
        //console.log($scope.thoughtContainer[data].messageData);

    }
    $scope.displaypositionprev=function()
    {
        var sample=$('div.active').index()-1;
        console.log("$('div.active').index()-1::"+sample);
        var currentIndex = $('div.active').index()-1<$scope.thoughtContainer.length ? (($('div.active').index()-1)!=-1 ? $('div.active').index()-1 : 5):0;
        //   alert($scope.thoughtContainer.length);
        //  alert("currentIndex::"+currentIndex);
        console.log("currentIndex::"+currentIndex);
        $scope.messageLikes=$scope.thoughtContainer[currentIndex].messageLikes;
        console.log($scope.thoughtContainer[currentIndex].messageData);
        var messageid=$scope.thoughtContainer[currentIndex]._id;

        console.log("$scope.thoughtContainer[currentIndex]._id:"+$scope.thoughtContainer[currentIndex]._id);

        for(var i=0;i<$scope.firethoughtmessagescount.length;i++)
        {
            console.log("$scope.firethoughtmessagescount[i].$id:"+$scope.firethoughtmessagescount[i].$id);
            if($scope.firethoughtmessagescount[i].$id==$scope.thoughtContainer[currentIndex]._id)
            {
                $scope.tempcomments=$scope.firethoughtmessagescount[i];
                break;
            }
            else
            {
                $scope.tempcomments="";
            }

        }

    }
    $scope.displaypositionnext=function()
    {
        var currentIndex = $('div.active').index()+1<$scope.thoughtContainer.length?$('div.active').index()+1 : 0;
        // alert($scope.thoughtContainer.length);
        //alert("currentIndex::"+currentIndex);
        $scope.messageLikes=$scope.thoughtContainer[currentIndex].messageLikes;
        console.log($scope.thoughtContainer[currentIndex].messageData);

        for(var i=0;i<$scope.firethoughtmessagescount.length;i++)
        {
            if($scope.firethoughtmessagescount[i].$id==$scope.thoughtContainer[currentIndex]._id)
            {
                $scope.tempcomments=$scope.firethoughtmessagescount[i];
                break;
            }
            else
            {
                $scope.tempcomments="";
            }

        }

    }

    $scope.displaythoughts=function()
    {

        $scope.thoughtContainer.forEach(
            function(value)
            {
                console.log(value.messageData);
            }

        )
    }

    $scope.display=function()
    {
        $http(
            {
                url: 'https://whatventwell.herokuapp.com/api/posts?message=N',
                method: "GET"
            }

        ).success(
            function(data,status,headers,config)
            {


                /* var obj={
                 thoughtObj : data
                 }*/
                $scope.thoughtContainer=data;

                console.log($scope.thoughtContainer.length);
                var sample=$('div.active').index()+1;
                $scope.messageLikes=$scope.thoughtContainer[sample].messageLikes;

                /* data.forEach(function(value)
                 {
                 console.log(value.messageData);
                 }
                 );*/
                //   console.log("success");


            }
        );
        ref = new Firebase("https://samplenodeapp.firebaseio.com/news/comments");
        $scope.firethoughtmessagescount=$firebaseArray(ref);
        $scope.firethoughtmessagescount.$loaded().then(function()
        {
            var sample=$('div.active').index();
            // console.log("commentsCount display initilization:"+$scope.firethoughtmessagescount.length);
            for(var i=0;i<$scope.firethoughtmessagescount.length;i++)
            {
                console.log("$scope.firethoughtmessagescount[i].$id:"+$scope.firethoughtmessagescount[i].$id);
                if($scope.firethoughtmessagescount[i].$id==$scope.thoughtContainer[sample]._id)
                {
                    $scope.tempcomments=$scope.firethoughtmessagescount[i];
                    break;
                }
                else
                {
                    $scope.tempcomments="";
                }

            }
            $scope.loading=true;
        })



    }

});



app.controller("funController", function ($scope,$http,$timeout,$firebaseArray,MessageValues) {
    $scope.messagetitle=MessageValues.funData;

    var ref ;
    $scope.firethoughtmessagescount;
    $scope.tempcomments;
    $scope.loading=false;

    $scope.imageurl="http://res.cloudinary.com/whatventwell-herokuapps-com/image/upload/h_270,w_800/";
    $scope.xsimageurl="http://res.cloudinary.com/whatventwell-herokuapps-com/image/upload/h_270,w_250/";
    function getCommentsRef()
    {
        return new Firebase("https://samplenodeapp.firebaseio.com/fun/comments");
    }

    //$scope.firebasemessages = $firebaseArray(ref);
    $scope.thoughtContainer = "";
    $scope.messageLikes = "99";

    $scope.$watch('firethoughtmessagescount',function(){

    })
    $scope.addFireMessage = function() {
        var currentIndex = $('div.active').index();
        var messageidvalue=$scope.thoughtContainer[currentIndex]._id
        console.log($scope.firethoughtmessagescount.$indexFor(messageidvalue));

        console.log("name::"+$scope.name);
        if($scope.firethoughtmessagescount.$indexFor(messageidvalue)==-1)
        {
            var ref = new Firebase("https://samplenodeapp.firebaseio.com/fun/comments/"+messageidvalue);
            $scope.firethoughtmessagescount = $firebaseArray(ref);
            $scope.firethoughtmessagescount.$add({from:$scope.name,body:$scope.msg});
            $scope.firethoughtmessagescount = $firebaseArray(getCommentsRef());

            $scope.name="";
            $scope.msg="";

        }
        else{
            var ref = new Firebase("https://samplenodeapp.firebaseio.com/fun/comments/"+messageidvalue);
            $scope.firethoughtmessagescount = $firebaseArray(ref);
            $scope.firethoughtmessagescount.$add({from:$scope.name,body:$scope.msg});
            $scope.firethoughtmessagescount = $firebaseArray(getCommentsRef());
            $scope.name="";
            $scope.msg="";

        }



        //LISTEN FOR RETURN KEY
        /*var currentIndex = $('div.active').index();
         var messageidvalue=$scope.thoughtContainer[currentIndex]._id

         if (e.keyCode === 13 && $scope.msg) {
         //ALLOW CUSTOM OR ANONYMOUS USER NAMES
         var fireObj={
         messageId : messageidvalue,
         messageComments :{from:name,body:$scope.msg}
         };
         var name = $scope.name || "anonymous";
         $scope.firebasemessages.({from:name,body:$scope.msg,messagid:messageidvalue});
         //RESET MESSAGE
         $scope.msg = "";
         }*/
    }


    $scope.addLikes = function ()
    {
        var currentIndex = $('div.active').index();
        var messageid=$scope.thoughtContainer[currentIndex]._id
        console.log($scope.thoughtContainer[currentIndex]._id);
        console.log($scope.thoughtContainer[currentIndex].messageData);
        $http(
            {
                url: 'https://whatventwell.herokuapp.com/api/likes',
                method: "POST",
                data : {messageID :messageid }
            }

        ).success(
            function(data,status,headers,config)
            {
                for(var i=0;i<$scope.thoughtContainer.length;i++)
                {
                    if($scope.thoughtContainer[i]._id==data._id)
                    {
                        $scope.thoughtContainer[i].messageLikes=data.messageLikes;
                    }
                }
                $scope.messageLikes=data.messageLikes;
            }
        )

    }
    $scope.hiddenvalue;
    $scope.navigate =function(data)
    {
        // var sample=$('#hiddenvalue').val();
//console.log(data);
        $scope.messageLikes=$scope.thoughtContainer[data].messageLikes;

        for(var i=0;i<$scope.firethoughtmessagescount.length;i++)
        {
            if($scope.firethoughtmessagescount[i].$id==$scope.thoughtContainer[data]._id)
            {
                $scope.tempcomments=$scope.firethoughtmessagescount[i];
                break;
            }
            else
            {
                $scope.tempcomments="";
            }

        }
        //console.log($scope.thoughtContainer[data].messageData);

    }
    $scope.displaypositionprev=function()
    {
        var sample=$('div.active').index()-1;
        console.log("$('div.active').index()-1::"+sample);
        var currentIndex = $('div.active').index()-1<$scope.thoughtContainer.length ? (($('div.active').index()-1)!=-1 ? $('div.active').index()-1 : 5):0;
        //   alert($scope.thoughtContainer.length);
        //  alert("currentIndex::"+currentIndex);
        console.log("currentIndex::"+currentIndex);
        $scope.messageLikes=$scope.thoughtContainer[currentIndex].messageLikes;
        console.log($scope.thoughtContainer[currentIndex].messageData);
        var messageid=$scope.thoughtContainer[currentIndex]._id;

        console.log("$scope.thoughtContainer[currentIndex]._id:"+$scope.thoughtContainer[currentIndex]._id);

        for(var i=0;i<$scope.firethoughtmessagescount.length;i++)
        {
            console.log("$scope.firethoughtmessagescount[i].$id:"+$scope.firethoughtmessagescount[i].$id);
            if($scope.firethoughtmessagescount[i].$id==$scope.thoughtContainer[currentIndex]._id)
            {
                $scope.tempcomments=$scope.firethoughtmessagescount[i];
                break;
            }
            else
            {
                $scope.tempcomments="";
            }

        }

    }
    $scope.displaypositionnext=function()
    {
        var currentIndex = $('div.active').index()+1<$scope.thoughtContainer.length?$('div.active').index()+1 : 0;
        // alert($scope.thoughtContainer.length);
        //alert("currentIndex::"+currentIndex);
        $scope.messageLikes=$scope.thoughtContainer[currentIndex].messageLikes;
        console.log($scope.thoughtContainer[currentIndex].messageData);

        for(var i=0;i<$scope.firethoughtmessagescount.length;i++)
        {
            if($scope.firethoughtmessagescount[i].$id==$scope.thoughtContainer[currentIndex]._id)
            {
                $scope.tempcomments=$scope.firethoughtmessagescount[i];
                break;
            }
            else
            {
                $scope.tempcomments="";
            }

        }

    }

    $scope.displaythoughts=function()
    {

        $scope.thoughtContainer.forEach(
            function(value)
            {
                console.log(value.messageData);
            }

        )
    }

    $scope.display=function()
    {
        $http(
            {
                url: 'https://whatventwell.herokuapp.com/api/posts?message=F',
                method: "GET"
            }

        ).success(
            function(data,status,headers,config)
            {


                /* var obj={
                 thoughtObj : data
                 }*/
                $scope.thoughtContainer=data;

                console.log($scope.thoughtContainer.length);
                var sample=$('div.active').index()+1;
                $scope.messageLikes=$scope.thoughtContainer[sample].messageLikes;

                /* data.forEach(function(value)
                 {
                 console.log(value.messageData);
                 }
                 );*/
                //   console.log("success");


            }
        );
        ref = new Firebase("https://samplenodeapp.firebaseio.com/fun/comments");
        $scope.firethoughtmessagescount=$firebaseArray(ref);
        $scope.firethoughtmessagescount.$loaded().then(function()
        {
            var sample=$('div.active').index();
            // console.log("commentsCount display initilization:"+$scope.firethoughtmessagescount.length);
            for(var i=0;i<$scope.firethoughtmessagescount.length;i++)
            {
                console.log("$scope.firethoughtmessagescount[i].$id:"+$scope.firethoughtmessagescount[i].$id);
                if($scope.firethoughtmessagescount[i].$id==$scope.thoughtContainer[sample]._id)
                {
                    $scope.tempcomments=$scope.firethoughtmessagescount[i];
                    break;
                }
                else
                {
                    $scope.tempcomments="";
                }

            }
            $scope.loading=true;
        })



    }


});

app.controller("messageController", function ($scope,$http,$timeout,$firebaseArray,MessageValues) {
    $scope.messagetitle=MessageValues.messageData;

    var ref ;
    $scope.firethoughtmessagescount;
    $scope.tempcomments;
    $scope.loading=false;

    function getCommentsRef()
    {
        return new Firebase("https://samplenodeapp.firebaseio.com/messages/comments");
    }

    //$scope.firebasemessages = $firebaseArray(ref);
    $scope.thoughtContainer = "";
    $scope.messageLikes = "99";

    $scope.$watch('firethoughtmessagescount',function(){

    })
    $scope.addFireMessage = function() {
        var currentIndex = $('div.active').index();
        var messageidvalue=$scope.thoughtContainer[currentIndex]._id
        console.log($scope.firethoughtmessagescount.$indexFor(messageidvalue));

        console.log("name::"+$scope.name);
        if($scope.firethoughtmessagescount.$indexFor(messageidvalue)==-1)
        {
            var ref = new Firebase("https://samplenodeapp.firebaseio.com/messages/comments/"+messageidvalue);
            $scope.firethoughtmessagescount = $firebaseArray(ref);
            $scope.firethoughtmessagescount.$add({from:$scope.name,body:$scope.msg});
            $scope.firethoughtmessagescount = $firebaseArray(getCommentsRef());

            $scope.name="";
            $scope.msg="";

        }
        else{
            var ref = new Firebase("https://samplenodeapp.firebaseio.com/messages/comments/"+messageidvalue);
            $scope.firethoughtmessagescount = $firebaseArray(ref);
            $scope.firethoughtmessagescount.$add({from:$scope.name,body:$scope.msg});
            $scope.firethoughtmessagescount = $firebaseArray(getCommentsRef());
            $scope.name="";
            $scope.msg="";

        }



        //LISTEN FOR RETURN KEY
        /*var currentIndex = $('div.active').index();
         var messageidvalue=$scope.thoughtContainer[currentIndex]._id

         if (e.keyCode === 13 && $scope.msg) {
         //ALLOW CUSTOM OR ANONYMOUS USER NAMES
         var fireObj={
         messageId : messageidvalue,
         messageComments :{from:name,body:$scope.msg}
         };
         var name = $scope.name || "anonymous";
         $scope.firebasemessages.({from:name,body:$scope.msg,messagid:messageidvalue});
         //RESET MESSAGE
         $scope.msg = "";
         }*/
    }


    $scope.addLikes = function ()
    {
        var currentIndex = $('div.active').index();
        var messageid=$scope.thoughtContainer[currentIndex]._id
        console.log($scope.thoughtContainer[currentIndex]._id);
        console.log($scope.thoughtContainer[currentIndex].messageData);
        $http(
            {
                url: 'https://whatventwell.herokuapp.com/api/likes',
                method: "POST",
                data : {messageID :messageid }
            }

        ).success(
            function(data,status,headers,config)
            {
                for(var i=0;i<$scope.thoughtContainer.length;i++)
                {
                    if($scope.thoughtContainer[i]._id==data._id)
                    {
                        $scope.thoughtContainer[i].messageLikes=data.messageLikes;
                    }
                }
                $scope.messageLikes=data.messageLikes;
            }
        )

    }
    $scope.hiddenvalue;
    $scope.navigate =function(data)
    {
        // var sample=$('#hiddenvalue').val();
//console.log(data);
        $scope.messageLikes=$scope.thoughtContainer[data].messageLikes;

        for(var i=0;i<$scope.firethoughtmessagescount.length;i++)
        {
            if($scope.firethoughtmessagescount[i].$id==$scope.thoughtContainer[data]._id)
            {
                $scope.tempcomments=$scope.firethoughtmessagescount[i];
                break;
            }
            else
            {
                $scope.tempcomments="";
            }

        }
        //console.log($scope.thoughtContainer[data].messageData);

    }
    $scope.displaypositionprev=function()
    {
        var sample=$('div.active').index()-1;
        console.log("$('div.active').index()-1::"+sample);
        var currentIndex = $('div.active').index()-1<$scope.thoughtContainer.length ? (($('div.active').index()-1)!=-1 ? $('div.active').index()-1 : 5):0;
        //   alert($scope.thoughtContainer.length);
        //  alert("currentIndex::"+currentIndex);
        console.log("currentIndex::"+currentIndex);
        $scope.messageLikes=$scope.thoughtContainer[currentIndex].messageLikes;
        console.log($scope.thoughtContainer[currentIndex].messageData);
        var messageid=$scope.thoughtContainer[currentIndex]._id;

        console.log("$scope.thoughtContainer[currentIndex]._id:"+$scope.thoughtContainer[currentIndex]._id);

        for(var i=0;i<$scope.firethoughtmessagescount.length;i++)
        {
            console.log("$scope.firethoughtmessagescount[i].$id:"+$scope.firethoughtmessagescount[i].$id);
            if($scope.firethoughtmessagescount[i].$id==$scope.thoughtContainer[currentIndex]._id)
            {
                $scope.tempcomments=$scope.firethoughtmessagescount[i];
                break;
            }
            else
            {
                $scope.tempcomments="";
            }

        }

    }
    $scope.displaypositionnext=function()
    {
        var currentIndex = $('div.active').index()+1<$scope.thoughtContainer.length?$('div.active').index()+1 : 0;
        // alert($scope.thoughtContainer.length);
        //alert("currentIndex::"+currentIndex);
        $scope.messageLikes=$scope.thoughtContainer[currentIndex].messageLikes;
        console.log($scope.thoughtContainer[currentIndex].messageData);

        for(var i=0;i<$scope.firethoughtmessagescount.length;i++)
        {
            if($scope.firethoughtmessagescount[i].$id==$scope.thoughtContainer[currentIndex]._id)
            {
                $scope.tempcomments=$scope.firethoughtmessagescount[i];
                break;
            }
            else
            {
                $scope.tempcomments="";
            }

        }

    }

    $scope.displaythoughts=function()
    {

        $scope.thoughtContainer.forEach(
            function(value)
            {
                console.log(value.messageData);
            }

        )
    }

    $scope.display=function()
    {
        $http(
            {
                url: 'https://whatventwell.herokuapp.com/api/posts?message=M',
                method: "GET"
            }

        ).success(
            function(data,status,headers,config)
            {


                /* var obj={
                 thoughtObj : data
                 }*/
                $scope.thoughtContainer=data;

                console.log($scope.thoughtContainer.length);
                var sample=$('div.active').index()+1;
                $scope.messageLikes=$scope.thoughtContainer[sample].messageLikes;

                /* data.forEach(function(value)
                 {
                 console.log(value.messageData);
                 }
                 );*/
                //   console.log("success");


            }
        );
        ref = new Firebase("https://samplenodeapp.firebaseio.com/messages/comments");
        $scope.firethoughtmessagescount=$firebaseArray(ref);
        $scope.firethoughtmessagescount.$loaded().then(function()
        {
            var sample=$('div.active').index();
            // console.log("commentsCount display initilization:"+$scope.firethoughtmessagescount.length);
            for(var i=0;i<$scope.firethoughtmessagescount.length;i++)
            {
                console.log("$scope.firethoughtmessagescount[i].$id:"+$scope.firethoughtmessagescount[i].$id);
                if($scope.firethoughtmessagescount[i].$id==$scope.thoughtContainer[sample]._id)
                {
                    $scope.tempcomments=$scope.firethoughtmessagescount[i];
                    break;
                }
                else
                {
                    $scope.tempcomments="";
                }

            }
            $scope.loading=true;
        })



    }




});


app.controller("adminController", function ($rootScope,$http,$scope,MessageValues) {
    $scope.messagetitle=MessageValues.adminData;
    $scope.adminHideValue=false;
    $scope.optionselected="";
    $scope.messageType="";
    $scope.messageData="";
    $scope.messageDate="";
    $scope.btndisablevalue=false;
    $scope.uploadbtndisablevalue=true;
    $scope.messageContainer=[];
    $scope.valueCount=3;
    $scope.datafound=false;
    $scope.typefound=false;
    $scope.datefound=false;
    $scope.alreadyAdded=false;
    $scope.cloudinary=false;


    $scope.addtocloudinary= function() {

        var pathvalue;
        cloudinary.openUploadWidget({ cloud_name: 'whatventwell-herokuapps-com', upload_preset: 'czb51ylp'},
            function(error, result) {

                $scope.$apply(
                    function()
                    {

                        console.log("path ::"+result[0].path);
                        pathvalue=result[0].path;
                        pathvalue=pathvalue.substring(pathvalue.indexOf("/")+1);
                        console.log("path value::"+pathvalue);
                        $scope.messageData=pathvalue;

                        console.log("public id::"+result[0].public_id);
                        console.log(result);
                    }

                )

            });
    };
    
    $scope.deleteMessage=function(data)
    {

    //console.log("Value::"+$scope.messageContainer[data].messageType);
var removedData=false;
        var scopeValue;
        if($scope.messageContainer[data].messageType==$scope.optionselected)
        {
            $scope.alreadyAdded=false;
            scopeValue=$scope.optionselected;
            removedData=true;
        }
       $scope.messageContainer.splice(data,1);
        if($scope.messageContainer.length<5)
        {
            $scope.uploadbtndisablevalue=true;
        }
        if(removedData)
        {
            $scope.optionselected="";
        }
      /* var arrayObj=$scope.messageContainer;
       arrayObj.forEach(function(value)
       {
           console.log(value.messageType);
       })*/

    }
    $scope.showData=function()
    {
         $scope.messageContainer.forEach(
        function(value)
        {
            console.log(value.messageType);
        }
         )

    }
    $scope.addDataToMongo=function()
    {

        $http({
            url: 'https://whatventwell.herokuapp.com/api/posts',
            method: "POST",
            data:{myval: $scope.messageContainer}

        }).success(
            function(data,status,headers,config)
            {
                console.log("data:"+data);
                console.log("status:"+status);
                console.log("headers:"+headers);
                console.log("config:"+config);
                $scope.messageContainer.splice(0,5);
                $scope.uploadbtndisablevalue=true;
            }

        ).error(
            function(data,status,headers,config)
            {
                console.log("data:"+data);
                console.log("data:"+status);
                console.log("data:"+headers);
                console.log("data:"+config);
            }

        )
        console.log("Data insertion successfull");
       //
        console.log("Data insertion successfull");

    }

    $scope.addMessage=function()
    {

        if($scope.optionselected=='F')
        {
            $scope.messageData= "METAIMG$" + $scope.messageData;
        }

        var messageObj={
            messageType:$scope.optionselected,
            messageData:$scope.messageData,
            messageDate:$scope.messageDate
        };
        console.log("Type::"+$scope.optionselected);
        console.log("Data::"+$scope.messageData);
        console.log("Date::"+$scope.messageDate);
        console.log("Obj::"+messageObj.messageDate);

        var val= $scope.messageData;
        console.log("Data image::"+val.substr(0,8));
        console.log("Data image::"+val.substr(8));
        $scope.messageContainer.push(messageObj);
        $scope.optionselected="";
        $scope.messageData="";
        $scope.messageDate="";
       // $scope.btndisablevalue=true;
        if($scope.messageContainer.length==5)
        {
            $scope.uploadbtndisablevalue=false;
        }

    }

    $scope.$watch('optionselected',function(newvalue,oldvalue)
    {
        console.log("optionselected");
        var arrayObj=$scope.messageContainer;
        var added=false;

        if(newvalue=='F')
        {
            $scope.cloudinary=true;
        }
        else
        {
            $scope.cloudinary=false;
        }

        for(var i=0;i<arrayObj.length;i++ )
        {
            //console.log(arrayObj[0].messageType);
            if(arrayObj[i].messageType==newvalue)
            {
               // console.log("inside value count.... 1::"+value.messageType);
                added=true;
                break;
                //  return false;
            }
            else
            {
                //console.log("inside value count.... else::"+value.messageType);
                added=false;
            }

        }
        /*arrayObj.forEach(function(value)
        {

        })*/

        //console.log("added:"+added);
        //console.log("!added:"+!added);

        if(newvalue!='' & !added)
        {
            console.log("inside value count 2");
            $scope.alreadyAdded=false;
            $scope.typefound=true;
            //$scope.valueCount++;
            console.log("valueCount messagetype::"+$scope.valueCount);

            //& $scope.messageData=='' & $scope.messageDate==''
        }
        else if(newvalue!='' & added)
        {
            console.log("inside value count 3   ");
            $scope.alreadyAdded=true;

        }
        else
        {
            console.log("inside value count 4");
          //  $scope.valueCount--;
            $scope.typefound=false;
        }



       // console.log("optionselected oldvalue::"+oldvalue);
        //console.log("optionselected newvalue::"+newvalue);


    });


    $scope.$watch('messageData',function(newvalue,oldvalue)
    {
        //  console.log("messageDate oldvalue::"+oldvalue);
        //console.log("messageDate newvalue::"+newvalue);
        if(newvalue!='')
        {
            console.log("valueCount data before::"+$scope.valueCount);
            $scope.datafound=true;
            console.log("valueCount data after::"+$scope.valueCount);
        }
        else
        {
            $scope.datafound=false;
        }

    });


    $scope.$watch('messageDate',function(newvalue,oldvalue)
    {
      //  console.log("messageDate oldvalue::"+oldvalue);
        //console.log("messageDate newvalue::"+newvalue);
        if(newvalue!='')
        {

            $scope.datefound=true;
            console.log("valueCount date::"+$scope.valueCount);
        }
        else
        {
            $scope.datefound=false;
        }

    });

    $scope.$watch('datafound',function(newvalue,oldvalue)
    {
        //  console.log("messageDate oldvalue::"+oldvalue);
        //console.log("messageDate newvalue::"+newvalue);
        if(newvalue)
        {
            console.log("valueCount datafound before::"+$scope.valueCount);
            $scope.valueCount++;
            console.log("valueCount datafound after::"+$scope.valueCount);

        }
        else
        {
            $scope.valueCount--;
        }

    });

    $scope.$watch('typefound',function(newvalue,oldvalue)
    {
        //  console.log("messageDate oldvalue::"+oldvalue);
        //console.log("messageDate newvalue::"+newvalue);
        if(newvalue)
        {
            console.log("valueCount datafound before::"+$scope.valueCount);
            $scope.valueCount++;
            console.log("valueCount datafound after::"+$scope.valueCount);

        }
        else
        {
            $scope.valueCount--;
        }

    });


    $scope.$watch('datefound',function(newvalue,oldvalue)
    {
        //  console.log("messageDate oldvalue::"+oldvalue);
        //console.log("messageDate newvalue::"+newvalue);
        if(newvalue)
        {
            console.log("valueCount datafound before::"+$scope.valueCount);
            $scope.valueCount++;
            console.log("valueCount datafound after::"+$scope.valueCount);

        }
        else
        {
            $scope.valueCount--;
        }

    });







    $scope.$watch('valueCount',function(newvalue,oldvalue)
    {
        if(newvalue==3)
        {
            $scope.btndisablevalue=false;
        }
        else{
            $scope.btndisablevalue=true;
        }
    })
    $rootScope.$watch('hideValue',function(oldvalue,newvalue)
    {

    $scope.adminHideValue=!oldvalue;
        /*console.log("oldvalue::" + oldvalue);
        console.log("newvalue::" + newvalue);
        console.log("inside admin controller::" + $scope.adminHideValue);*/
    });
});
