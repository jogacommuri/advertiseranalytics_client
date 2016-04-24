angular.module('eventCtrl',[])
    .controller('eventCtrl',function($scope,$window,$http){
    var event =  this;
    $scope.userDetails = JSON.parse($window.localStorage.getItem('user'));
    event.profileData = {};
    event.profileData =  $scope.userDetails;
     /*event.data= [];*/
    event.get_instate_count = function(){
        $http.post('http://advanalytics.herokuapp.com/geo_instate_count')
            .success(function(data){
            console.log("post sucess");
            console.log(data);
             event.data = data.results;
           /* console.log(event.data);*/
            event.displayMap(event.data);
        })
        .error(function(data) {
				console.log('Error: ' + data);
			});
    }
  
    

  var pointClick = function() {
        event.postData={};
        event.postData.state = this.name;
            $http.post('http://advanalytics.herokuapp.com/geo_instate_categoryCount',event.postData)
                    .success(function(data){
                    console.log("post sucess");
                    console.log(data);
                    event.donutData = data.results;
                console.log(event.donutData);
                event.donutChart(event.donutData);
                    
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                    });
                var row = this.options.row,
                    $div = $('<div></div>')
                        .dialog({
                            title: this.name,
                            width: 800,
                            height: 500
                        });

                event.donutChart =function(data){
                  Highcharts.chart({
                   
                    chart: {
                        renderTo: $div[0],
                        type: 'pie',
                        width: 600,
                        height: 500,
                        
                         
                     
                        options3d: {
                         enabled: true,       
                        alpha:25
                      }
                    },
                    plotOptions: {
                               pie: {
                                  innerSize: 100,
                                  depth: 45
                               }
                            },
                    title: {
                        text: null
                    },
                    series: [{
                        name: 'Events',
                        data: event.donutData,
                        
                        dataLabels: {
                            format: '<b>{point.name}</b> {point.value}'
                        }
                    }]
                });  
                }  
            };

		event.displayMap = function(data){
            Highcharts.Map( {

              chart: {
                                renderTo: 'container',
                                type: 'map',
                                height: 600,
                                weight: 500,
                                backgroundColor: "#eee"
                            },
                         title: {
              text: 'Events data in the US'
            },

            subtitle: {
              text: null
            },
            legend: {
                    layout: 'vertical',
                    borderWidth: 0,
                    backgroundColor: 'rgba(255,255,255,0.85)',
                    floating: 'true',
                    align:'left'

                },
            mapNavigation: {
              enabled: true,
              buttonOptions: {
                verticalAlign: 'bottom'
              }
            },

            colorAxis: {
              min: 0
                    },

            series: [{
              data: event.data,
              mapData: Highcharts.maps['countries/us/us-all'],
              joinBy: 'hc-key',
              name: 'Event data',
              states: {
                hover: {
                  color: '#BADA55'
                }
              },
              dataLabels: {
                enabled: true,
                format: '{point.name}'
              },
                point: {
                        events: {
                            click: pointClick
                        }
                    },
                 tooltip: {
                        pointFormat: '{point.name}:<br> {point.event} :{point.value}'
            }
            },
            {
              name: 'Separators',
              type: 'mapline',
              data: Highcharts.geojson(Highcharts.maps['countries/us/us-all'], 'mapline'),
              color: 'silver',
              showInLegend: false,
              enableMouseTracking: false
            }]
        });
        }
});