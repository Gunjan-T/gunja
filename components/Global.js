import NetInfo from "@react-native-community/netinfo";
import React from "react";
import {
    View,
    Text, StyleSheet, TextInput, Button, TouchableOpacity
} from 'react-native';
import { Component } from "react/cjs/react.production.min";


export default class Global extends Component {

    constructor(props) {
        super(props);
        this.state = {
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

    render() {

        return (
            <Enterpin data={this.state.connection_status} />
        )
    }

    static data = 'f';
}



export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    disable: {
        backgroundColor: 'lightblue',
        alignItems: 'center',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 15
    },

    touchableOpacity: {
        backgroundColor: 'blue',
        alignItems: 'center',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 15
    },

    touchableOpacityText: {
        color: 'darkgrey',
        fontSize: 23,
        textAlign: 'center',
        padding: 8
    },

    textInputStyle: {
        height: 45,
        width: '90%',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#00B8D4',
        borderRadius: 7,
        marginTop: 15,
    },
    tbcontainer: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#ffffff'
    },
    tbhead: {
        height: 55,
        backgroundColor: 'thistle'
    },
    tbtext: {
        textAlign: 'center',
        fontWeight: '200'
    },
    tbdataWrapper: {
        marginTop: -1
    },
    tbrow: {
        height: 50,
        backgroundColor: '#F7F8FA'
    },
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
        color: 'cyan',
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
        marginTop: 20
    },
    MainContainer1:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error:
    {
        color: 'red',
        fontSize: 15
    },
    dropdown:
    {
        height: 40,
        margin: 12,
        width: 300,
        borderColor: 'lightblue',
        borderWidth: 2,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        }
    },
    dt: {
        width: 300,
        borderColor: "lightblue",
        borderWidth: 2,
        height: 40,
        margin: 8,
        borderRadius: 12,
    }
});