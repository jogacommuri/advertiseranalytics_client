angular.module('eventDemoCtrl',[])
    .controller('eventDemoCtrl',function($scope,$window,$http){
    var vm =  this;
    $scope.userDetails = JSON.parse($window.localStorage.getItem('user'));
    $scope.trendings = JSON.parse($window.localStorage.getItem('Interests'));
    vm.profileData = {};
    vm.profileData =  $scope.userDetails;
    
    vm.eventName ={};
    vm.maleData = [];
    vm.femaleData = [];
    vm.locations = [];
    vm.eventCount = [];
    //event get
        vm.getCategory =  function(){
            console.log("getcat");
            console.log(vm.eventName);
            vm.postData = {};
            vm.postData.category_id = vm.eventName.category_id;
            $http.post('http://advanalytics.herokuapp.com/demographics_age', vm.postData)
            .success(function(data){
                console.log("post sucess");
                //console.log(data.male);
                for(var key in data.male){
                    vm.maleData.push(-data.male[key]);
                }
               
            
                for(var key in data.female){
                    vm.femaleData.push(data.female[key]);
                }
                //console.log(vm.femaleData);
                 //event.data = data.results;
               /* console.log(event.data);*/
                //event.displayMap(event.data);
                vm.displayAgeChart(vm.maleData, vm.femaleData);
            })
            .error(function(data) {
                    console.log('Error: ' + data);
                });
            
            
            vm.categoryDetails = {};
            vm.categoryDetails.category = vm.eventName.category_id;
             $http.post('http://advanalytics.herokuapp.com/getEventCountsByCategory', vm.categoryDetails)
            .success(function(data){
                console.log("post sucess");
                console.log(data.eventCounts);
                for(var i=0; i< data.eventCounts.length;i++){
                    //console.log(data.eventCounts[i].region_name.substring(0,2).toUpperCase());
                    vm.locations.push(data.eventCounts[i].region_abbr);
                    vm.eventCount.push(data.eventCounts[i].noOfEvents);
                }
                console.log(vm.locations);
                 console.log(vm.eventCount);
                vm.displayLocationChart(vm.locations, vm.eventCount);
                 vm.budget(vm.locations, vm.eventCount);
            })
            .error(function(data) {
                    console.log('Error: ' + data);
                });
            
        }
    vm.categories = ['18-24', '25-34', '35-44', '45-54',
            '55-64', '65+'];
    
   


    
    vm.displayAgeChart = function(maleData, femaleData){
        
         Highcharts.chart('container_age', {

    	chart: {
    		    type: 'bar'
            },
            title: {
                text: 'Campaign Female vs Male'
            },
           
            xAxis: [{
                categories: vm.categories,
                reversed: false,
                labels: {
                    step: 1
                }
            }, { // mirror axis on right side
                opposite: true,
                reversed: false,
                categories: vm.categories,
                linkedTo: 0,
                labels: {
                    step: 1
                }
            }],
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    formatter: function () {
                        return Math.abs(this.value) + '%';
                    }
                }
            },

            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },

            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
                        'Population: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
                }
            },

            series: [{
                name: 'Male',
                data: maleData
            }, {
                name: 'Female',
                data: femaleData
            }]
        });
        
    }

   
    vm.displayLocationChart = function(locations, count){
        
        
      Highcharts.chart({
        chart: {
        	renderTo: 'container_location',
            type: 'column',
            options3d: {
                enabled: false,
                alpha: 10,
                beta: 25,
                depth: 70
            }
        },
        title: {
            text: 'Events in Locations'
        },
       
        plotOptions: {
            column: {
                depth: 50
            }
        },
        xAxis: {
            categories: locations
        },
        yAxis: {
            title: {
                text: null
            }
        },
        series: [{
            name: 'States',
            data: count
        }]
    });
        
    }
     vm.budget = function(locations, count){
        
        
      Highcharts.chart('container_budget',{
         chart: {
            polar: true,
            type: 'line'
        },

        title: {
            text: 'Budget',
            x: -80
        },

        pane: {
            size: '80%'
        },

        xAxis: {
            categories: locations,
            tickmarkPlacement: 'on',
            lineWidth: 0
        },

        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
        },

        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
        },

        legend: {
            align: 'right',
            verticalAlign: 'top',
            y: 70,
            layout: 'vertical'
        },

        series: [{
            name: 'Allocated Budget',
            data: [43000, 19000, 60000, 35000, 17000, 10000],
            pointPlacement: 'on'
        }]
    });
        
}

     Highcharts.chart('container_cross', {

            chart: {
                
                type: 'pie'
            },
            credits: {
            		enabled: false
            },
            title: {
                text: 'Cross Device'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Location',
                colorByPoint: true,
                data: [{
                    name: 'Desktop',
                    y: 56.33
                }, {
                    name: 'Mobile',
                    y: 24.03,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Tablet',
                    y: 10.38
                }, {
                    name: 'Others',
                    y: 4.77
                }]
            }]
				});


    });
    


    
