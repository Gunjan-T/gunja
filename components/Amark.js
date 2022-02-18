import { styles } from './Global';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, ScrollView, Text, PermissionsAndroid, Button, View, StyleSheet, Alert, Picker, TouchableOpacity, StatusBar, TextInput } from 'react-native';

const Amark = ({ route, navigation }) => {

  
    var timestemp = new Date();
    var today = JSON.stringify(timestemp.getDate()) + JSON.stringify(timestemp.getMonth() + 1) + JSON.stringify(timestemp.getFullYear());
 const logout = async () => {
        AsyncStorage.removeItem('pin');
        alert('You have been logged out');
        navigation.navigate('Login');
    }
   
    return (
        <SafeAreaView style={{ flex: 1 }}>
  <TouchableOpacity
                    style={[styles.touchableOpacity, { backgroundColor: 'red' }]}
                    onPress={logout}>
                    <Text style={styles.touchableOpacityText}> Logout </Text>
                </TouchableOpacity>
        <View style={{flex:1,justifyContent:'center'}}>
            <Text style={{textAlign:'center'}}>Welcome</Text>
            </View>
        </SafeAreaView>
    );
};
export default Amark;
