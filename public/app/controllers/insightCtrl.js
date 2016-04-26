angular.module('insightCtrl',[])
    .controller('insightCtrl',function($scope,$http,$window){
    var vm =  this;
    $scope.token= $window.localStorage.getItem('accessToken');
     vm.userDetails = JSON.parse($window.localStorage.getItem('user'));
    
    $scope.trendings = JSON.parse($window.localStorage.getItem('Interests'));
    vm.profileData = {};
    vm.profileData =  $scope.userDetails;
    
    vm.eventName ={};
    vm.maleData = [];
    vm.femaleData = [];
    vm.locations = [];
    vm.eventCount = [];
    vm.loading=false;
    vm.getCategory =  function(){
            vm.loading=true;
            console.log("getcat");
            console.log(vm.eventName);
            vm.postData = {};
            vm.postData.category_id = vm.eventName.category_id;
            $http.post('http://advanalytics.herokuapp.com/demographics_age', vm.postData)
            .success(function(data){
                console.log("post sucess");
                //console.log(data.male);
                vm.maleData=[];
                while (vm.maleData.length > 0) {
                        vm.maleData.pop();
                    }
                vm.femaleData=[];
                 while (vm.femaleData.length > 0) {
                        vm.femaleData.pop();
                    }
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
                vm.loading=false;
            })
            .error(function(data) {
                    console.log('Error: ' + data);
                });
    }
    //impressions
    Highcharts.chart('container_impressions', {
        rangeSelector: {
                selected: 4
            },
           chart: {
            type: 'spline'
        },
        title: {
            text: 'Metrics'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            labels: {
                overflow: 'justify'
            },top: '0%'
        },
        yAxis: [{
            labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'Impressions'
                },
                height: '50%',
                lineWidth: 2
            }, {
                labels: {
                    align: 'right',
                    x: -2
                },
                title: {
                    text: 'Advertiser Spending'
                },
                top: '65%',
                height: '50%',
                offset: 0,
                lineWidth: 2
            }],
        tooltip: {
            valueSuffix: ' M'
        },
        plotOptions: {
            spline: {
                lineWidth: 4,
                states: {
                    hover: {
                        lineWidth: 5
                    }
                },
                marker: {
                    enabled: false
                },
                pointInterval: 3600000, // one hour
                pointStart: Date.UTC(2015, 4, 31, 0, 0, 0)
            }
        },
        series: /*[{
            name: 'Impression',
            data: [1, 1.3, 1.5, 2.9, 1.9, 2.6, 1.6, 3, 4, 3.6, 4.5, 4.2, 4.5, 4.5, 4, 3.1, 2.7, 4, 2.7, 2.3, 2.3, 4.1, 7.7, 7.1, 5.6, 6.1, 5.8, 8.6, 7.2, 9, 10.9, 11.5, 11.6, 11.1, 12, 12.3, 10.7, 9.4, 9.8, 9.6, 9.8, 9.5, 8.5, 7.4, 7.6,115]

        },{
            name: 'CTC',
            data: [1, 1.3, 1.5, 2.9, 1.9, 2.6, 1.6, 3, 4, 3.6, 4.5, 4.2, 4.5, 4.5, 4, 3.1, 2.7, 4, 2.7, 2.3, 2.3, 4.1, 7.7, 7.1, 5.6, 6.1, 5.8, 8.6, 7.2, 9, 10.9, 11.5, 11.6, 11.1, 12, 12.3, 10.7, 9.4, 9.8, 9.6, 9.8, 9.5, 8.5, 7.4, 7.6,115]

        }]*/ [{
                type: 'spline',
                name: 'Impressions',
                data: [1, 1.3, 1.5, 2.9, 1.9, 2.6, 1.6, 3, 4, 3.6, 4.5, 4.2, 4.5, 4.5, 4, 3.1, 2.7, 4, 2.7, 2.3, 2.3, 4.1, 7.7, 7.1, 5.6, 6.1, 5.8, 8.6, 7.2, 9, 10.9, 11.5, 11.6, 11.1, 12, 12.3, 10.7, 9.4, 9.8, 9.6, 9.8, 9.5, 8.5, 7.4, 7.6,115],
                
            }, {
                type: 'spline',
                name: 'Advertiser Spending',
                data: [1, 1.3, 1.5, 2.9, 1.9, 2.6, 1.6, 3, 4, 3.6, 4.5, 4.2, 4.5, 4.5, 4, 3.1, 2.7, 4, 2.7, 2.3, 2.3, 4.1, 7.7, 7.1, 5.6, 6.1, 5.8, 8.6, 7.2, 9, 10.9, 11.5, 11.6, 11.1, 12, 12.3, 10.7, 9.4, 9.8, 9.6, 9.8, 9.5, 8.5, 7.4, 7.6,115],
                 yAxis: 1
                
            }],
        navigation: {
            menuItemStyle: {
                fontSize: '10px'
            }
        }
    });
    Highcharts.chart('container_impression_2', {
        rangeSelector: {
                selected: 4
            },
           chart: {
            type: 'spline'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            labels: {
                overflow: 'justify'
            },top: '0%'
        },
        yAxis: [{
            labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'Clicks'
                },
                height: '50%',
                lineWidth: 2
            }, {
                labels: {
                    align: 'right',
                    x: -2
                },
                title: {
                    text: 'CTR'
                },
                top: '65%',
                height: '50%',
                offset: 0,
                lineWidth: 2
            }],
        tooltip: {
            valueSuffix: ' M'
        },
        plotOptions: {
            spline: {
                lineWidth: 4,
                states: {
                    hover: {
                        lineWidth: 5
                    }
                },
                marker: {
                    enabled: false
                },
                pointInterval: 3600000, // one hour
                pointStart: Date.UTC(2015, 4, 31, 0, 0, 0)
            }
        },
        series: /*[{
            name: 'Impression',
            data: [1, 1.3, 1.5, 2.9, 1.9, 2.6, 1.6, 3, 4, 3.6, 4.5, 4.2, 4.5, 4.5, 4, 3.1, 2.7, 4, 2.7, 2.3, 2.3, 4.1, 7.7, 7.1, 5.6, 6.1, 5.8, 8.6, 7.2, 9, 10.9, 11.5, 11.6, 11.1, 12, 12.3, 10.7, 9.4, 9.8, 9.6, 9.8, 9.5, 8.5, 7.4, 7.6,115]

        },{
            name: 'CTC',
            data: [1, 1.3, 1.5, 2.9, 1.9, 2.6, 1.6, 3, 4, 3.6, 4.5, 4.2, 4.5, 4.5, 4, 3.1, 2.7, 4, 2.7, 2.3, 2.3, 4.1, 7.7, 7.1, 5.6, 6.1, 5.8, 8.6, 7.2, 9, 10.9, 11.5, 11.6, 11.1, 12, 12.3, 10.7, 9.4, 9.8, 9.6, 9.8, 9.5, 8.5, 7.4, 7.6,115]

        }]*/ [{
                type: 'spline',
                name: 'Clicks',
                data: [1, 1.3, 1.5, 2.9, 1.9, 2.6, 1.6, 3, 4, 3.6, 4.5, 4.2, 4.5, 4.5, 4, 3.1, 2.7, 4, 2.7, 2.3, 2.3, 4.1, 7.7, 7.1, 5.6, 6.1, 5.8, 8.6, 7.2, 9, 10.9, 11.5, 11.6, 11.1, 12, 12.3, 10.7, 9.4, 9.8, 9.6, 9.8, 9.5, 8.5, 7.4, 7.6,115],
                
            }, {
                type: 'spline',
                name: 'CTR',
                data: [1, 1.3, 1.5, 2.9, 1.9, 2.6, 1.6, 3, 4, 3.6, 4.5, 4.2, 4.5, 4.5, 4, 3.1, 2.7, 4, 2.7, 2.3, 2.3, 4.1, 7.7, 7.1, 5.6, 6.1, 5.8, 8.6, 7.2, 9, 10.9, 11.5, 11.6, 11.1, 12, 12.3, 10.7, 9.4, 9.8, 9.6, 9.8, 9.5, 8.5, 7.4, 7.6,115],
                 yAxis: 1
                
            }],
        navigation: {
            menuItemStyle: {
                fontSize: '10px'
            }
        }
    });
    Highcharts.chart('container_impression_3', {
        rangeSelector: {
                selected: 4
            },
           chart: {
            type: 'spline'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            labels: {
                overflow: 'justify'
            },top: '0%'
        },
        yAxis: [{
            labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'CPC'
                },
                height: '50%',
                lineWidth: 2
            }, {
                labels: {
                    align: 'right',
                    x: -2
                },
                title: {
                    text: 'Convertion Rate'
                },
                top: '65%',
                height: '50%',
                offset: 0,
                lineWidth: 2
            }],
        tooltip: {
            valueSuffix: ' M'
        },
        plotOptions: {
            spline: {
                lineWidth: 4,
                states: {
                    hover: {
                        lineWidth: 5
                    }
                },
                marker: {
                    enabled: false
                },
                pointInterval: 3600000, // one hour
                pointStart: Date.UTC(2015, 4, 31, 0, 0, 0)
            }
        },
        series: /*[{
            name: 'Impression',
            data: [1, 1.3, 1.5, 2.9, 1.9, 2.6, 1.6, 3, 4, 3.6, 4.5, 4.2, 4.5, 4.5, 4, 3.1, 2.7, 4, 2.7, 2.3, 2.3, 4.1, 7.7, 7.1, 5.6, 6.1, 5.8, 8.6, 7.2, 9, 10.9, 11.5, 11.6, 11.1, 12, 12.3, 10.7, 9.4, 9.8, 9.6, 9.8, 9.5, 8.5, 7.4, 7.6,115]

        },{
            name: 'CTC',
            data: [1, 1.3, 1.5, 2.9, 1.9, 2.6, 1.6, 3, 4, 3.6, 4.5, 4.2, 4.5, 4.5, 4, 3.1, 2.7, 4, 2.7, 2.3, 2.3, 4.1, 7.7, 7.1, 5.6, 6.1, 5.8, 8.6, 7.2, 9, 10.9, 11.5, 11.6, 11.1, 12, 12.3, 10.7, 9.4, 9.8, 9.6, 9.8, 9.5, 8.5, 7.4, 7.6,115]

        }]*/ [{
                type: 'spline',
                name: 'CPC',
                data: [1000,10000,100000,1000000],

            }, {
                type: 'spline',
                name: 'Convertion Rate',
                data: [1000,10000,100000,1000000],
                 yAxis: 1
                
            }],
        navigation: {
            menuItemStyle: {
                fontSize: '10px'
            }
        }
    });
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
                data: maleData,
                color: Highcharts.getOptions().colors[0]
            }, {
                name: 'Female',
                data: femaleData,
                color: Highcharts.getOptions().colors[5]
            }]
        });
    Highcharts.chart('container_user', {
        title: {
            text: 'User Interests'
        },
        xAxis: {
            categories: ['AL', 'CA', 'AZ', 'WI', 'Co']
        },
        yAxis:{ text: 'Interest'},
        labels: {
            items: [{
                html: 'User Interest Comparision %',
                style: {
                    left: '50px',
                    top: '18px',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                }
            }]
        },
        series: [{
            type: 'column',
            name: 'Male',
            data: [3, 2, 1, 3, 4],
            color: Highcharts.getOptions().colors[0]
        }, {
            type: 'column',
            name: 'Female',
            data: [2, 3, 5, 7, 6],
            color: Highcharts.getOptions().colors[5]
        },  {
            type: 'spline',
            name: 'Average',
            data: [3, 2.67, 3, 6.33, 3.33],
            marker: {
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[1],
                fillColor: 'white'
            }
        }, {
            type: 'pie',
            name: 'Total consumption',
            data: [{
                name: 'Male',
                y: 13,
                color: Highcharts.getOptions().colors[0] // Jane's color
            }, {
                name: 'Female',
                y: 23,
                color: Highcharts.getOptions().colors[5] // John's color
            }],
            center: [100, 80],
            size: 100,
            showInLegend: false,
            dataLabels: {
                enabled: false
            }
        }]
    });
}
});