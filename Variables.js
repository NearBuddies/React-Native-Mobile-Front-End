// The root address of the application
const rootAddress = 'http://192.168.0.23'
// Google Cloud maps service api key 
const GOOGLE_MAPS_APIKEY = "AIzaSyBz6vgE5rU0u6-Mi5R5hTwW9L93m_fCSYE";
// Application theme
const MyTheme = {
    dark: false,
    colors: {
      primary: 'rgb(255, 255, 255)', 
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
    MyTheme,
}