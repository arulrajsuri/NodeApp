var app=angular.module("myapp",["ngRoute"]);

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
        $routeProvider.when('/about',{
            templateUrl: 'about.html',
            controller: 'appController'
            }
                         )
            .when('/contact',{
                templateUrl: 'contact.html',
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
            .when('/message',{
                templateUrl: 'message.html',
                controller: 'messageController'
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

app.directive('display',function()
{
    var directive={};
    directive.restrict ='E';
    directive.scope={};
    directive.templateUrl="directiveTemplate.html";
    directive.replace=true;
    directive.link=function(scope,element,attrs)
    {

         scope.display= $("#datepicker").datepicker();
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
        //console.log("jumbo invisible");
    }
    else
    {
        $rootScope.hideValue=false;
        //console.log("jumbo visible");
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


app.controller("thoughtController", function ($scope,MessageValues) {
$scope.messagetitle=MessageValues.thoughtData;
});

app.controller("infoController", function ($scope,MessageValues) {
    $scope.messagetitle=MessageValues.infoData;
});

app.controller("funController", function ($scope,MessageValues) {
    $scope.messagetitle=MessageValues.funData;
});

app.controller("messageController", function ($scope,MessageValues) {
    $scope.messagetitle=MessageValues.messageData;
});


app.controller("adminController", function ($rootScope,$scope,MessageValues) {
    $scope.messagetitle=MessageValues.adminData;
    $scope.adminHideValue=false;
    $rootScope.$watch('hideValue',function(oldvalue,newvalue)
    {

    $scope.adminHideValue=!oldvalue;
        /*console.log("oldvalue::" + oldvalue);
        console.log("newvalue::" + newvalue);
        console.log("inside admin controller::" + $scope.adminHideValue);*/
    });
});
