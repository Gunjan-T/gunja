import NetInfo from "@react-native-community/netinfo";
import React from "react";
import {
    View,
    Text, TextInput, Button, StyleSheet, TouchableOpacity
} from 'react-native';
import { Component } from "react/cjs/react.production.min";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from "@react-native-firebase/firestore";


export default class Createpin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upin: "",
            err: "",
            connection_status: false,
            connection_type: null
        }
    }
    componentDidMount() {
        this.NetInfoSubscription = NetInfo.addEventListener(
            this._handleConnectivityChange,
        );
    }
    componentWillUnmount() {
        this.NetInfoSubscription && this.NetInfoSubscription();
    }
    _handleConnectivityChange = (state) => {
        this.setState({
            connection_status: state.isConnected,
            connection_type: state.type
        })
    }
    pinvalidate = (text) => {
        if (text.length != 4) {
            this.setState({ upin: text })
            this.setState({ err: "Enter valid 4 digit Pin" });
            return false;
        }
        else {
            this.setState({ upin: text })
            this.setState({ err: "" });
        }
    }
    create = async () => {
        console.log('create')
        const em = await AsyncStorage.getItem('email');
        this.props.navigation.navigate('CreatePin', { doc: em });
    }
    update = async () => {
        function getpin(documentSnapshot) {
            return documentSnapshot.get('pin')
        }
        var net = this.state.connection_status;
        //  console.log(this.state.connection_status);
        console.log('net:', net);
        if (this.state.connection_status == true) {
            const em = await AsyncStorage.getItem('email');

            firestore()
                .collection('emp')
                .doc(em)
                .get()
                .then(documentSnapshot => getpin(documentSnapshot))
                .then(async (pin) => {
                    if (this.state.upin == pin) {
                        alert('You are Online!');
                        // this.props.navigation.navigate('Dash')
                        this.props.navigation.navigate('Amark', { doc: net })
                    }
                    else {
                        alert('pass is wrong!' + pin);
                    }
                });
        } else {
            const value = await AsyncStorage.getItem('pin');
            if (this.state.upin === value) {
                alert('You are Offline!');
                this.props.navigation.navigate('Amark')
            } else if (this.state.upin === "") {
                alert('enter pin');
            } else if (this.state.upin !== value) {
                alert('Wrong pin:' + this.state.upin + "correct pin" + value);
            }
        }
    }
    render() {
        return (
            <View style={[styles.MainContainer]}>
                <Text style={{ fontSize: 30, color: 'purple' }}>EnterPin</Text>
                <Text style={{ color: 'green' }}>
                    Connection Status:{this.state.connection_status ? 'connected' : 'Disconnected'}
                </Text>
                {/* <Text>
                    Connection Status:{this.state.connection_type}
                </Text> */}
                <TextInput
                    style={[styles.inputbox]}
                    placeholder="Enter Pin"
                    keyboardType="numeric"
                    maxLength={4}
                    onChangeText={(text) => this.pinvalidate(text)}
                    value={this.state.upin}
                >
                </TextInput>
                <Text style={[styles.red]}>{this.state.err}</Text>

                <Button title='Enter Pin' onPress={this.update} />
                <TouchableOpacity
                    onPress={this.create}>

                    <Text style={styles.text1}>Forgot pin</Text>
                </TouchableOpacity>

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
        textAlign: 'right',
        color: 'blue',
        fontSize: 16
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