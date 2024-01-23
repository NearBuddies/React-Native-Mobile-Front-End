import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { rootAddress } from "../../../Variables"
import { spatial_db_rootAddress }  from "../../../Variables"
import { getLatestUserLocation } from "../../User/Services/UserService"

// Create a community
const createCommunity = () => {
    
}

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
        console.log("Erreur dans find community location " + err);
        throw err;
    }
};


// Get communities in which user already is
const getCommunitiesOfUser = async () => {
    // This should be implemented in backend first
}   

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
};

export {
    findCommunity,
    getNearestCommunitiesToUser
}