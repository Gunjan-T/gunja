import React, { Component } from 'react';
import { ImageBackground } from 'react-native';
import {
    Platform, StyleSheet, View, Text,
    Image, TouchableOpacity, Alert
} from 'react-native';
// import { renderNode } from 'react-native-elements/dist/helpers';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

import bg from './img/bg.jpg';
import logo from './img/logos.jpg';
// var logo = require('./components/img/logos.jpg');
const Stack = createNativeStackNavigator();
export default class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: true,
        }
    }
    Hide_Splash_Screen = () => {
        this.setState({
            isVisible: false
        });
    }

    componentDidMount() {
        var that = this;
        setTimeout(function () {
            that.Hide_Splash_Screen();
        }, 3000);
    } 

   

    render() {
      
        let Splash_Screen = (
            <View style={styles.SplashScreen_RootView}>
                <ImageBackground
                    source={bg}
                    style={{ height: '100%', width: '100%' }}
                >
                    <View
                        style={styles.SplashScreen_ChildView}
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Image source={logo}
                            style={{ height: 100, width: 100 }}></Image>
                        <Text style={{ fontSize: 20 }}>Awesome</Text>
                    </View>
                </ImageBackground>
            </View>);
            
        return (
            <View style={styles.MainContainer}>
              {/* <Text style={{ fontSize: 20 }}>Awesome</Text> */}
                {
                    (this.state.isVisible === true) ? Splash_Screen :  this.props.navigation.navigate('Login')
                }

            </View>
        );
    }
}
const styles = StyleSheet.create(
    {
        MainContainer:
        {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: (Platform.OS === 'android') ? 20 : 0
        },

        SplashScreen_RootView:
        {
            justifyContent: 'center',
            flex: 1,
            // margin: 10,
            position: 'absolute',
            width: '100%',
            height: '100%',
        },

        SplashScreen_ChildView:
        {
            justifyContent: 'center',
            alignItems: 'center',
            //  backgroundColor: '#00BCD4',
            flex: 1,
        },
    });