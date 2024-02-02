import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AddCreditsPage = () => {
    const navigation = useNavigation();

    const toCreditsConverter = () => {
      navigation.navigate('CreditsConverterPage');
    };
  
    return (
      <View style={styles.container}>
        <Pressable style={styles.RegisterPressable} onPress={()=> toCreditsConverter()}>
          <Text style={styles.RegisterStyle}>Add Credits</Text>
        </Pressable>
      </View>
    );
  };
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    RegisterPressable: {
        backgroundColor: "#ec6a6d",
        height: 40,
        width: "90%",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    RegisterStyle: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#fff"
    },
});

export default AddCreditsPage;