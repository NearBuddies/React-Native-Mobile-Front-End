import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { rootAddress } from "../../../Variables"
import { spatial_db_rootAddress }  from "../../../Variables"

//Save user location
const saveUserLocation = async (entity_id,latitude,longitude) => {
    axios.post(`${spatial_db_rootAddress}/postentitylocation`,{
        "entity_id" : entity_id,
        "entity_type" : "user",
        "latitude" : latitude,
        "longitude" : longitude,
    })
         .then((response)=>{
            console.log('Save user location returned '+response.data)
         })
         .catch((err)=>{
            
            console.log('Error in save user '+err)
         })
}

// Get user latest location
const getLatestUserLocation = async (user_id) => {
    // Get the latest user latitude and longitude
    axios.get(`${spatial_db_rootAddress}/getlatestentitylocation/${user_id}`)
        .then((response)=>{
            console.log("Location de l'utilisateur " + response.data.latitude + "" + response.data.longitude);
            // Set them in async storage
            AsyncStorage.setItem("latitude", response.data.latitude.toString())
            AsyncStorage.setItem("longitude",response.data.longitude.toString())
        }).catch(err=>console.log(err))
}



export {
    getLatestUserLocation,
    saveUserLocation
}