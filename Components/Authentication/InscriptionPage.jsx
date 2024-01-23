import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, TextInput, Image, Alert, Touchable } from 'react-native';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthentificationPage from './AuthentificationPage';
import { register } from './Services/AuthenticationService';
export default function InscriptionPage({

}) {
    // Definir la navigation
    const navigation = useNavigation();

    // Definir username, password et email
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [email, setEmail] = useState('')

    // Definir la fonction utilisée
    const useRegister = () => {
        if ( password === confirmedPassword ){
            if( register(username,password, email) === true ) navigation.navigate('AuthentificationPage')
            else {
                Alert.alert("Une erreur est survenue, veuillez réessayer");
                navigation.reset
            }
        } else {
            Alert.alert("Les mots de passe ne correspondent pas")
        }        
    }

    return (
        <View style={styles.parentView}>
            <View style={styles.titlesView}>
                <Image source={require("../../assets/images/NearBuddies_logo.jpg")}
                style={styles.titlesImage}
                />
                <Text style={styles.signInStyle}>Sign up</Text>
            </View>
            <Text style = {styles.welcomeBackStyle}>Create an account to get stated</Text>
            <View style={styles.centralView}>
                <View style={styles.inputView}>
                    <Pressable style={styles.inputPressable}>
                        <Image
                        source={require("../../assets/icons/auth/User_alt_light.jpg")}
                        style = {styles.inputIcons}
                        /> 
                    </Pressable>
                    <TextInput style={styles.inputTextInput} placeholder="Username" onChangeText={(text)=>{setUsername(text)}}/>
                </View>
                <View style={styles.inputView}>
                    <Pressable style={styles.inputPressable}>
                        <Image
                        source={require("../../assets/icons/auth/User_alt_light.jpg")}
                        style = {styles.inputIcons}
                        /> 
                    </Pressable>
                    <TextInput style={styles.inputTextInput} placeholder="Email" onChangeText={(text)=>{setEmail(text)}}/>
                </View> 
                <View style={styles.inputView}>
                    <Pressable style={styles.inputPressable} >
                        <Image
                        source={require("../../assets/icons/auth/Lock_alt_light.jpg")}
                        style = {styles.inputIcons}
                        />
                    </Pressable>
                    <TextInput style={styles.inputTextInput} placeholder="Password" onChangeText={(text)=>{setPassword(text)}}/>
                    <Pressable style={styles.inputPressableEnd} onPress={()=> Alert.alert("You pressed")}>
                        <Image
                        source={require("../../assets/icons/auth/View_light.jpg")}
                        style = {styles.inputIcons}
                        />
                    </Pressable>
                </View>
                <View style={styles.inputView}>
                    <Pressable style={styles.inputPressable} >
                        <Image
                        source={require("../../assets/icons/auth/Lock_alt_light.jpg")}
                        style = {styles.inputIcons}
                        />
                    </Pressable>
                    <TextInput style={styles.inputTextInput} placeholder="Confirm password" onChangeText={(text)=>{setConfirmedPassword(text)}}/>
                    <Pressable style={styles.inputPressableEnd} onPress={()=> Alert.alert("You pressed")}>
                        <Image
                        source={require("../../assets/icons/auth/View_light.jpg")}
                        style = {styles.inputIcons}
                        />
                    </Pressable>
                </View>              
            </View>
            
            <Pressable style={styles.signInPressable} onPress={()=>{ useRegister() }}>
                    <View >
                        <Text style={styles.signInButtonStyle}>Sign up</Text>
                    </View>
            </Pressable>
            <View style={styles.bottomView}>
                <Text style={styles.haveAccount}>Already have an acount?</Text>
                <Pressable onPress={()=>{
                    navigation.navigate('AuthentificationPage')
                    }}>
                    <Text style={styles.connectAccount}>Connect</Text>
                </Pressable>
            </View>
           
            
        </View>
    );
}
     

const styles = StyleSheet.create({
    parentView : {
        display : "flex",
        flex: 1,
        flexDirection : "column",
        justifyContent : "flex-start",
        alignItems : "center"
    },
    titlesView : {
        backgroundColor :"#fff",
        width : 200,
        height : 50,
        marginVertical : 60,
        justifyContent : "space-evenly"
    },
    titlesImage: {
        width: 200,
        height : 80,
        objectFit : "contain",
        marginVertical: 50
    },
    signInStyle : {
        fontWeight : "100",
        marginLeft : '25%',
        marginVertical : 30,
        fontSize : 30,
        fontWeight : "300",
        height : 60,
        marginTop : 50
    },
    welcomeBackStyle : {
        fontStyle : "italic",
        fontSize : 15,
        marginTop:20,
        marginLeft: 20,
        marginTop : 20,
    },
    centralView : {
        display: "flex",
        flexDirection: "column",
        height : 350,
        width : 350,
        marginTop : 50,
        borderRadius: 40, 
        backgroundColor : "#A6DACD",
    },
    inputView : {
        display : "flex",
        flexDirection: "row",
        alignItems : "center",
        backgroundColor : "#FFF",
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: 20,
        height:50,
        width: '90%',
        borderRadius : 15
    },
    inputPressable : {
        width : 50,
        height : 50,
        backgroundColor : "#fff",
        borderRadius : 15
    },
    inputPressableEnd : {
        width : 60,
        height : 50,
        backgroundColor : "#fff",
        borderRadius : 15,
        marginLeft : "auto",
    },
    inputIcons : {
        height : 50,
        width : 40, 
        marginHorizontal:10,
        objectFit: "contain"
    },
    inputTextInput : {
        flex : 1,
        marginHorizontal:10,
        height : 40,
        fontSize : 15
    },
    signInPressable : {
        marginTop : 50,
        backgroundColor:"#ec6a6d",
        height: 40,
        width:"90%",
        borderRadius : 10,
        justifyContent : "center",
        alignItems : "center"
    },
    signInButtonStyle : {
        fontSize : 15,
        fontWeight : "bold",
        color : "#fff"
    },
    bottomView : {
        width: "90%",
        marginLeft:"25%",
        display: "flex",
        flexDirection: "row",
        marginTop: 50
    },
    haveAccount : {
        fontSize : 15,
        fontWeight : "bold"
    },
    connectAccount: {
        fontSize : 15,
        fontWeight : "bold",
        color : "#ec6a6d"
    }
})
