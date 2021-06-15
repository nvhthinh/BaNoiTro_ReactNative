import React from 'react';
import {AsyncStorage,} from 'react-native';

class Authentication extends React.Component {

  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
      console.error('AsyncStorage : >>>>>>>>>>>>>>>' + item+" "+selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: >>>>>>>>>>>>>>>' + error.message);
    }
  }
}

const authentication = new Authentication();
export default authentication;