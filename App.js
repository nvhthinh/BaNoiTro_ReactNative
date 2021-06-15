import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import AppContainer from './src/navigations/AppNavigation';
import LoginScreen from './src/screens/Login/LoginScreen';
import Dashboard from './src/screens/Dashboard';
import StartScreen from './src/screens/Start/StartScreen';
import RegisterScreen from './src/screens/Register/RegisterScreen';
import ResetPasswordScreen from './src/screens/ResetPassword/ResetPasswordScreen';

//login
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'

const Stack = createStackNavigator()

export default function App() {
  // const [email, setEmail] = useState({ value: '', error: '' })
  // const [password, setPassword] = useState({ value: '', error: '' })
  // const [message, setMessage] = useState('');
  // const [isLoading, setIsLoading] = React.useState(true);
  
  // const signin = async() => {
  //   if(email!="" && password!=""){
  //     alert('thank your for sign in');
  //   }

  // }
 

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);
  // }, []);

  // if( isLoading ) {
  //   return (
  //     <View style={{flex: 1,justifyContent: "center" }}>
  //       <ActivityIndicator size="large" color="#e7b62c"/>
  //     </View>
  //   )
  // }

  return (

    
     <AppContainer/>
    

    // <LoginScreen/>
    // <Dashboardscreen/>
    // <StartScreen/>
    // <RegisterScreen/>
    // <ResetPasswordScreen/>
    ///
    // <Provider theme={theme}>
    //   <NavigationContainer>
    //     <Stack.Navigator
    //       initialRouteName="StartScreen"
    //       screenOptions={{
    //         headerShown: false,
    //       }}
    //     >
    //       <Stack.Screen name="StartScreen" component={StartScreen} />
    //       <Stack.Screen name="LoginScreen" component={LoginScreen} />
    //       <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    //       {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
    //       <Stack.Screen name="Dashboard" component={Dashboard} />
    //       <Stack.Screen
    //         name="ResetPasswordScreen"
    //         component={ResetPasswordScreen}
    //       />
    //     </Stack.Navigator>
    //   </NavigationContainer>
    // </Provider>
  );
}
