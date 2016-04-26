angular.module('loginCtrl',['userService'])
    .controller('loginCtrl',function($location,$http,$window,$scope){
    var vm =  this;
    
    vm.title = "login";
    vm.signinData = {};
    $scope.submitted = false;
    $scope.has_error = false;
    $scope.submitting = false;
    
     vm.signinUser=function(signinData){
         console.log(vm.signinData);
         
         $http.post('http://advanalytics.herokuapp.com/users/login',vm.signinData)
            .success(function(data){
             console.log("login post success");
             console.log(data);
             alert(data.msg);
              $window.localStorage.setItem('accessToken', data.accessToken);
             $location.path('/home');
            })
            .error(function(data) {
				console.log('Error: ' + data);
			});
//         $location.path('/home');
     };
     
    var vm =  this;
    vm.title ="signup";
    vm.signupUser = function(userData){
        $scope.submitting = true;
        console.log("signup");
        console.log(vm.userData);
       $http.post('http://advanalytics.herokuapp.com/users/signup',vm.userData)
            .success(function(data){
             console.log("signup post success");
             console.log(data);
             $scope.submitted = false;
             $scope.has_error = false;
             $scope.submitting = false;
             alert("Sucessfully register please login");
             $location.path('/');
            })
            .error(function(data) {
				console.log('Error: ' + data);
                $scope.has_error = true;
                $scope.submitted = false;
                $scope.submitting = false;
			});
        // $location.path('/home');	
    };
    
});