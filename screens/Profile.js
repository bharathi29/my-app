import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { firebase } from '../config';
import { FontAwesome, Foundation, MaterialCommunityIcons } from '@expo/vector-icons';

const ProfileScreen = ({navigation}) => {
    const todoRef = firebase.firestore().collection('newD');
    const [addData, setAddData] = useState({ heading: '', age: '', sunUsage: 'None' });
    const [formSubmitted, setFormSubmitted] = useState(false);

    const addField = () => {
        if (addData.heading && addData.age && addData.sunUsage) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                heading: addData.heading,
                age: addData.age,
                sunUsage: addData.sunUsage,
                createdAt: timestamp
            };
            todoRef
                .add(data)
                .then(() => {
                    setFormSubmitted(true);
                    Keyboard.dismiss();
                })
                .catch((error) => {
                    alert(error);
                });
        }
    };

    const dropdownHeight = () => {
        const optionsHeight = 40; // Height of each dropdown option
        const numOptions = 5; // Number of options in the dropdown (change as needed)
        return optionsHeight * numOptions; // Calculate the total height
    };

    return (
        <View style={styles.container}>
            <Text>{'\n'}{'\n'}</Text>
            <Text style={styles.titleText}>{'\n'}{'\n'}RAYRESIST</Text>
            <Text>{'\n'}{'\n'}</Text>
            {formSubmitted ? (
                <View>
                    <Text style={styles.submittedText}>Hey {addData.heading}!</Text>
                    <Text style={styles.submittedText}>Welcome to RAYRESIST</Text>
                    <Text>{'\n'}{'\n'}</Text>
                    <Text>{'\n'}{'\n'}</Text>
                    <Text>{'\n'}{'\n'}</Text>
                    <Text>{'\n'}{'\n'}</Text>
                    <Text>{'\n'}{'\n'}</Text>
                    <Text>{'\n'}{'\n'}</Text>
                    <Text>{'\n'}{'\n'}</Text>
                    <Text>{'\n'}{'\n'}</Text>
                    <Text>{'\n'}{'\n'}</Text>
                    <Text>{'\n'}</Text>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={() => { navigation.navigate("home") }}
                            style={styles.iconButton}>
                            <FontAwesome name="home" size={24} color="black" /><Text>Home</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate("learn") }}
                            style={styles.iconButton}>
                            <Foundation name="lightbulb" size={24} color="black" /><Text>Learn</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate("profile") }}
                            style={styles.iconButton}>
                            <MaterialCommunityIcons name="face-man-profile" size={24} color="black" /><Text>Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>                
            ) : (
                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Name:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Enter name'
                            placeholderTextColor='#000000'
                            onChangeText={(heading) => setAddData({ ...addData, heading })}
                            value={addData.heading}
                            multiline={true}
                            underlineColorAndroid='transparent'
                            autoCapitalize='none'
                        />
                    </View>
                    <View style={styles.inputContainer}>
                    <Text>{'\n'}{'\n'}</Text>
                        <Text style={styles.label}>Age:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Enter age'
                            placeholderTextColor='#000000'
                            onChangeText={(age) => setAddData({ ...addData, age })}
                            value={addData.age}
                            keyboardType='numeric'
                            multiline={true}
                            underlineColorAndroid='transparent'
                            autoCapitalize='none'
                        />
                    </View>
                    <View style={styles.inputContainer}>
                    <Text>{'\n'}{'\n'}</Text>
                        <Text style={styles.label}>Sun Protection needed:</Text>
                        <ModalDropdown
                            options={['None', 'Very high', 'High', 'Moderate', 'Low']}
                            defaultValue={'None'}
                            textStyle={styles.dropdownText}
                            dropdownStyle={[styles.dropdownStyle, { height: dropdownHeight() }]}
                            onSelect={(index, value) => setAddData({ ...addData, sunUsage: value })}
                        />
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={styles.button} onPress={addField}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            <Text>{'\n'}{'\n'}</Text>
            <Text>{'\n'}{'\n'}</Text>
            <Text>{'\n'}{'\n'}</Text>
            <Text>{'\n'}{'\n'}</Text>
            <Text>{'\n'}{'\n'}</Text>
            <Text>{'\n'}{'\n'}</Text>
            <Text>{'\n'}{'\n'}</Text>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => { navigation.navigate("home") }}
                style={styles.iconButton}>
                    <FontAwesome name="home" size={24} color="black" /><Text>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("learn") }}
                    style={styles.iconButton}>
                    <Foundation name="lightbulb" size={24} color="black" />
                    <Text>Learn</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { navigation.navigate("profile") }}
                    style={styles.iconButton}>
                    <MaterialCommunityIcons name="face-man-profile" size={24} color="black" /><Text>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        letterSpacing: 2,
        textAlign: 'center',
        color: 'darkorange',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 16,
        width: '100%',
    },
    iconButton: {
        alignItems: 'center',
    },
    formContainer: {
        flexDirection: 'column',
        marginLeft: 10,
        marginRight: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        flex: 1,
        color: 'black',
        marginRight: 10,
    },
    input: {
        flex: 2,
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        marginRight: 5,
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#FFE5B4',
        width: 110,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#FFA500',
    },
    buttonText: {
        color: 'purple',
        fontSize: 20,
    },
    container: {
        backgroundColor: '#e5e5e5',
        padding: 15,
        borderRadius: 15,
        margin: 5,
        marginHorizontal: 10,
    },
    innerContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: 16,
    },
    itemHeading: {
        fontWeight: 'bold',
    },
    itemAge: {
        fontStyle: 'italic',
    },
    itemSunUsage: {
        fontStyle: 'bold',
    },
    dropdownStyle: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#e5e5e5',
        padding: 15,
        margin: 5,
        marginHorizontal: 10,
        backgroundColor: 'white',
    },
    dropdownTextStyle: {
        fontSize: 16,
        color:'red',
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    submittedText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF6EC7',
        marginTop: 20,
    },
});
