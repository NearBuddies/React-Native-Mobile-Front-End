import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { rootAddress } from "../../../Variables"
import { spatial_db_rootAddress }  from "../../../Variables"

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
    getLatestUserLocation
}