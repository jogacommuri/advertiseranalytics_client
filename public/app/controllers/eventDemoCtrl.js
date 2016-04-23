angular.module('eventDemoCtrl',[])
    .controller('eventDemoCtrl',function($scope,$window){
    var vm =  this;
    $scope.userDetails = JSON.parse($window.localStorage.getItem('user'));
    $scope.trendings = JSON.parse($window.localStorage.getItem('Interests'));
    vm.profileData = {};
    vm.profileData =  $scope.userDetails;
    vm.categories = ['18-24', '25-34', '35-44', '45-54',
            '55-64', '65+'];

    vm.locations = ['CA', 'AZ', 'WI','CO','NY','FL'];

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
                data: [-10.2, -2.2, -2.3, -2.5, -2.7, -3.1]
            }, {
                name: 'Female',
                data: [2.1, 2.0, 2.2, 2.4, 2.6, 3.0]
            }]
        });


     Highcharts.chart('container_cross', {

            chart: {
                
                type: 'pie'
            },
            credits: {
            		enabled: false
            },
            title: {
                text: 'Geographics'
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


      Highcharts.chart({
        chart: {
        	renderTo: 'container_location',
            type: 'column',
            options3d: {
                enabled: true,
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
                depth: 25
            }
        },
        xAxis: {
            categories: vm.locations
        },
        yAxis: {
            title: {
                text: null
            }
        },
        series: [{
            name: 'States',
            data: [2, 3, null, 4, 0, 5]
        }]
    });
    });
    


    
