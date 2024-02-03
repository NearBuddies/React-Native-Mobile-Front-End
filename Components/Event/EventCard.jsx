import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { makeBase64Image } from '../Common/Services/ImagesService';
import { Feather } from '@expo/vector-icons';

const EventCard = ({ event, onRegister, onShowMap, onCancel }) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: makeBase64Image(event.poster)}} style={styles.posterImage} />
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
        </View><View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonShow} onPress={onShowMap}>
            <Text style={styles.buttonTextShow  }>Show on Map</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCancel} onPress={onCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 15,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 5,
  },
  posterImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ec6a6d',
  },
  cardContent: {
    flexDirection: 'column',
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
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
    marginHorizontal: 10,
  },
  buttonShow: {
  backgroundColor: '#fff',
  borderColor: '#ec6a6d',
  borderWidth: 2,
  padding: 10,
  borderRadius: 5,
  flex: 1,
  alignItems: 'center',
  marginHorizontal: 10,
  },
  buttonTextShow: {
    color: '#ec6a6d',
    textAlign: 'center',
  },
  buttonCancel: {
  backgroundColor: '#ccc',
  padding: 10,
  borderRadius: 5,
  flex: 1,
  alignItems: 'center',
  marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default EventCard;