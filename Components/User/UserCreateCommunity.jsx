import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, TextInput, Image, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';


export default function UserCreateCommunity({

}) {
   
    // Se mettre une navigation
    const navigation = useNavigation();
    // Conserver l'image de la communauté
    const [ image, setImage ] = useState(null);
    // Fonction de selection de l'image
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        console.log(result);
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
    };
    // Fonction pour recommencer la sélection d'image
    const repickImage = async () => {
        setImage(null)
        pickImage();
    }
    // Rendering de la page
    return (
        <View style={styles.parentView}> 
            <View style={styles.titlesView}>
                <Image source={require("../../assets/images/NearBuddies_logo.jpg")}
                style={styles.titlesImage}
                />
                <Text style={styles.createCommunityOrEventTextStyle}>Create</Text>
            </View>
            <Text style = {styles.enhanceNewCommunityOrEventTextStyle}>Enhance a new community</Text>
            <View style={styles.centralView}>
                <View style={styles.inputView}>
                    <Pressable style={styles.inputPressable}>
                        <Image
                        source={require("../../assets/icons/Favorite_fill.jpg")}
                        style = {styles.inputIcons}
                        /> 
                    </Pressable>
                    <TextInput style={styles.inputTextInput} placeholder="Community name"/>
                </View>
                <View style={styles.inputView}>
                    <Pressable style={styles.inputPressable}>
                        <Image
                        source={require("../../assets/icons/File_dock_fill.jpg")}
                        style = {styles.inputIcons}
                        /> 
                    </Pressable>
                    <TextInput style={styles.inputTextInput} placeholder="Description"/>
                </View>
                <View style={styles.uploadImageView}>
                        {
                            !image
                             &&                             
                            <Pressable style={styles.uploadImagePressable} onPress={pickImage}>
                                <Image
                                    source={require("../../assets/icons/Img_box_duotone_line.jpg")}
                                    style = {styles.uploadImageIcon}
                                /> 
                                <Text style={styles.uploadImageText}>Upload image</Text>
                            </Pressable>
                        }
                        {
                            image
                             && 
                             <View style={styles.selectedImageView}>
                                <Image source={{ uri: image }} style={styles.selectedImageStyle} /> 
                             </View>
                        }
                    
                </View>                              
            </View>
            
            <Pressable style={styles.signInPressable} onPress={()=>{Alert.alert("You pressed")}}>
                    <View >
                        <Text style={styles.signInButtonStyle}>Let's go</Text>
                    </View>
            </Pressable> 
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
    createCommunityOrEventTextStyle : {
        fontWeight : "100",
        marginVertical : 30,
        marginLeft : '35%',
        fontSize : 20,
        fontWeight : "bold",
        color : '#ec6a6d',
        height : 60,
        marginTop : 50
    },
    enhanceNewCommunityOrEventTextStyle : {
        fontStyle : "italic",
        fontSize : 15,
        marginTop:20,
        marginLeft: 20,
        marginTop : 20,
    },
    centralView : { 
        display: "flex",
        flexDirection: "column",
        height : '60%',
        width : 350,
        marginTop : 5,
        borderRadius: 40, 
        backgroundColor : "#A6dACe",
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
        borderRadius : 15,
    
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
    },
    uploadImageView : {
        backgroundColor : '#fff',
        width : '60%',
        height : '60%',
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center',
        marginLeft : '21%',
        borderRadius : 20,
        // borderStyle : 'dashed',
        // borderWidth :2,
        borderColor : '#b4a8a5',
        marginTop: '5%',
    },
    uploadImageText : {
        marginTop : '5%',
        fontSize : 20,
        color : '#b4a8a5',
        fontWeight : 'bold'
    },
    uploadImagePressable : {  
        backgroundColor: '#fff',
        display : 'flex',
        height : 40,
        width : '100%',
        flexDirection : 'column',
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 5,
        marginTop : '5%'
    },
    uploadImageIcon : {
        objectFit : 'contain',
    },
    selectedImageView : {
        width : '100%',
        height : '100%',
    },
    selectedImageStyle : {
        resizeMode : 'cover',
        width : '100%',
        height : '100%',
        borderRadius : 20,
    },
    changeImagePressable : {
        width : 40,
        height : 20,
        backgroundColor : 'transparent',
        borderRadius : 50,
        borderColor : '#fff',
        border : 2
    },
    changeImageText : {
        fontSize : 15,
        fontStyle : 'italic'
    }
})
