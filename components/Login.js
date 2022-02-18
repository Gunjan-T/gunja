import React, { useState } from "react";
import {
    View, TouchableOpacity,
    Text, StyleSheet, TextInput, Button,StatusBar
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from "@react-native-firebase/firestore";
import { Component } from "react/cjs/react.production.min";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            err: "",
        }
    }

    onClick = () => {
        var em = this.state.email
        function getpassword(documentSnapshot) {
            return documentSnapshot.get('password')
            //  return documentSnapshot.get('pin')
        }
        function getpin(documentSnapshot) {
            return documentSnapshot.get('pin')
        }
        let password = "";
        firestore()
            .collection('emp')
            .doc(em)
            .get()
            .then(documentSnapshot => getpassword(documentSnapshot))
            .then(async (password) => {
                if (!password) {
                    this.setState({ err: 'Enter valid email or password' });
                    //   console.log('Enter valid email or password');
                }
                else if (password == this.state.password) {
                    console.log('Welcome');
                    firestore()
                    .collection('emp')
                    .doc(em)
                    .get() 
                    .then(documentSnapshot => getpin(documentSnapshot))
                    .then(async (pin) => {
                        this.setState({ err: ""});
                        const value = await AsyncStorage.getItem('pin');
                        if (!pin || !value ) {
                          // console.log('pinerror',pin);
                          console.log('pin from Fire',pin);
                           this.props.navigation.navigate('CreatePin', { doc: em });
                        }else{
                         
                            const value = await AsyncStorage.getItem('pin');
                            console.log('value',value);
                            this.props.navigation.navigate('EnterPin', { doc: value });
                        }
                    });
                }
                else {

                    this.setState({ err: 'Wrong password' });
                }
            }).catch((errors) => {
                alert('Something went wrong' + errors);
            });
    }

    render() {
        return (
            <View style={[styles.MainContainer]}>
                  <StatusBar backgroundColor='purple'/>
                <Text style={[styles.fonts, styles.other]}>Login</Text>
                <Text style={[styles.error]}>{this.state.err}</Text>
                <TextInput
                    style={[styles.inputbox]}
                    placeholder="Enter Email"
                    onChangeText={(data) => this.setState({ email: data })}
                >
                </TextInput>
                <TextInput
                    style={[styles.inputbox]}
                    secureTextEntry={true}
                    placeholder="Enter Password"
                    value= {this.state.password}
                    onChangeText={(data) => this.setState({ password: data })}
                    
                >
                </TextInput>
                <Button title='Login' onPress={this.onClick} />
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Signup')}>
                    <Text style={styles.text2}>Don't have an account..!
                        <Text style={styles.text1}>Go to Signup</Text></Text>
                </TouchableOpacity>
            </View>
        );
    }
}


export default Login;
const styles = StyleSheet.create({
    colors: {
        color: 'red',
        backgroundColor: 'green'
    },
    fonts: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    other: {
        color: 'purple'
    },
    inputbox: {
        height: 40,
        margin: 12,
        borderColor: 'lightblue',
        borderWidth: 2,
        padding: 10,
        width: 300,
        borderRadius: 12,
    },
    text1:
    {
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'blue',
        fontSize: 20
    },
    text2:
    {
        textAlign: 'center',
        fontSize: 15
    },
    MainContainer:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    error:
    {
        color: 'red',
        fontSize: 15
    }

})
