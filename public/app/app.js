angular.module('advAnalytics',['appRoutes','loginCtrl','authService','jcs-autoValidate','angular-ladda','homeCtrl','eventCtrl','eventDemoCtrl','insightCtrl','profileCtrl'])
.config(['$httpProvider',function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
 }]);