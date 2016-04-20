angular.module('advAnalytics',['appRoutes','loginCtrl','authService','homeCtrl','eventCtrl','profileCtrl'])
.config(['$httpProvider',function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
 }]);