angular.module('authService',[])

	.factory('Auth',function($http, $q, AuthToken){

		var authFactory = {};

		/*authFactory.login = function(username,password){

			 return $http.post('/api/login',{
			 	username: username,
			 	password: password
			 })
			 .success(function(data){
			 	AuthToken.setToken(data.token);
			 	console.log(data.token);
			 	return data;
			 });
		}

		authFactory.logout = function(){
			AuthToken.setToken();
		}

		authFactory.isLoggedIn = function(){
			if(AuthToken.getToken()){
				return true;
			} else {	
				return false;
			}
		}*/

		authFactory.getUser = function(token){
            if(AuthToken.getToken()){
				return $http.get('/api/me');
			}else{
				return $q.reject({message:"User has not token"});
			}
			if(AuthToken.getToken()){
                console.log(token);
				$http.post("http://advanalytics.herokuapp.com/users/getUser",token)
                    .success(function(data){
                                console.log(data);
                             })
            .error(function(data) {
				console.log('Error: ' + data);
			});
			}else{
				return $q.reject({message:"User has not token"});
			}
		}	

		return authFactory;
	})
    .factory('AuthToken',function($window){

		var authTokenFactory = {};

		authTokenFactory.getToken = function(){
			return $window.localStorage.getItem('token');

		}

		authTokenFactory.setToken = function(token){
			if(token){
				$window.localStorage.setItem('token', token);
			} else {
				$window.localStorage.removeItem('token');
			}
		}
		return authTokenFactory;
	})

	;