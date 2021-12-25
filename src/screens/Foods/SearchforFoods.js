import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Appbar, TextInput, Button, Card, Title } from 'react-native-paper';

const SearchFood = () => {
  const [text, onChangeText] = React.useState("");
  const [result, onChangeRes] = React.useState([]);
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
        var result = [];

        for(var i in data)
            result.push([i, data[i]]);
        onChangeRes(result);
    })
    .catch(err => console.error(err));
  }

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
          {/* <Appbar.Header>
          <Appbar.Content title="Search" />
          </Appbar.Header> */}
        <View  style={{ padding: 12 }}>
          <TextInput
          onChangeText={onChangeText}
          mode='outlined'
          value={text}
          placeholder='Search here'
        />
        <Button style={{ width: 120, margin: 12, alignSelf: "center" }} icon="magnify" mode="contained" onPress={handle}>Search</Button>
        <Text style={{ fontStyle: "italic", fontWeight: "bold", display: display }}>Search result for "{text}"</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {result.map((e, url) => { return (
          <Card key={e[0]} style={{ margin: 6, width: 180, alignContent: "center" }}>
            <Card.Cover source={{ uri: e[1] }} />
            <Card.Content>
              <Title>{e[0]}</Title>
            </Card.Content>
            </Card>
            ); })}
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchFood;
