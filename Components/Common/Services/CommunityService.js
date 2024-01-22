import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { rootAddress } from "../../../Variables"
import { spatial_db_rootAddress }  from "../../../Variables"
import { getLatestUserLocation } from "../../User/Services/UserService"

// Create a community
const createCommunity = () => {
    
}

// Find community
const findCommunity = (community_id) => {
    
}

// Find community location
const findCommunityLocation = (community_id) => {
    axios.get(`${spatial_db_rootAddress}/getlatestentitylocation/${community_id}`)
         .then((response)=>{
            if(response.data){
                console.log(response.data)
                return {
                    "latitude" : response.data.latitude,
                    "longitude" : response.data.longitude
                } 
            }
         }).catch((err)=> console.log(err))
}

// Get communities in which user already is
const getCommunitiesOfUser = async (user_id) => {
    // This should be implemented in backend first
}   

// Get nearest communities to user
const getNearestCommunitiesToUser = async (user_id) => {
    await getLatestUserLocation() // Make sure you set latitude and longitude 
    // Get them and parse them to float
    const latitude = parseFloat(AsyncStorage.getItem("latitude"))
    const longitude = parseFloat(AsyncStorage.getItem("longitude"))
    //Get user id
    const user_id = AsyncStorage.getItem("user_id")
    // Send them all
    axios.get(`${spatial_db_rootAddress}/getnearestcommunities/${user_id}/${latitude}/${longitude}`)
         .then((response)=>{
            if(response.data){
                console.log("The nearest communities are " + response.data)
                // Return the communities array
                return response.data
            }
         }).catch((err)=>console.log(err))
} 