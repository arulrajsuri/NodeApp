var app=angular.module("myapp",["ngRoute"]);

app.value('MessageValues',{
    thoughtData : "Thought for the Day",
    infoData : "Info for the Day",
    funData : "Fun for the Day",
    messageData : "Message for the Day",
    newsData : "News for the Day"
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