angular.module('loginCtrl',['userService'])
    .controller('loginCtrl',function($location,$http){
    var login =  this;
    
    login.title = "login";
     login.signinUser=function(signinData){
         console.log(login.signinData);
         
         $http.post('http://advanalytics.herokuapp.com/users/login')
            .success(function(data){
             console.log("login post success");
             console.log("token: "+data);
            })
            .error(function(data) {
				console.log('Error: ' + data);
			});
//         $location.path('/home');
     };
     
    var vm =  this;
    vm.title ="signup";
    vm.signupUser = function(userData){
        console.log("signup");
        console.log(vm.userData);
       $http.post('http://advanalytics.herokuapp.com/users/signup')
            .success(function(data){
             console.log("signup post success");
             
            })
            .error(function(data) {
				console.log('Error: ' + data);
			});
        // $location.path('/home');	
    };
    
});