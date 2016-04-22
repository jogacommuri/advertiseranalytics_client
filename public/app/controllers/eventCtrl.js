angular.module('eventCtrl',[])
    .controller('eventCtrl',function($scope,$window){
    var event =  this;
    $scope.userDetails = JSON.parse($window.localStorage.getItem('user'));
    event.profileData = {};
    event.profileData =  $scope.userDetails;
    
    event.title = "event";
    event.state = "us-ca";
    event.number = 100;

     event.data = [{
    "hc-key": "us-ma",
    "event": 'Number of events',
    "value": 44
  }, {
    "hc-key": "us-wa",
    "event": 'Number of events',
      "value": 1
  }, {
    "hc-key": event.state,
    "event": 'Number of events',
    "value": event.number
  }, {
    "hc-key": "us-or",
      "event": 'Number of events',
    "value": 3
  }, {
    "hc-key": "us-wi",
      "event": 'Number of events',
    "value": 4
  }, {
    "hc-key": "us-me",
      "event": 'Number of events',
    "value": 5
  }, {
    "hc-key": "us-mi",
      "event": 'Number of events',
    "value": 6
  }, {
    "hc-key": "us-nv",
      "event": 'Number of events',
    "value": 7
  }, {
    "hc-key": "us-nm",
      "event": 'Number of events',
    "value": 8
  }, {
    "hc-key": "us-co",
      "event": 'Number of events',
    "value": 9
  }, {
    "hc-key": "us-wy",
      "event": 'Number of events',
    "value": 10
  }, {
    "hc-key": "us-ks",
      "event": 'Number of events',
    "value": 11
  }, {
    "hc-key": "us-ne",
      "event": 'Number of events',
    "value": 12
  }, {
    "hc-key": "us-ok",
      "event": 'Number of events',
    "value": 13
  }, {
    "hc-key": "us-mo",
      "event": 'Number of events',
    "value": 14
  }, {
    "hc-key": "us-il",
      "event": 'Number of events',
    "value": 15
  }, {
    "hc-key": "us-in",
      "event": 'Number of events',
    "value": 16
  }, {
    "hc-key": "us-vt",
      "event": 'Number of events',
    "value": 17
  }, {
    "hc-key": "us-ar",
      "event": 'Number of events',
    "value": 18
  }, {
    "hc-key": "us-tx",
      "event": 'Number of events',
    "value": 19
  }, {
    "hc-key": "us-ri",
      "event": 'Number of events',
    "value": 20
  }, {
    "hc-key": "us-al",
      "event": 'Number of events',
    "value": 21
  }, {
    "hc-key": "us-ms",
      "event": 'Number of events',
    "value": 22
  }, {
    "hc-key": "us-nc",
      "event": 'Number of events',
    "value": 23
  }, {
    "hc-key": "us-va",
      "event": 'Number of events',
    "value": 24
  }, {
    "hc-key": "us-ia",
      "event": 'Number of events',
    "value": 25
  }, {
    "hc-key": "us-md",
      "event": 'Number of events',
    "value": 26
  }, {
    "hc-key": "us-de",
      "event": 'Number of events',
    "value": 27
  }, {
    "hc-key": "us-pa",
      "event": 'Number of events',
    "value": 28
  }, {
    "hc-key": "us-nj",
      "event": 'Number of events',
    "value": 29
  }, {
    "hc-key": "us-ny",
      "event": 'Number of events',
    "value": 30
  }, {
    "hc-key": "us-id",
      "event": 'Number of events',
    "value": 31
  }, {
    "hc-key": "us-sd",
      "event": 'Number of events',
    "value": 32
  }, {
    "hc-key": "us-ct",
      "event": 'Number of events',
    "value": 33
  }, {
    "hc-key": "us-nh",
      "event": 'Number of events',
    "value": 34
  }, {
    "hc-key": "us-ky",
      "event": 'Number of events',
    "value": 35
  }, {
    "hc-key": "us-oh",
      "event": 'Number of events',
    "value": 36
  }, {
    "hc-key": "us-tn",
      "event": 'Number of events',
    "value": 37
  }, {
    "hc-key": "us-wv",
      "event": 'Number of events',
    "value": 38
  }, {
    "hc-key": "us-dc",
      "event": 'Number of events',
    "value": 39
  }, {
    "hc-key": "us-la",
      "event": 'Number of events',
    "value": 40
  }, {
    "hc-key": "us-fl",
      "event": 'Number of events',
    "value": 41
  }, {
    "hc-key": "us-ga",
      "event": 'Number of events',
    "value": 42
  }, {
    "hc-key": "us-sc",
      "event": 'Number of events',
    "value": 43
  }, {
    "hc-key": "us-mn",
      "event": 'Number of events',
    "value": 44
  }, {
    "hc-key": "us-mt",
      "event": 'Number of events',
    "value": 45
  }, {
    "hc-key": "us-nd",
      "event": 'Number of events',
    "value": 46
  }, {
    "hc-key": "us-az",
      "event": 'Number of events',
    "value": 47
  }, {
    "hc-key": "us-ut",
      "event": 'Number of events',
    "value": 48
  }, {
    "hc-key": "us-hi",
      "event": 'Number of events',
    "value": 49
  }, {
    "hc-key": "us-ak",
      "event": 'Number of events',
    "value": 50
  }, {
    "value": 51
  }];

  var pointClick = function() {
                var row = this.options.row,
                    $div = $('<div></div>')
                        .dialog({
                            title: this.event,
                            width: 600,
                            height: 500
                        });

                window.chart = new Highcharts.Chart({
                   
                    chart: {
                        renderTo: $div[0],
                        type: 'pie',
                        width: 500,
                        height: 400,
                        
                         
                     
                        options3d: {
                         enabled: true,
                         alpha: 45 ,
           
                        
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
                        data: [{
                            name: 'Technology',
                            value: 30,
                             y: parseInt(30),
                            /*color: '#00cc44',*/
                            
                        }, {
                            name: 'Music',
                            value: 20,
                            y: parseInt(20),
                            /*color: '#ff9933',*/
                           
                        },
                        {
                            name: 'Movies',
                            value: 15,
                             y: parseInt(15),
                            /*color: '#1a75ff',*/
                            
                        },
                        {
                            name: 'Sports',
                            value: 35,
                             y: parseInt(35),
                            /*color: '#e63900',*/
                            
                        }],
                        
                        dataLabels: {
                            format: '<b>{point.name}</b> {point.value}'
                        }
                    }]
                });
            };

		Highcharts.Map( {

      chart: {
                        renderTo: 'container',
                        type: 'map',
                        height: 500,
                        weight: 400,
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
});