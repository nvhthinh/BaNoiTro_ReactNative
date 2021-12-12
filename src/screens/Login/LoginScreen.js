import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Alert, AsyncStorage  } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import BackButton from '../../components/BackButton'
import authentication from '../../routes/Authentication'
import { theme } from '../../core/theme'
import { emailValidator } from '../../helpers/emailValidator'
import { passwordValidator } from '../../helpers/passwordValidator'
import AppContainer from './../../navigations/AppNavigation';
import { State } from 'react-native-gesture-handler'

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [messageErrorLogin, setMessageErrorLogin] = useState(0)
  
  const onLoginPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    signin();
  }

  const signin = async() => {
    try {
      // IP address my computer
      await fetch('http://192.168.1.8:3000/api/login',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'email': email.value,
          'pass': password.value
        })
      }).then((response)=>response.json())
      .then((res)=>{
        if(res.status===1){
          console.log("res ", res)
          var { id, email, role, dpname, image } = res.body;
          
          authentication.saveItem('emailLG',email);
          authentication.saveItem('idLG',id+"");
          authentication.saveItem('roleLG',role+"");
          authentication.saveItem('dpnameLG',dpname);
          authentication.saveItem('imageLG',image);
          
          navigation.navigate('Home');
        } else{
          setMessageErrorLogin(1)
          console.log ("log info no login  ", res)
          // Alert.alert("Invalid Credentials");
        }
      })
      .done();

    } catch (error) {
      console.log("Login client fail ", error);
    }
    
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('emailLogin');
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  return (
    <Background>
      <BackButton goBack={_ => navigation.navigate("StartScreen")} />
      <Logo />
      <Header>Welcome back{State.email}</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => { setEmail({ value: text, error: '' }); setMessageErrorLogin(0); } }
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => { setPassword({ value: text, error: '' }); setMessageErrorLogin(0); } }
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <Text style={{color: "red", paddingBottom: 20, paddingTop: 5, display: messageErrorLogin!=1?"none":"flex" }}>Email không tồn tại hoặc mật khẩu chưa đúng. Vui lòng nhập lại!</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot} >Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})