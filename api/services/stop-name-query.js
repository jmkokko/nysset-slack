"use strict";

module.exports = function(name, startTime) {

    return `{
  stops(
    name: "${name}"
  ) {          
    gtfsId
    url
    code
    name
    stoptimesForPatterns (
      startTime: "${startTime}"            
      timeRange: ${12*3600}            
      numberOfDepartures: 3
    ) {            
      pattern {               
        route {                 
          mode
          url
          longName
          shortName 
        }           
      }            
      stoptimes {
        serviceDay
        scheduledDeparture
        realtimeDeparture
        realtime
      }
    }
  }
}`
};
