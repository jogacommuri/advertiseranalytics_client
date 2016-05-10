angular.module('appRoutes', ['ngRoute'])
	.config(function($routeProvider, $locationProvider){
		$routeProvider
            .when('/home',{
				templateUrl: 'app/views/pages/home.html',
				controller: 'homeCtrl',
                controllerAs: 'home'
			})
			.when('/analytics',{
				templateUrl: 'app/views/pages/analytics.html',
				controller: 'analyticsCtrl',
                controllerAs: 'analy'
			})
			.when('/events',{
				templateUrl: 'app/views/pages/event.html',
				controller: 'eventsCtrl'
			})
			.when('/',{
				templateUrl: 'app/views/pages/login.html',
                controller: 'loginCtrl',
				controllerAs: 'login'
			})
            .when('/signup',{
				templateUrl:'app/views/pages/signup.html',
                controller: 'loginCtrl',
				controllerAs: 'signup'
			})
			.when('/events',{
				templateUrl:'app/views/pages/events.html',
                controller: 'eventCtrl',
				controllerAs: 'event'
			})
            .when('/eventDashboard',{
				templateUrl:'app/views/pages/eventdashboard.html',
            controller: 'eventCtrl',
				controllerAs: 'event'
			})
            .when('/eventDemographics',{
                templateUrl:'app/views/pages/eventDemographics.html',
            controller: 'eventDemoCtrl',
				controllerAs: 'eventDemo'
            })
            .when('/Insights',{
				templateUrl:'app/views/pages/Insights.html',
                controller: 'insightCtrl',
				controllerAs: 'insight'
			})
            .when('/profile',{
				templateUrl:'app/views/pages/profile.html',
                controller: 'profileCtrl',
				controllerAs: 'profile'
			})
			

			$locationProvider.html5Mode(true);
	});