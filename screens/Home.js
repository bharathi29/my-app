import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome, Foundation, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const HomeScreen = ({ navigation }) => {
    const [uvIndex, setUVIndex] = useState(null);
    const [remainingSecs, setRemainingSecs] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [showTimer, setShowTimer] = useState(false);

    useEffect(() => {
        fetchUVIndexForCurrentLocation();
    }, []);

    const fetchUVIndexForCurrentLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Location permission denied');
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;


            console.log('Latitude:', latitude, 'Longitude:', longitude);


            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/uvi?lat=${latitude}&lon=${longitude}&appid=a540b4e2abe5bef38f4997518ab068e3`
            );
            const data = await response.json();

            console.log('UV Index Data:', data);

            setUVIndex(data.value);
        } catch (error) {
            console.error('Error fetching UV index:', error);
        }
    };

    const formatNumber = number => `0${number}`.slice(-2);

    const getRemaining = (time) => {
        const mins = Math.floor(time / 60);
        const secs = time - mins * 60;
        return { mins: formatNumber(mins), secs: formatNumber(secs) };
    }

    const toggleTimer = () => {
        setIsActive(!isActive);
        if (!showTimer) {
            setShowTimer(true);
        }
    }

    const resetTimer = () => {
        setRemainingSecs(0);
        setIsActive(false);
        setShowTimer(false);
    }

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setRemainingSecs(prevSecs => {
                    if (prevSecs >= 7200) { // 2 hours * 3600 seconds/hour
                        clearInterval(interval);
                        return 7200; // Stop the timer at 2 hours
                    }
                    return prevSecs + 1;
                });
            }, 1000);
        } else if (!isActive && remainingSecs !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, remainingSecs]);

    const applyTimer = () => {
        setShowTimer(true);
        setIsActive(true);
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{'\n'}{'\n'}RAYRESIST</Text>
                <Text>{'\n'}{'\n'}NOW{'\t'}{'\t'}{'\t'}{'\t'}TODAY{'\n'}</Text>
                {uvIndex && (
                    <Text style={styles.uvIndexText}>
                        UV Index:{'\t'}{'\t'}{'\t'}{uvIndex}
                    </Text>
                )}
                
            </View>

            {!showTimer && (
                <TouchableOpacity style={styles.roundButton} onPress={applyTimer}>
                    <Text style={styles.buttonText}>APPLY</Text>
                </TouchableOpacity>
            )}

            {showTimer && (
                <>
                    <Text style={styles.timerText}>{`${getRemaining(remainingSecs).mins}:${getRemaining(remainingSecs).secs}`}</Text>
                    <TouchableOpacity onPress={toggleTimer} style={styles.button}>
                        <Text style={styles.buttonText}>{isActive ? 'Pause' : 'Start'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={resetTimer} style={[styles.button, styles.buttonReset]}>
                        <Text style={[styles.buttonText, styles.buttonTextReset]}>Reset</Text>
                    </TouchableOpacity>
                </>
            )}

            <Text>{'\n'}{'\n'}</Text>
            <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.iconButton}>
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
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        flex: 1,
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        letterSpacing: 2,
        textAlign: 'center',
        color: 'darkorange',
    },
    uvIndexText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    roundButton: {
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        backgroundColor: '#E56917',
        borderRadius: 50, // Make it perfectly round
        padding: 15,
        alignItems: 'center',
    },
    buttonText: {
        marginTop: 10,
        color: 'white',
        fontSize: 24,
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
    timerText: {
        color: '#ff0000',
        fontSize: 30,
        marginBottom: 20
    },
    button: {
        borderWidth: 5,
        borderColor: '#B9AAFF',
        width: 125,
        height: 75,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 20,
        color: '#B9AAFF'
    },
    buttonReset: {
        marginTop: 20,
        borderColor: "#FF851B"
    },
    buttonTextReset: {
        color: "#FF851B"
    }
});