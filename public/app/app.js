angular.module('advAnalytics',['appRoutes','loginCtrl','homeCtrl','authService','jcs-autoValidate','angular-ladda','eventsCtrl','eventCtrl','eventDemoCtrl','insightCtrl','profileCtrl','analyticsCtrl'])
.config(['$httpProvider',function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
 }]);