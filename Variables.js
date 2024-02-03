// The root address of the application
const rootAddress = 'http://192.168.10.5:8080' // Everytime you change wifi
// The root address of the spatial database
const spatial_db_rootAddress = 'http://192.168.10.5.24:3000' // Everytime you change wifi
// Google Cloud maps service api key 
const GOOGLE_MAPS_APIKEY = "AIzaSyA-nkkFn0E2zAjpQBQPpgtF1azKjnBQWsU";
// Application theme
const MyTheme = {
    dark: false,
    colors: {
      primary: 'rgb(236, 106, 109)', 
      background: 'rgb(255, 255, 255)',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(28, 28, 30)',
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)',
    },
  };

// Export the variables
export {
    GOOGLE_MAPS_APIKEY,
    rootAddress,
    spatial_db_rootAddress,
    MyTheme,
}