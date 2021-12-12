import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';

const SearchFood = () => {
  const [text, onChangeText] = React.useState("");
  const [result, onChangeRes] = React.useState("");
  const [display, onChangeDis] = React.useState("none");

  const handle = () => {
    onChangeDis("flex");
    var formdata = new FormData();
    formdata.append(text, "");
    fetch('http://95.111.199.129:80/rec', {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    }).then(response => response.json())
    .then(data => {
        console.log(data);
        onChangeRes(JSON.stringify(data));
    })
    .catch(err => console.error(err));
  }

  return (

        <View  style={{ padding: 10}}>
          <TextInput
          onChangeText={onChangeText}
          value={text}
          placeholder='Search here'
        />
        <Button style={{ width: 120, margin: 12, alignSelf: "center" }} mode="contained" onPress={handle}>Search</Button>
        <Text style={{ fontStyle: "italic", fontWeight: "bold", display: display }}>Search result for "{text}"</Text>
        <Text>{result}</Text>
        </View>
  );
};

export default SearchFood;