import React from "react";
import {
    View, TouchableOpacity,
    Text, StyleSheet, TextInput, Button
} from 'react-native';
import { Component } from "react/cjs/react.production.min";
import firestore from "@react-native-firebase/firestore";
import database from '@react-native-firebase/database';
// import RadioGroup from "react-native-radio-button-group";
import { RadioButton } from 'react-native-paper';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            gender: "",
            username: "",
            password: "",
            mobile: "",
            nameErr: "",
            emailErr: "",
            passErr: "",
            mobileErr: "",
            err: "",
            isExist: "",
            rg: ""
        }
    }
    namevalidate = (text) => {
        let reg = /^[a-zA-z ]*$/;
        if (reg.test(text) === false) {
            this.setState({ name: text })
            this.setState({ nameErr: "Name field should contain alphabetic value" })
            return false
        }
        else {
            this.setState({ name: text })
            this.setState({ nameErr: "" })
        }
    }
    passvalidate = (text) => {
        let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        if (reg.test(text) === false) {
            this.setState({ password: text })
            this.setState({ passErr: "Password must be 8 char long, 1 character, 1 capital letter and atleast 1 number" })
            return false;
        }
        else {
            this.setState({ password: text })
            this.setState({ passErr: "" })
        }
    }
    emailvalidate = (text) => {
        //console.log(text);
        firestore()
            .collection('emp')
            .doc(text)
            .get()
            .then(documentSnapshot => {
                // console.log('User exists: ', documentSnapshot.exists);
                if (documentSnapshot.exists) {
                    //  console.log('User data: ', documentSnapshot.data());
                    this.setState({ emailErr: "Email already exist" })
                }
            }).catch((errors) => {
                alert('Something went wrong email'+errors);
            });
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            // console.log("Email is Not Correct");
            this.setState({ email: text })
            this.setState({ emailErr: "Enter valid email Id" })
            return false;
        }
        else {
            this.setState({ email: text })
            this.setState({ emailErr: "" })
            // console.log("Email is Correct");
        }
    }
    mobilevalidate = (text) => {
        //console.log(text);
        //let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (text.length != 10) {
            // console.log("Email is Not Correct");
            this.setState({ mobile: text })
            this.setState({ mobileErr: "Enter valid 10 digit mobile number" });
            return false;
        }
        else {
            this.setState({ mobile: text })
            this.setState({ mobileErr: "" });
            // console.log("Email is Correct");
        }
    }
    onClick = () => {
        let name = this.state.name,
            email = this.state.email,
            gender = this.state.gender,
            username = this.state.username,
            password = this.state.password,
            mobile = this.state.mobile;
        if (name == "" && email == "" && gender == "" && username == "" && password == "" && mobile == "") {
            this.setState({ err: "All field are required" });
        }
        // if (name != "" && email != "" && gender != "" && username != "" && password != "" && mobile != "") {
        else if (name != "" && email != "" && gender != "" && username != "" && password != "" && mobile != "") {
            this.setState({ err: "" });
            if (this.state.emailErr == "" && this.state.nameErr == "" && this.state.mobileErr == "" && this.state.passErr == "") {
                firestore().collection('emp')
                    .doc(this.state.email)
                    .set({
                        name: name,
                        email: email,
                        gender: gender,
                        username: username,
                        password: password,
                        mobile: mobile,
                        createdAt: firestore.FieldValue.serverTimestamp(),
                    }).then(() => {
                        console.log('finally User Added Successfully..');
                        alert('SignUp Successfull Now you can login');
                        this.props.navigation.navigate('Login');
                    }).catch((errors) => {
                        console.log('Error', errors);
                        alert('Something went wrong while Signup', errors);
                    });
                database().ref('gfgd')
                    .push({
                        name: name,
                        email: email,
                        gender: gender,
                        username: username,
                        password: password,
                        mobile: mobile
                    }).then(() => console.log('Data updated successfully in RealtimeDB.')).
                    catch((errors) => {
                        alert('Something went wrong while RDB Signup', errors);
                    });
            }
        }
        else {
            this.setState({ err: "Some fields are Empty" });
        }
    }

    render() {
        return (
            <View style={[styles.MainContainer]}>
                <Text style={[styles.fonts, styles.other]}>SignUp</Text>
                <Text style={[styles.error]} >{this.state.err}</Text>
                <TextInput
                    style={[styles.inputbox]}
                    placeholder="Enter Name"
                    onChangeText={(text) => this.namevalidate(text)}
                >
                </TextInput>
                <Text style={[styles.error]}>{this.state.nameErr}</Text>
                <TextInput
                    style={[styles.inputbox]}
                    placeholder="Enter Email"
                    onChangeText={(text) => this.emailvalidate(text)}
                >
                </TextInput>
                <Text style={[styles.error]}>{this.state.emailErr}</Text>
                <RadioButton.Group onValueChange={(newValue) => this.setState({ gender: newValue })} value={this.state.gender}>
                    <View style={{
                        flexDirection: 'row', alignItems: 'baseline', borderColor: 'lightblue',
                        height: 40,
                        borderWidth: 2,
                        padding: 0,
                        width: 370,
                        borderRadius: 12,

                    }}>
                        <Text style={{ fontSize: 15, alignItems: "baseline" }}>Gender:</Text>
                        <RadioButton value="female" />
                        <Text>Female</Text>
                        <RadioButton value="male" />
                        <Text>Male</Text>
                    </View>
                </RadioButton.Group>

                <Text >{ }</Text>
                <TextInput
                    style={[styles.inputbox]}
                    placeholder="Enter Username"
                    onChangeText={(data) => this.setState({ username: data })}
                >
                </TextInput>
                <Text >{ }</Text>
                <TextInput
                    style={[styles.inputbox]}
                    secureTextEntry={true}
                    placeholder="Enter Password"
                    onChangeText={(text) => this.passvalidate(text)}
                >
                </TextInput>
                <Text style={[styles.error]}>{this.state.passErr}</Text>

                <TextInput
                    style={[styles.inputbox]}
                    placeholder="Enter Mobile"
                    keyboardType="numeric"
                    maxLength={10}
                    onChangeText={(text) => this.mobilevalidate(text)}
                >
                </TextInput>
                <Text style={[styles.error]}>{this.state.mobileErr}</Text>
                <Button title='Click' onPress={this.onClick} />
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Login')}
                ><Text style={styles.text2}>Already have an account..
                        <Text style={styles.text1}>Go to Login</Text></Text>
                </TouchableOpacity>
               
            </View>
        );
    }
}

export default Signup;
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
        //  margin: 12,
        borderColor: 'lightblue',
        borderWidth: 2,
        padding: 10,
        width: 370,
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
 