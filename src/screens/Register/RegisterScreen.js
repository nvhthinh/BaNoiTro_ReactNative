import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, AsyncStorage } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import BackButton from '../../components/BackButton'
import { theme } from '../../core/theme'
import { emailValidator } from '../../helpers/emailValidator'
import { passwordValidator } from '../../helpers/passwordValidator'
import { nameValidator } from '../../helpers/nameValidator'

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [messageErrorSignUp, setMessageErrorSignUp] = useState(0)
  // const [isLoading, setIsLoading] = useState(true);

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    signUp();
  }

  const signUp = async() => {
    try {
      // IP address my computer
      await fetch('http://192.168.1.8:3000/api/signUp',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'name': name.value,
          'email': email.value,
          'pass': password.value
        })
      }).then((response)=>response.json())
      .then((res)=>{
        if(res.status===1){
          AsyncStorage.setItem('emailLogin',email.value);
          navigation.navigate('LoginScreen');
          // console.log ("regist success", email.value)
          setName({ ...name, value: '' })
          setEmail({ ...email, value: ''  })
          setPassword({ ...password, value: ''  })
        }
        if(res.status===2){
          setEmail({ ...email, error: "Email này đã được sử dụng. Vui lòng dùng Email khác!" })
          // console.log ("Acc ton tai", res)
        }
        else{
          setMessageErrorSignUp(1)
          // console.log ("log info ", res)
          // Alert.alert("Invalid Credentials");
        }
      })
      .done();

    } catch (error) {
      console.log("Regist client fail ", error);
    }
    
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000000000000);
  // }, []);

  // if( isLoading ) {
  //   return (
  //     <View style={{flex: 1,justifyContent: "center" }}>
  //       <ActivityIndicator size="large" color="#e7b62c"/>
  //     </View>
  //   )
  // }

  return (
    <Background>
      <BackButton goBack={_ => navigation.navigate("StartScreen")} />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => { setName({ value: text, error: '' }); setMessageErrorSignUp(0); } }
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => { setEmail({ value: text, error: '' }); setMessageErrorSignUp(0); } }
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
        onChangeText={(text) => { setPassword({ value: text, error: '' }); setMessageErrorSignUp(0); } }
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Text style={{color: "red", paddingBottom: 20, paddingTop: 5, display: messageErrorSignUp!=1?"none":"flex" }}>Có lỗi xảy ra. Vui lòng đăng kí lại!</Text>
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})