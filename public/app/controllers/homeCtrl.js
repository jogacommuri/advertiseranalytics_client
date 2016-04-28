angular.module('homeCtrl',['angularUtils.directives.dirPagination'])
    .controller('homeCtrl',function($scope,$http,$window,$location){
    var vm =  this;
    $scope.token= $window.localStorage.getItem('accessToken');
     
    
    vm.title = "home";
    vm.events=null;
    $scope.sweetalert=false;
     vm.token = {};
    
    vm.getCategories=function(token){
       vm.token.token =$window.localStorage.getItem('accessToken');
        console.log(vm.token.token);
        $http.post("http://advanalytics.herokuapp.com/users/getUser",vm.token)
            .success(function(data){
                $scope.interests=data.data.interests;
                $window.localStorage.setItem('user',JSON.stringify(data.data));
                $scope.fname=data.data.fname;
                vm.userDetails = JSON.parse($window.localStorage.getItem('user'));
            
            })
            .error(function(data) {
				console.log('Error: ' + data);
			});
        $http.post("http://advanalytics.herokuapp.com/getCategories")
            .success(function(data){
            $scope.trendings = data.events;

            console.log($scope.trendings);
            $window.localStorage.setItem('Interests',JSON.stringify($scope.trendings));
        })
        .error(function(error) {
				console.log('Error: ' + error);
			});
    
    };
});