import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const EventCard = ({ event, onRegister, onShowMap, onCancel }) => {
    return (
        <View style={styles.cardContainer}>
            <Image source={{ uri: `data:image/png;base64,${event.poster}` }} style={styles.posterImage} />
            <View style={styles.cardContent}>
                <Text style={styles.eventName}>{event.name}</Text>
                <Text style={styles.eventDescription}>{event.description}</Text>
                <View style={styles.detailContainer}>
                    <Feather name="user" size={24} color="#ec6a6d" style={styles.icon} />
                    <Text style={styles.organizerName}>Organizer: {event.organizer.username}</Text>
                </View>
                <View style={styles.detailContainer}>
                    <Feather name="tag" size={24} color="#ec6a6d" style={styles.icon} />
                    <Text style={styles.eventType}>Type: {event.type}</Text>
                </View>
                <View style={styles.detailContainer}>
                    <Feather name="calendar" size={24} color="#ec6a6d" style={styles.icon} />
                    <Text style={styles.eventDate}>Date: {event.date}</Text>
                </View>
                <View style={styles.detailContainer}>
                    <Feather name="map-pin" size={24} color="#ec6a6d" style={styles.icon} />
                    <Text style={styles.eventAddress}>Address: {event.address}</Text>
                </View>
                <View style={styles.detailContainer}>
                    <Feather name="dollar-sign" size={24} color="#ec6a6d" style={styles.icon} />
                    <Text style={styles.eventCredits}>Credits: {event.credits}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={onRegister}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={onShowMap}>
                        <Text style={styles.buttonText}>Show on Map</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={onCancel}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#ec6a6d',
        borderRadius: 15,
        margin: 10,
        padding: 10,
        elevation: 5,
        width: '90%',
        height: '80%',
    },
    detailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    icon: {
        marginRight: 5,
    },
    detail: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    eventCreatedText: {
        fontStyle: 'italic',
        fontSize: 18,
    },
    posterImage: {
        width: '100%',
        height: '50%',
        borderRadius: 10,
        objectFit: 'cover',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ec6a6d',
    },
    cardContent: {
        marginLeft: 10,
        flex: 1,
    },
    eventName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    eventDescription: {
        fontSize: 14,
        color: '#555',
    },
    eventType: {
        fontSize: 14,
        color: '#888',
    },
    eventDate: {
        fontSize: 14,
        color: '#888',
    },
    eventAddress: {
        fontSize: 14,
        color: '#888',
    },
    eventCredits: {
        fontSize: 14,
        color: '#888',
    },
    organizerName: {
        fontSize: 14,
        color: '#888',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#ec6a6d',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default EventCard;