import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Settings = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.userCircle}>
        <Feather name="user" size={80} color="#333" />
      </View>
      <View style={styles.options}>
        <Pressable style={styles.option}>
          <Feather name="settings" size={24} color="#333" style={styles.icon} />
          <Text style={styles.optionText}>Account Settings</Text>
        </Pressable>
        <Pressable style={styles.option}>
          <Feather name="bell" size={24} color="#333" style={styles.icon} />
          <Text style={styles.optionText}>Notifications</Text>
        </Pressable>
        <Pressable style={styles.option}>
          <Feather name="lock" size={24} color="#333" style={styles.icon} />
          <Text style={styles.optionText}>Privacy</Text>
        </Pressable>
        <Pressable style={styles.option}>
          <Feather name="globe" size={24} color="#333" style={styles.icon} />
          <Text style={styles.optionText}>Language</Text>
        </Pressable>
        <Pressable style={[styles.option, styles.logout]}>
          <Feather name="log-out" size={24} color="#fff" style={styles.icon} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  userCircle: {
    marginBottom: 20,
  },
  options: {
    width: '100%',
    alignItems: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logout: {
    backgroundColor: '#ec6a6d',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});

export default Settings;