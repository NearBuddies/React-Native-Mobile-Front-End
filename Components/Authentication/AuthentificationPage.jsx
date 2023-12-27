import React from 'react';
import { Pressable, StyleSheet, Text, View, TextInput } from 'react-native';

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
        flex: 1,
        flexDirection : "column",
        justifyContent : "center",
        alignItems : "center"
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
