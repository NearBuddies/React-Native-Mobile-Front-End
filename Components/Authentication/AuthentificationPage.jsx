import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function AuthentificationPage() {
    
    return (
        <View style={styles.parentView}>
            <View style={styles.centralView}>
                <View style={styles.inputView}>
                    <Pressable style={styles.inputPressable}></Pressable>
                    <TextInput style={styles.inputTextInput}/>
                </View>                    
            </View>
        </View>
    );
}
     

const styles = StyleSheet.create({
    parentView : {
        display : "flex",
        flexDirection : "column",
        justifyContent : "center",
        alignItems : "center"
    },
    centralView : {
        height : 500,
        width : 300,
        borderRadius : 50, 
        backgroundColor : ""
    },
    inputView : {
        display : "flex",
        flexDirection: "row",
        alignItems : "center"
    },
    inputPressable : {

    },
    inputTextInput : {

    }
})
