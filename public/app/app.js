angular.module('advAnalytics',['appRoutes','loginCtrl','authService','homeCtrl','eventCtrl','profileCtrl'])
.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });