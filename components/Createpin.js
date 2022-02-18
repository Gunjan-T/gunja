import React from "react";
import {
    View,
    Text, StyleSheet, TextInput, Button, TouchableOpacity
} from 'react-native';
import { Component } from "react/cjs/react.production.min";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firestore from "@react-native-firebase/firestore";
import { thisExpression } from "@babel/types";

export default class Createpin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pin: "",
            cpin: "",
            err: "",
            cpinerr: ""
        }
    }
    logout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Login');
    }
    pinvalidate = (text) => {
        if (text.length != 4) {
            this.setState({ pin: text })
            this.setState({ err: "Enter valid 4 digit Pin" });
            return false;
        }
        else {
            this.setState({ pin: text })
            this.setState({ err: "" });
        }
    }
    cnfvalidate = (text) => {
        if (this.state.pin != text) {
            this.setState({ cpin: text })
            this.setState({ cpinerr: "Pin does not match" });
        } else {
            this.setState({ cpin: text })
            this.setState({ cpinerr: "" })
        }
    }
    update = () => {
        if (this.state.pin != "" || this.state.cpin != "") {
            if (this.state.err == "" && this.state.cpinerr == "") {
                firestore()
                    .collection('emp')
                    .doc(this.props.route.params.doc)
                    .update({
                        pin: this.state.pin
                    })
                    .then(async () => {
                        try {
                            await AsyncStorage.setItem(
                                'pin', this.state.pin)
                            await AsyncStorage.setItem('email', this.props.route.params.doc);
                            console.log('User updated asyncstorage!');
                        }
                        catch (error) {
                            // Error saving data
                        }
                        const value = await AsyncStorage.getItem('pin');
                      //  console.log(value);
                        this.props.navigation.navigate('EnterPin', { doc: value });
                        console.log('User updated!');
                        alert('Pin succesfully Set');
                    });
                this.props.navigation.navigate('EnterPin');
            }
        }
        else {
            this.setState({ err: "Required" })
            this.setState({ cpinerr: "Required" })
        }
    }
    render() {
        return (
            <View style={[styles.MainContainer]}>
             
                <Text style={[styles.text]}>Welcome {this.props.route.params.doc}</Text>

                <TextInput
                    style={[styles.inputbox]}
                    placeholder="Enter new Pin"
                    keyboardType="numeric"
                    maxLength={4}
                    onChangeText={(text) => this.pinvalidate(text)}
                >
                </TextInput>
                <Text style={[styles.red]}>{this.state.err}</Text>
                <TextInput
                    style={[styles.inputbox]}
                    placeholder="Confirm Pin"
                    keyboardType="numeric"
                    maxLength={4}
                    onChangeText={(text) => this.cnfvalidate(text)}
                >
                </TextInput>
                <Text style={[styles.red]}>{this.state.cpinerr}</Text>

                <Button title='Create Pin' onPress={this.update} />

            </View>
        );
    }
}
const styles = StyleSheet.create({
    MainContainer:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    text:
    {
        fontWeight: 'bold',
        fontSize: 20
    },
    text1:
    {
        textAlign: 'right'
    },
    inputbox: {
        height: 40,
        margin: 12,
        borderColor: 'lightblue',
        borderWidth: 2,
        padding: 10,
        width: 300,
        borderRadius: 12
    },
    red: {
        color: 'red',
    }
})