angular.module('profileCtrl',[])
    .controller('profileCtrl',function($scope,$location,$window,$http){
    var vm =  this;
    
    vm.title = "profile";
     $scope.userDetails = JSON.parse($window.localStorage.getItem('user'));
    
    $scope.interests=JSON.parse($window.localStorage.getItem('Interests'));
    
    //console.log($scope.interests[1]);
		$scope.selection=[];
        $scope.selection = $scope.userDetails.interests;
        console.log($scope.selection[0].category_name);
		// toggle selection for a given employee by name
		$scope.toggleSelection = function toggleSelection(interestName) {
	    var idx = $scope.selection.indexOf(interestName);

	    // is currently selected
	    if (idx > -1) {
	      $scope.selection.splice(idx, 1);
	    }

	    // is newly selected
	    else {
	      $scope.selection.push(interestName);
	    }
	  };
   
    vm.profileData = {};
    vm.profileData =  $scope.userDetails;
    vm.profileData.interests = $scope.selection;
    
    console.log(vm.profileData);

     /*$http.post('http://advanalytics.herokuapp.com/users/login',vm.profileData)*/
    vm.updateProfile= function(profileData){
        console.log(vm.profileData);
        $http.post('http://advanalytics.herokuapp.com/users/updateProfile',vm.profileData)
            .success(function(data){
            console.log("post sucess");
            console.log(data);
        })
        .error(function(data) {
				console.log('Error: ' + data);
			});
        $location.path('/home');
    }
    
});