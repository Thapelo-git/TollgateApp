import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/screens/Login';
import Register from './components/screens/Register';
import ForgetPassword from './components/screens/ForgetPassword';
import TabScreen from './components/screens/TabScreen';
import HotelDetails from './components/screens/HotelDetails';
import AddVehicle from './components/screens/AddVehicle';
import PaymentScreen from './components/screens/PaymentScreen';

import ComfirmPay from './components/screens/ComfirmPay';

const Stack =createStackNavigator()
export default function App({navigation}) {
  const [signedIn,setSignedIn]=useState(false)

  return (
    
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:true}}>
      <Stack.Screen name='Login' options={{headerShown:false}} component={Login}/>
      <Stack.Screen name='Register' options={{headerShown:false}} component={Register}/>
      <Stack.Screen name='ForgetPassword' options={{headerShown:false}} component={ForgetPassword}/>
      <Stack.Screen name='TabScreen' options={{headerShown:false}} component={TabScreen}/>
      <Stack.Screen name='HotelDetails' options={{headerShown:false}} component={HotelDetails}/>
      <Stack.Screen name='AddVehicle' options={{headerShown:false}} component={AddVehicle}/>
      <Stack.Screen name='ComfirmPay' options={{headerShown:false}} component={ComfirmPay}/>
      <Stack.Screen name='PaymentScreen' options={{headerShown:false}} component={PaymentScreen}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});