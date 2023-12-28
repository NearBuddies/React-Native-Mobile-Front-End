import React from 'react';
import { Pressable, StyleSheet, Text, View, TextInput, Image } from 'react-native';

export default function AuthenticationPage() {
    
    return (
        <View style={styles.parentView}>
            <View style={styles.titlesView}>
                <Image source={require("../../assets/images/NearBuddies_logo.jpg")}
                style={styles.titlesImage}
                />
                <Text style={styles.signInStyle}>Sign in</Text>
                <Text style = {styles.welcomeBackStyle}>Welcome back to you account</Text>
            </View>
            <View style={styles.centralView}>
                <View style={styles.inputView}>
                    <Pressable style={styles.inputPressable}>
                        <Image
                        source={require("")}
                        style = {styles.inputIcons}
                        />
                    </Pressable>
                    <TextInput style={styles.inputTextInput}/>
                </View>                    
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
        height : 100,
        marginVertical : 50,
        justifyContent : "space-evenly"
    },
    titlesImage: {
        width: 200,
        height : 60,
        objectFit : "cover"
    },
    signInStyle : {
        fontWeight : "130",
        marginLeft : '25%',
        marginVertical : 30,
        fontSize : 30
    },
    welcomeBackStyle : {
        fontStyle : "italic",
        fontSize : 15
    },
    centralView : {
        display: "flex",
        flexDirection: "column",
        height : 500,
        width : 350,
        borderRadius: 40, 
        backgroundColor : "#A6DACD",
    },
    inputView : {
        display : "flex",
        flexDirection: "row",
        alignItems : "center",
        backgroundColor : "#FFF",
        marginVertical: 40,
        marginHorizontal: 20,
        height:50,
        width: '90%',
        borderRadius : 15
    },
    inputPressable : {

    },
    inputTextInput : {

    }
})
