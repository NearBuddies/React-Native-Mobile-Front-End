import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { rootAddress } from "../../../Variables"

const authenticate = (username, password) => {
    axios.get(`${rootAddress}/`)
    .then((response)=>{
        if(response.data) {
            console.log("Authentication returned"+response.data)
            AsyncStorage.setItem("username",response.data.username)
            AsyncStorage.setItem("password",response.data.password)
            AsyncStorage.setItem("user_id",response.data.id)
            return true;
        }
    })
    .catch((error)=>console.log(error))
}

const register = (username, password, email) => {
    axios.post(`${rootAddress}/`,
        {
            "username" : username,
            "password" : password,
            "email" : email
        }
    )
    .then((response)=>{
        if(response.data) {
            console.log("Registration returned"+response.data)
            return true
        } else {
            console.log(response)
            return false
        }
    })
    .catch((error)=>console.log(error))
}

export {
    authenticate,
    register
}