import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./screens/Home"
import Learn from "./screens/Learn"
import Profile from "./screens/Profile"

import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';
const Stack = createNativeStackNavigator();

export default function App() {
  const requestUserPermission=async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  useEffect(()=>{
    if(requestUserPermission()){
      messaging().getToken().then(token=>{
        console.log(token);
      })
    }
    else{
      console.log("Failed token status",authStatus);
    }

    messaging()
      .getInitialNotification()
      .then(async (remoteMessage)=>{
        if(remoteMessage){
          console.log('Notification caused app to open from quit state:',
        remoteMessage.notification,);
        }
      });

      messaging().onNotificationOpenedApp(remoteMessage=>{
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
      });

      messaging().setBackgroundMessageHandler(async(remoteMessage)=>{
        console.log('Message handles in the background',remoteMessage);
      });

      const unsubscribe=messaging().onMessage(async remoteMessage=>{
        Alert.alert('A new FCM message arrived!',JSON.stringify(remoteMessage));
      });

      return unsubscribe;
  },[])
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="home" component={Home}></Stack.Screen>
        <Stack.Screen name="learn" component={Learn}></Stack.Screen>
        <Stack.Screen name="profile" component={Profile}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
