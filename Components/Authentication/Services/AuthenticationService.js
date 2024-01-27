import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { rootAddress } from "../../../Variables"
import { saveUserLocation } from "../../User/Services/UserService"
import { getCurrentLatitudeAndLongitude } from '../../Common/Services/CommunityService'

const authenticate = async (username, password) => {
    try {
        const response = await axios.post(`${rootAddress}/auth/signin`, {
            "username": username,
            "password": password
        });

        if (response.data) {
            console.log("Authentication returned" + response.data);
            AsyncStorage.setItem("username", response.data.username);
            AsyncStorage.setItem("password", response.data.password);
            AsyncStorage.setItem("user_id", response.data.id);
            return true;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

const register = async (username, password, email) => {
    try {
        const response = await axios.post(`${rootAddress}/auth/register`, {
            "username": username,
            "password": password,
            "email": email,
            "credit": 100
        });

        if (response.data) {
            console.log("Registration returned" + JSON.stringify(response.data));
            const { latitude, longitude } =  getCurrentLatitudeAndLongitude()
            const anotherResponse = saveUserLocation(response.data.id, latitude, longitude)
            if(anotherResponse) {
                console.log('Successfully created user and saved his stable location') // His house or from where he created
            }
            return true;
        } else {
            console.log(response);
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export {
    authenticate,
    register
}