import NetInfo from "@react-native-community/netinfo";

import React, { Component } from 'react';
import {
    Platform, StyleSheet, View, Text,
    Image, TouchableOpacity, Alert, Button,StatusBar
} from 'react-native';

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Splash from './components/Splash';
import Login from './components/Login';
import Signup from './components/Signup';

import Createpin from './components/Createpin';
import Enterpin from './components/Enterpin';

import Amark from "./components/Amark";


const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
             
            <Stack.Screen name="Splash" component={Splash} 
                  options={{
                    headerShown: false
                  }}
                />

                {/* <Stack.Screen name="Splash" component={Splash} /> */}
                <Stack.Screen name="Login" component={Login}  options={{ headerShown: false}}/>
                <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false}} />
                
                <Stack.Screen name="CreatePin" component={Createpin} options={{ headerShown: false}}/>
                <Stack.Screen name="EnterPin" component={Enterpin} options={{ headerShown: false}} />
                <Stack.Screen name="Amark" component={Amark} options={{headerShown: false }} />
               
            </Stack.Navigator>
        </NavigationContainer>
    )
}
const styles = StyleSheet.create(
    {
        MainContainer:
        {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: "wrap",
            paddingTop: (Platform.OS === 'ios') ? 10 : 0
            
        },
        text1:
        {
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'cyan',
            fontSize: 20
        },
        text2:
        {
            textAlign: 'center',
            fontSize: 15
        }
    });