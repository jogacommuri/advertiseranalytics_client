angular.module('analyticsCtrl',[])
    .controller('analyticsCtrl',function($scope,$http,$window,$location){
    var vm = this;
    vm.title = "Analytics";
    vm.token={};
    vm.fname=null;
    vm.getCategories=function(token){
       vm.token.token =$window.localStorage.getItem('accessToken');
        console.log(vm.token.token);
        $http.post("http://advanalytics.herokuapp.com/users/getUser",vm.token)
            .success(function(data){
                $scope.interests=data.data.interests;
                $window.localStorage.setItem('user',JSON.stringify(data.data));
                vm.fname=data.data.fname;
                vm.userDetails = JSON.parse($window.localStorage.getItem('user'));
            })
            .error(function(data) {
				console.log('Error: ' + data);
			});
    };               
});