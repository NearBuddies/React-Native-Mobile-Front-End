import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const CreditsConverterPage = ({ visible, onClose, onBuy }) => {
  const [dollars, setDollars] = useState('');
  const [credits, setCredits] = useState('');

  // Use useNavigation hook to get the navigation prop
  const navigation = useNavigation();

  const convertToCredits = () => {
    const dollarValue = parseFloat(dollars);
    if (!isNaN(dollarValue)) {
      setCredits(dollarValue.toFixed(2));
    } else {
      setCredits('');
    }
  };

  const handleBuy = () => {
    if (credits !== '') {
      onBuy(parseFloat(credits));
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Buy Credits</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Dollars"
            keyboardType="numeric"
            value={dollars}
            onChangeText={(text) => setDollars(text)}
          />
          <Pressable style={styles.convertButton} onPress={convertToCredits}>
            <Text style={styles.convertButtonText}>Convert</Text>
          </Pressable>
          <Text style={styles.result}>Credits: {credits}</Text>
          <Pressable style={styles.buyButton} onPress={handleBuy}>
            <Text style={styles.buyButtonText}>Buy</Text>
          </Pressable>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
  convertButton: {
    backgroundColor: '#ec6a6d',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  convertButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  result: {
    fontSize: 16,
    marginBottom: 10,
  },
  buyButton: {
    backgroundColor: '#ec6a6d',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export  {CreditsConverterPage};