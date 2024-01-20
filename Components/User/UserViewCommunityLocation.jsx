import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert, ToastAndroid } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import axios from 'axios';
import { io } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { rootAddress } from '../../Variables';
import { GOOGLE_MAPS_APIKEY } from '../../Variables';
import CustomAppBar from '../Common/CustomAppBar';

function UserViewCommunityLocation({ route }) {
    
    console.log("Route params are :" + JSON.stringify(route.params));
    
    const navigation = useNavigation();

    // Define user position 
    const [userPosition, setUserPosition] = useState({
        latitude: 0,
        longitude: 0,
    });

    // Get community position 
    const [communityPosition, setCommunityPosition] = useState({
        latitude: 33.0000124,
        longitude: -7.001114,
    });

    // Get the distance between them
    const [distance, setDistance] = useState(1000);

    
    const [isPermissionRequested, setIsPermissionRequested] = useState(false);
    const [positionCalculated, setPositionCalculated] = useState(false);

    const [address, setAddress] = useState('');
    
    const requestLocationPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
        setIsPermissionRequested(true);
        const location = await Location.getCurrentPositionAsync({});
        const newlatitude = location.coords.latitude;
        const newlongitude = location.coords.longitude;
        setUserPosition({ latitude: newlatitude, longitude: newlongitude });
        } else {
        console.log("L'autorisation de géolocalisation a été refusée");
        }
    };

    const setActualUserPosition = useCallback(async () => {
        try {
        const location = await Location.getCurrentPositionAsync({});
        const newlatitude = location.coords.latitude;
        const newlongitude = location.coords.longitude;
        setUserPosition({ latitude: newlatitude, longitude: newlongitude });
        setPositionCalculated(true);
        } catch (error) {
        console.log(error); 
        }
    }, []);

    // Ask permission, generally at first launch
    useEffect(() => {
        requestLocationPermission();
    }, []);

    useEffect(() => {
        setActualUserPosition();
    }, [setActualUserPosition]);

    useEffect(() => {
        // Start tracking the user location
        const startTrackingUserLocation = () => {
        Location.watchPositionAsync(
            {
            // Tracking options
            accuracy: Location.Accuracy.Highest,
            distanceInterval: 10,
            timeInterval: 1000
            },
            (location) => {
            const newLatitude = location.coords.latitude;
            const newLongitude = location.coords.longitude;
            setUserPosition({ latitude: newLatitude, longitude: newLongitude });
            console.log("I'm emitting")
            /*socket.emit('postcitizenlocation', {
                entity_id: 1,
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
            socket.once('postcitizenlocation', (response) => {
                console.log("User current stored location identifier is "+response.locationidentifier);
            });*/
            }
        );
        };
        startTrackingUserLocation();
        // Cleanup function
        return () => {};
    }, []);


  return (
    <View style={styles.container}>
        <CustomAppBar/>
      {positionCalculated ? (
        <MapView
        style={styles.map}
        initialRegion={{
          latitude: userPosition.latitude,
          longitude: userPosition.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        >
        <Marker
          coordinate={{
            latitude: userPosition.latitude,
            longitude: userPosition.longitude,
          }}
          title="Votre position"
          description="Vous êtes ici"
        />
        {communityPosition.latitude !== 0 && communityPosition.longitude !== 0 && (
          <>
            <MapViewDirections
              origin={userPosition}
              destination={{
                latitude: communityPosition.latitude,
                longitude: communityPosition.longitude,
              }}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="#CB4335"
            />
            <Marker
              coordinate={{
                latitude: communityPosition.latitude,
                longitude: communityPosition.longitude,
              }}
              title="Position de la communauté"
              description="Position de la communauté"
              pinColor="green"
            />  
                  
          </>
          
          
        )}
         
      </MapView>
      
    ) : (
      <Text style = {styles.mapChargingText}>Chargement de la position...Veuillez patienter</Text>
    )}  
    <TouchableOpacity style={styles.showDistanceView}>
      <Text style={styles.showDistanceText}>{distance} meters</Text>
    </TouchableOpacity> 
  </View>
);
};

const styles = StyleSheet.create({
container: {
  //height: Dimensions.get('window').height,
  //width: Dimensions.get('window').width,
  // marginBottom: Dimensions.get('window').height * 0.1,
  display : "flex",
  flex: 1,
  backgroundColor: '#fff',
  position: 'relative',
},
map: {
  flex: 1,
},
addButton: {
  position: 'absolute',
  bottom: 10,
  right: 20,
  backgroundColor: 'red',
  padding: 10,
  borderRadius: 10,
  marginBottom: 35
},
addButtonText: {
  color: 'white',
  fontWeight: 'bold',
},
solveButton: {
  position: 'absolute',
  bottom: 10,
  right: 100,
  backgroundColor: 'green',
  padding: 10,
  borderRadius: 10,
  marginBottom: 35
},
solveButtonText: {
  color: 'white',
  fontWeight: 'bold',
},
modal: {
  justifyContent: 'center',
  alignItems: 'center',
},
formContainer: {
  backgroundColor: 'white',
  padding: 20,
  borderRadius: 10,
  height: 500,
},
modalTitle: {
  fontSize: 25,
  fontWeight: 'bold',
  color: '#CB4335',
},
input: {
  borderWidth: 1,
  borderColor: 'gray',
  marginVertical: 10,
  padding: 10,
  borderRadius: 5,
  width: 300,
},
sendButton: {
  backgroundColor: 'blue',
  padding: 10,
  borderRadius: 5,
  alignItems: 'center',
  marginTop: 'auto',
},
sendButtonText: {
  color: 'white',
  fontWeight: 'bold',
},
mapChargingText : {
  fontSize: 15,
  fontWeight : 'bold',
  fontFamily : 'italic',
  fontStyle : 'italic'
},
showDistanceView : {
  position : 'absolute',
  bottom : 0,
  display : "flex",
  flexDirection : "row",
  justifyContent : "center",
  alignItems : "center",
  borderRadius : 10,
  backgroundColor : '#ec6a6d',
  width : '90%',
  height : '7%',
  marginLeft: '5%',
  marginBottom : '2%'
},
showDistanceText : {
  fontSize: 20,
  fontWeight : 'bold',
  fontStyle : 'italic',
  color : "#fff"
}
});

export default UserViewCommunityLocation;