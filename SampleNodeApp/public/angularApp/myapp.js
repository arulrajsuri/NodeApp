var app=angular.module("myapp",["ngRoute"]);

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


app.controller("thoughtController", function ($scope) {
$scope.messagetitle='Thought for the Day';
});

app.controller("infoController", function ($scope) {
    $scope.messagetitle='Info for the Day';
});

app.controller("funController", function ($scope) {
    $scope.messagetitle='Fun for the Day';
});

app.controller("messageController", function ($scope) {
    $scope.messagetitle='Message for the Day';
});