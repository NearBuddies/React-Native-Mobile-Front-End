import React, { useState, useEffect } from 'react';
import { Button, Pressable, StyleSheet, Text, View, TextInput, Image, Alert, TouchableOpacity, Dimensions, } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import Modal from "react-native-modal";
import { getDistance } from 'geolib';
import Geocoder from 'react-native-geocoding';
import { GOOGLE_MAPS_APIKEY } from '../../Variables';
import DateTimePickerModal from "react-native-modal-datetime-picker";
export default function NewEvent({

}) {

    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [locationAddress, setLocationAddress] = useState('');
    const [currentLocation, setCurrentLocation] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const communityCeneter = {
        latitude: 33.70148331198053,
        longitude: -7.362316735088825,
    }

    const pickImage = async () => {
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
    const repickImage = async () => {
        setImage(null)
        pickImage();
    }
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const calculateDistance = (coord1, coord2) => {
        return getDistance(coord1, coord2);
    };

    Geocoder.init(GOOGLE_MAPS_APIKEY);
    const handleMapPress = async (event) => {
        const selectedCoords = event.nativeEvent.coordinate;
        const distance = calculateDistance(communityCeneter, selectedCoords);
        if (distance > 30000) {
            Alert.alert('Invalid Location', 'Selected location is too far from your community. Please choose a location within 30 kilometers.');
        } else {
            setSelectedLocation(selectedCoords);

            try {
                const locationDetails = await Geocoder.from(selectedCoords.latitude, selectedCoords.longitude);
                const address = locationDetails.results[0].formatted_address;
                setLocationAddress(address);
            } catch (error) {
                console.warn(error);
            }
        }
    };

    const handlePoiClick = async (event) => {
        const { placeId, name, coordinate } = event.nativeEvent;
        console.log('POI Clicked - Place ID:', placeId, 'Name:', name, 'Coordinate:', coordinate);
        setSelectedLocation(coordinate);
        try {
            const locationDetails = await Geocoder.from(selectedCoords.latitude, selectedCoords.longitude);
            const address = locationDetails.results[0].formatted_address;
            setLocationAddress(address);
        } catch (error) {
            console.warn(error);
        }
    };

    const handleLocationConfirmation = () => {
        console.log("Selected Location:", selectedLocation);
        console.log("Adress:", locationAddress);
        toggleModal();
    };

    useEffect(() => {
        const getLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("Permission to access location was denied");
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setCurrentLocation(location.coords);
            setInitialRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        };
        getLocation();
        const reverseGeocodeLocation = async () => {
            const { latitude, longitude } = selectedLocation;
            const results = await Location.reverseGeocodeAsync({ latitude, longitude });
            console.log(`Reverse Geocoded Address: ${results[0]}`);
        };
        reverseGeocodeLocation();
    }, []);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.log("A date has been picked: ", date);
        setSelectedDate(date.toISOString());
        hideDatePicker();
    };

    return (
        <View style={styles.parentView}>
            <View style={styles.titlesView}>
                <Image source={require("../../assets/images/NearBuddies_logo.jpg")}
                    style={styles.titlesImage}
                />
                <Text style={styles.createCommunityOrEventTextStyle}>New Event</Text>
            </View>
            <Text style={styles.enhanceNewCommunityOrEventTextStyle}>Meet your community and earn credits!</Text>
            <View style={styles.centralView}>
                <View style={styles.inputView}>
                    <Pressable>
                        <Feather name="type" size={24} color="#ec6a6d" style={styles.inputIcons} />
                    </Pressable>
                    <TextInput style={styles.inputTextInput} placeholder="Title" />
                </View>
                <View style={styles.inputView}>
                    <Pressable>
                        <Feather name="align-justify" size={24} color="#ec6a6d" style={styles.inputIcons} />
                    </Pressable>
                    <TextInput style={styles.inputTextInput} placeholder="Description" />
                </View>
                <View style={styles.inputView}>
                    <Pressable onPress={toggleModal}>
                        <Feather name="map-pin" size={24} color="#ec6a6d" style={styles.inputIcons} />
                    </Pressable>
                    <TextInput style={styles.inputTextInput} placeholder="Location" value={locationAddress} />
                    <Modal isVisible={isModalVisible}>
                        <View style={{ flex: 1 }}>
                            <MapView
                                style={{ height: '40%' }}
                                provider={PROVIDER_GOOGLE}
                                initialRegion={initialRegion}
                                showsUserLocation
                                showsMyLocationButton
                                onPress={handleMapPress}
                                zoomEnabled={true}
                                minZoomLevel={2}
                                scrollEnabled={true}
                                showsScale={true}
                                zoomControlEnabled={true}
                                zoomTapEnabled={true}
                                onPoiClick={handlePoiClick}
                            >
                                <Marker coordinate={communityCeneter} title="Community Center">
                                    <View
                                        style={{
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        <Feather name="radio" size={30} color="black" />
                                        <Text style={{ fontWeight: "800" }}>Community Center</Text>
                                    </View>
                                </Marker>
                                <Circle
                                    center={communityCeneter}
                                    radius={30000}
                                    strokeWidth={1}
                                    strokeColor='rgba(255,0,0,0.2)'
                                    fillColor='rgba(237,106,109,0.2)'
                                />
                                {selectedLocation ? (
                                    <Marker draggable coordinate={selectedLocation} title="Selected Location" />
                                ) : (
                                    currentLocation && (
                                        <Marker
                                            coordinate={{
                                                latitude: currentLocation.latitude,
                                                longitude: currentLocation.longitude,
                                            }}
                                            title="Your are here"
                                        />
                                    )
                                )}
                            </MapView>
                            <Button title="Confirm Location" onPress={handleLocationConfirmation} />
                        </View>
                    </Modal>
                </View>
                <View style={styles.inputView}>
                    <Pressable onPress={showDatePicker}>
                        <Feather name="calendar" size={24} color="#ec6a6d" style={styles.inputIcons} />
                    </Pressable>
                    <TextInput style={styles.inputTextInput} placeholder="Date" value={selectedDate ? new Date(selectedDate).toLocaleDateString() : ''} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                </View>
                <View style={styles.uploadImageView}>
                    {
                        !image
                        &&
                        <Pressable style={styles.uploadImagePressable} onPress={pickImage}>
                            <Feather name="image" size={24} color="#ec6a6d" />
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

            <Pressable style={styles.signInPressable} onPress={() => { Alert.alert("You pressed") }}>
                <View >
                    <Text style={styles.signInButtonStyle}>Create Event</Text>
                </View>
            </Pressable>
        </View>
    );
}


const styles = StyleSheet.create({
    parentView: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    titlesView: {
        backgroundColor: "#fff",
        width: 200,
        height: 50,
        marginVertical: 60,
        justifyContent: "space-evenly"
    },
    titlesImage: {
        width: 200,
        height: 80,
        objectFit: "contain",
        marginVertical: 50
    },
    createCommunityOrEventTextStyle: {
        fontWeight: "100",
        marginVertical: 30,
        marginLeft: '30%',
        fontSize: 20,
        fontWeight: "bold",
        color: '#ec6a6d',
        height: 60,
        marginTop: 50
    },
    enhanceNewCommunityOrEventTextStyle: {
        fontStyle: "italic",
        fontSize: 15,
        marginTop: 20,
        marginLeft: 10,
        marginTop: 20,
    },
    centralView: {
        display: "flex",
        flexDirection: "column",
        height: '60%',
        width: 350,
        marginTop: 5,
        borderRadius: 40,
        backgroundColor: "#d6e8ff",
    },
    inputView: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: 20,
        height: 50,
        width: '90%',
        borderRadius: 15,

    },
    inputPressable: {
        width: 50,
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 15
    },
    inputPressableEnd: {
        width: 60,
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 15,
        marginLeft: "auto",
    },
    inputIcons: {
        marginHorizontal: 10,
        //objectFit: "contain"
    },
    inputTextInput: {
        flex: 1,
        marginHorizontal: 10,
        height: 40,
        fontSize: 15
    },
    signInPressable: {
        marginTop: 50,
        backgroundColor: "#ec6a6d",
        height: 40,
        width: "90%",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    signInButtonStyle: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#fff"
    },
    bottomView: {
        width: "90%",
        marginLeft: "25%",
        display: "flex",
        flexDirection: "row",
        marginTop: 50
    },
    haveAccount: {
        fontSize: 15,
        fontWeight: "bold"
    },
    connectAccount: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#ec6a6d"
    },
    uploadImageView: {
        backgroundColor: '#fff',
        width: '90%',
        height: '40%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        borderRadius: 20,
        // borderStyle : 'dashed',
        // borderWidth :2,
        borderColor: '#b4a8a5',
        marginTop: '5%',
    },
    uploadImageText: {
        marginTop: '5%',
        fontSize: 20,
        color: '#b4a8a5',
        fontWeight: 'bold'
    },
    uploadImagePressable: {
        backgroundColor: '#fff',
        display: 'flex',
        height: 40,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: '5%'
    },
    uploadImageIcon: {
        //objectFit : 'contain',
    },
    selectedImageView: {
        width: '100%',
        height: '100%',
    },
    selectedImageStyle: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    changeImagePressable: {
        width: 40,
        height: 20,
        backgroundColor: 'transparent',
        borderRadius: 50,
        borderColor: '#fff',
        border: 2
    },
    changeImageText: {
        fontSize: 15,
        fontStyle: 'italic'
    }
})