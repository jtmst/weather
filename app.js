//API Key
//  http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=2f7c1a7a7a8a62f502094c6f43ba1791

function weatherReport = 

https.get('http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=2f7c1a7a7a8a62f502094c6f43ba1791' , (res) => {
    let body = ""

Response.on('data', data => {
  body += data.toString();
})
  Response.on('end', () => {
      const 
  }
})