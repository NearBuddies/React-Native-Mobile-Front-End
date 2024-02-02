import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { rootAddress } from "../../../Variables"
import * as Location from 'expo-location'
import { spatial_db_rootAddress }  from "../../../Variables"
import { getLatestUserLocation } from "../../User/Services/UserService"

//Save event location
const saveEventLocation = async (entity_id,latitude,longitude) => {
    axios.post(`${spatial_db_rootAddress}/postentitylocation`,{
        "entity_id" : entity_id,
        "entity_type" : "event",
        "latitude" : latitude,
        "longitude" : longitude,
    })
         .then((response)=>{
            console.log('Save event location returned '+response.data)
         })
         .catch((err)=>{
            console.log('Error in save event '+err)
         })
}

// Get current latitude and longitude
const getCurrentLatitudeAndLongitude = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      return {
        latitude : location.coords.latitude,
        longitude : location.coords.longitude
      }
    } catch (error) {
      console.error('Error fetching location:', error);
      setErrorMsg('Error fetching location');
    }
};

// Create an event
const createEvent = async (name, description, photo) => {
    try {
    const formData = new FormData();
    // console.log(photo)
    // Append the photo to FormData
    formData.append('photo', {
        uri: photo,
        name: `${name}`,
        type: 'image/jpeg',
    })
    formData.append(
    'body',
    JSON.stringify({
        name,
        description,
        visibility: 'PUBLIC',
    })
    )
    const response = await axios.post(`${rootAddress}/event/new`, formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    })
    if (response) {
        // console.log('Create event returned', response.data);
    const { latitude, longitude } = await getCurrentLatitudeAndLongitude()
    const anotherResponse = await saveEventLocation(response.data.id, latitude, longitude)
    if (anotherResponse) {
        console.log('Successfully created event and saved its location')
    }
    return response.data.id
    }
} catch (err) {
    console.log('Error in create event:', err)
    throw err
}
}
  

// Find an event
const findEvent = async (event_id) => {
    try {
        const response = await axios.get(`${rootAddress}/event/findOne/${event_id}`);
        // console.log("find event retourne " + JSON.stringify(response.data));
        return response.data;
    } catch (err) {
        console.log("Erreur dans find event " + err);
        throw err;
    }
};

// Find location of an event
const findEventLocation = async (event_id) => {
    try {
        const response = await axios.get(`${spatial_db_rootAddress}/getlatestentitylocation/${event_id}`);
        if (response.data) {
            console.log(response.data);
            return {
                "latitude": response.data.latitude,
                "longitude": response.data.longitude
            };
        }
    } catch (err) {
        console.log("Erreur dans find event location " + err)
        throw err;
    }
};


// Get the nearest Events of an user
const getNearestEventsToUser = async () => {
    try {
        await getLatestUserLocation(); // Make sure you set latitude and longitude 
        // Get them and parse them to float
        const latitude = parseFloat(await AsyncStorage.getItem("latitude"));
        const longitude = parseFloat(await AsyncStorage.getItem("longitude"));
        // Get user id
        const user_id = await AsyncStorage.getItem("user_id");
        // Events array 
        const Events = [];
        // Send the request to get the nearest Events
        const response = await axios.get(`${spatial_db_rootAddress}/getnearestevents/${user_id}/${latitude}/${longitude}`);
        if (response.data) {
            // Map over the response data and push promises to the Events array
            response.data.map(event => {
                Events.push(findEvent(event.entity_id));
            });
            // Wait for all promises to resolve using Promise.all
            const resolvedEvents = await Promise.all(Events);
            // console.log("The nearest Events are " + JSON.stringify(resolvedEvents));
            // Return the resolved event array
            return resolvedEvents;
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}

// Join an event
const joinEvent = async (eventId,type,status) => {
    const user_id = await AsyncStorage.getItem("user_id")
    console.log("L'id envoyé est " + user_id)
    try {
        const response = await axios.post(`${rootAddress}/event/register/${user_id}/${eventId}/${type}/${status}`)
        if(response.data) {
            console.log('événement rejoint avec succès')
            const anotherResponse = await axios.post(`${rootAddress}/user/addCredit/${creator_id}`) // add creator credits
            return 'JUST_JOINED'
        }
    } catch (err) {
        console.log("Deja dans l'événement "+ err)
        return 'ALREADY_IN'
    }
}

// Quit an event
const quitEvent = async (eventId) => {
    const user_id = await AsyncStorage.getItem("user_id")
    console.log("L'id envoyé est " + user_id)
    try {

        /********************************************************FIX THE ENDPOINT*******************************************************************/
        const response = await axios.post(`${rootAddress}/event/quit/${user_id}/${eventId}`)
        if(response.data) {
            console.log('événement rejoint avec succès')
            return 'JUST_JOINED'
        }
    } catch (err) {
        console.log("Deja dans l'événement "+ err)
        return 'ALREADY_IN'
    }
}

// Export the datas
export {
    findEvent,
    findEventLocation,
    getCurrentLatitudeAndLongitude,
    createEvent,
    joinEvent,
    quitEvent
}