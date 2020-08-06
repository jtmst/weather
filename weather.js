// https.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${country}&units=metric&appid=${api.apiKey}`

// Problem: get the weather data with numbers or city names by typing in the console and print out the results

// Solution: use the OpenWeather API key to get the data and display it

// Function to get the HTTPS module

const https = require('https');

// Get access to the HTTP module

const http = require('http');

// Query variable from the command line

let query = process.argv.slice(2).join(',').replace(' ', ',');


  // If the users types number it will change the q to id
  
  if (isNaN(query)===false){
    //generate an country ID query like => id= 234242
    query = `id=${query}`;
  }else {
    //generate a simple q query like => q=${city}
    query = `q=${query}`;
  }


// Function to print error messages

function printError (error){
  console.error(error.message);
};

// Function tp print message to the console

function printMessage(city, temp){
  const message = `In ${city} the current temperature is ${temp} Celsius.`;
  console.log(message);
}

// Function to convert Farenheit to celsius
// Celsius = Kelvin - 273.15

function getCelsius (kelvin){
  const celsius = kelvin - 273.15;
  return Math.round(celsius);
}

// Connect to the OpenWeather API and get the raw data
// Example of calls: api.openweathermap.org/data/2.5/weather?q=London,uk


function getTemp (query) {
    try{ //try block starts
      const request = https.get(`https://api.openweathermap.org/data/2.5/weather?${query}&APPID=2f7c1a7a7a8a62f502094c6f43ba1791`, response => {
   if (response.statusCode === 200) {
          let body = '';
          // Read the data
          response.on('data', data => {
            body += data.toString();
    
          }); //data reads ends
          // Parse it 
    
          response.on('end', data => {
            try{  //try block to filter the undefiend cities
              const weather = JSON.parse(body);
                 printMessage(weather.name, getCelsius(weather.main.temp));
        
            } // udefiend city filter ends
              catch(error){
                      printError(error) // we catch the parse error an print it out
                      }
          }); // parse ends
 } // if ok status ends
      else { // if the status code is not 200
  const message = `There was an error getting your request ${query} (${http.STATUS_CODES[response.statusCode]}) `;
  const statusCodeError = new Error(message);
  printError(statusCodeError);
  }
    
}); //request ends  
    // URL error handling
request.on('error', () => {
    console.log('The URL is wrong. Please type another one.');
  });
} //try block ends
catch(error){
 printError(error);
}

} // getTemp funciton ends

getTemp(query); // call getTemp with the proper query

