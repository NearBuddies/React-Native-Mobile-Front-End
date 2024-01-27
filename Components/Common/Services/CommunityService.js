import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { rootAddress } from "../../../Variables"
import * as Location from 'expo-location'
import { spatial_db_rootAddress }  from "../../../Variables"
import { getLatestUserLocation } from "../../User/Services/UserService"

//Save community location
const saveCommunityLocation = async (entity_id,latitude,longitude) => {
    axios.post(`${spatial_db_rootAddress}/postentitylocation`,{
        "entity_id" : entity_id,
        "entity_type" : "community",
        "latitude" : latitude,
        "longitude" : longitude,
    })
         .then((response)=>{
            console.log('Save community location returned '+response.data)
         })
         .catch((err)=>{
            console.log('Error in save community '+err)
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

// Create a community
const createCommunity = async (name, description, photo) => {
    try {
    const formData = new FormData();
    // console.log(photo)
    // Append the photo to FormData
    formData.append('photo', {
        uri: photo,
        name: `${name}`,
        type: 'image/jpeg',
    });

    formData.append(
    'body',
    JSON.stringify({
        name,
        description,
        visibility: 'PUBLIC',
    })
    );

    const response = await axios.post(`${rootAddress}/community/new`, formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    });

    if (response) {
    console.log('Create community returned', response.data);

    const { latitude, longitude } = await getCurrentLatitudeAndLongitude();
    const anotherResponse = await saveCommunityLocation(response.data.id, latitude, longitude);

    if (anotherResponse) {
        console.log('Successfully created community and saved its location');
    }

    return response.data.id;
    }
} catch (err) {
    console.log('Error in create community:', err);
    throw err;
}
}
  

// Find a community
const findCommunity = async (community_id) => {
    try {
        const response = await axios.get(`${rootAddress}/community/findOne/${community_id}`);
        // console.log("find community retourne " + JSON.stringify(response.data));
        return response.data;
    } catch (err) {
        console.log("Erreur dans find community " + err);
        throw err;
    }
};

// Find location of a community
const findCommunityLocation = async (community_id) => {
    try {
        const response = await axios.get(`${spatial_db_rootAddress}/getlatestentitylocation/${community_id}`);
        if (response.data) {
            console.log(response.data);
            return {
                "latitude": response.data.latitude,
                "longitude": response.data.longitude
            };
        }
    } catch (err) {
        console.log("Erreur dans find community location " + err)
        throw err;
    }
};

// Find distance between user and community
const findDistanceBetweenUserAndCommunity = async (community_id) => {
    // find user id
    const user_id = AsyncStorage.getItem("user_id")
    try {
        const response = await axios.post(`${spatial_db_rootAddress}/getdistancetwoentities/${user_id}/${community_id}`)
        if(response.data) {
            return response.data.distance
        }
    } catch (err) {
        console.log("Erreur dans la recherche de la distance "+ err)
        throw err
    }
}

// Get communities in which user already is
const getCommunitiesOfUser = async () => {
    // This should be implemented in backend first
}   

// Get the nearest communities of an user
const getNearestCommunitiesToUser = async () => {
    try {
        await getLatestUserLocation(); // Make sure you set latitude and longitude 
        // Get them and parse them to float
        const latitude = parseFloat(await AsyncStorage.getItem("latitude"));
        const longitude = parseFloat(await AsyncStorage.getItem("longitude"));
        // Get user id
        const user_id = await AsyncStorage.getItem("user_id");
        // Communities array 
        const communities = [];
        // Send the request to get the nearest communities
        const response = await axios.get(`${spatial_db_rootAddress}/getnearestcommunities/${user_id}/${latitude}/${longitude}`);
        if (response.data) {
            // Map over the response data and push promises to the communities array
            response.data.map(community => {
                communities.push(findCommunity(community.entity_id));
            });
            // Wait for all promises to resolve using Promise.all
            const resolvedCommunities = await Promise.all(communities);
            // console.log("The nearest communities are " + JSON.stringify(resolvedCommunities));
            // Return the resolved community array
            return resolvedCommunities;
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}

// Join a community
const joinCommunity = (communityId) => {
    // Take the user id
    const userId = AsyncStorage.getItem('userId');
    // Send the request
    // ...
}

export {
    findCommunity,
    findCommunityLocation,
    findDistanceBetweenUserAndCommunity,
    getCommunitiesOfUser,
    getNearestCommunitiesToUser,
    createCommunity,
    joinCommunity
}