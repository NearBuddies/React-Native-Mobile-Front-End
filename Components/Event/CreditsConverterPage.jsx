import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { addCredits } from '../User/Services/UserService';
import { getCredits } from '../Authentication/Services/AuthenticationService';

const CreditsConverterPage = ({ navigation }) => {
  const [dollars, setDollars] = useState('');
  const [credits, setCredits] = useState('');
  const [currentCredits, setCurrentCredits] = useState(0);
  const [user_id, setUser_id] = useState('');

  const transactionHistory = [
    { date: '2024-03-01', amount: 50.00, motif: 'Registration' },
    { date: '2024-03-02', amount: 25.00, motif: 'Registration' },
    { date: '2024-03-03', amount: 10.00, motif: 'Subscription' },
  ];

  const useGetCredits = async () => {
    try {
      // Get the username and the password
      const username = await AsyncStorage.getItem("username");
      const password = await AsyncStorage.getItem("password");
      const the_credits = await getCredits(username,password)
    } catch (error) {
      console.error("Error authenticating user:", error);
    }
  };

  const fetchData = async () => {
    try {
      const user_id = await AsyncStorage.getItem('user_id');
      // Get the username and the password
      const username = await AsyncStorage.getItem("username");
      const password = await AsyncStorage.getItem("password");
      
      const the_credits = await getCredits(username,password)

      // const credits = await AsyncStorage.getItem('credits');
      setUser_id(user_id);
      setCurrentCredits(parseFloat(the_credits) || 0);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Use useFocusEffect to refetch data when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  console.log('user: ' + user_id + ' current credits: ' + currentCredits);

  const convertToCredits = () => {
    const dollarValue = parseFloat(dollars);
    if (!isNaN(dollarValue)) {
      setCredits(dollarValue.toFixed(2));
    } else {
      setCredits('');
    }
  };

  const addCreditsandRefresh = async () => {
    try {
      const user_id = await AsyncStorage.getItem('user_id');
      const user = await addCredits(user_id, credits);
      await fetchData();

      if (user) {
        await AsyncStorage.setItem('credits', user.credits.toString());
        setCurrentCredits(user.credits);
      }
    } catch (error) {
      console.error('Error adding credits and refreshing:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buy Credits</Text>
      <Text style={styles.currentCredits}>Current Credits: {currentCredits}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Dollars"
        keyboardType="numeric"
        value={dollars}
        onChangeText={(text) => setDollars(text)}
      />
      <Pressable style={styles.convertButton} onPress={convertToCredits}>
        <Feather name="arrow-right" size={24} color="#fff" />
      </Pressable>
      <Text style={styles.result}>Credits: {credits}</Text>
      <Pressable style={styles.buyButton} onPress={addCreditsandRefresh}>
        <Feather name="shopping-cart" size={24} color="#fff" />
      </Pressable>
      <Pressable style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Feather name="x" size={24} color="#000" />
      </Pressable>

       {/* Transaction History */}
       <View style={styles.transactionHistoryContainer}>
        <Text style={styles.transactionHistoryTitle}>Transaction History</Text>
        {transactionHistory.map((transaction, index) => (
          <View key={index} style={styles.transactionItem}>
            <Text>{transaction.date}</Text>
            <Text>${transaction.amount}</Text>
            <Text>{transaction.motif}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch', // Change 'center' to 'stretch'
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  currentCredits: {
    fontSize: 16,
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
  closeButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  transactionHistoryContainer: {
    marginTop: 20,
  },
  transactionHistoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginVertical: 5,
  },
});

export default CreditsConverterPage;