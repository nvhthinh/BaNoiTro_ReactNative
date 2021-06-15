import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image, Button, AsyncStorage } from 'react-native';
import styles from './styles';
import { SearchBar } from 'react-native-elements';
import { recipes, quickSearch } from '../../data/dataArrays';

import {MenuImage, LogoImage, SearchImage} from '../../components/MenuImage/MenuImage';

import ProfileImage from '../../components/ProfileImage/ProfileImage';
import DrawerActions from 'react-navigation';
import { getCategoryName } from '../../data/MockDataAPI';
// import Button from '@material-ui/core/Button';
export default class HomeScreen extends React.Component {
  
  componentDidMount() {
    // console.log("In username ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    // AsyncStorage.getItem('username', (err, result) => {
    //   console.log(result); 
    // });
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerLeft: (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerTitle: (
        <LogoImage
          onPress={() => {
            navigation.navigate('Home');
          }}
        />
      ),
      headerRight: (
        <SearchImage
          onPress={() => {
            navigation.navigate('Search');
          }}
        />
      )

    };
  };

  constructor(props) {
    super(props);
  }

  onPressRecipe = item => {
    this.props.navigation.navigate('Recipe', { item });
  };

  renderRecipes = ({ item }) => (
    
    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this.onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableHighlight>
    
  );

  onPressQuickSearch = item => {
    this.props.navigation.navigate('Search', { item });
  };

  renderQuickSearch = ({ item }) => (

    // <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this.onPressQuickSearch(item)}>
      <View style={styles.fastSearchItem}>
        <Button
          // style={styles.fastSearchItemBt}
          onPress={() => this.onPressQuickSearch(item.name)}
          title= {item.name}
          color="#e7b62c"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    // </TouchableHighlight>
    
  );

  render() {
    return (
      <ScrollView>
{/*         
        <View style={styles.fastSearch}>
          <View style={styles.fastSearchItem}>
            <Button
              // style={styles.fastSearchItemBt}
              onPress={() => Alert.alert('Simple Button pressed')}
              title=". Learn Moresa das"
              color="#19d29f"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
          <View style={styles.fastSearchItem}>
            <Button
              style={styles.fastSearchItemBt}
              onPress={() => Alert.alert('Simple Button pressed')}
              title="Learn "
              color="#e7b62c"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
          <View style={styles.fastSearchItem}>
            <Button
              style={styles.fastSearchItemBt}
              style={styles.fastSearchItem}
              onPress={() => Alert.alert('Simple Button pressed')}
              title=". e"
              color="#19d29f"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
          <View style={styles.fastSearchItem}>
            <Button
              style={styles.fastSearchItemBt}
              onPress={() => Alert.alert('Simple Button pressed')}
              title="ok"
              color="#e7b62c"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
          <View style={styles.fastSearchItem}>
            <Button
              style={styles.fastSearchItemBt}
              style={styles.fastSearchItem}
              onPress={() => Alert.alert('Simple Button pressed')}
              title=". Learn More"
              color="#19d29f"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
          <View style={styles.fastSearchItem}>
            <Button
              style={styles.fastSearchItemBt}
              onPress={() => Alert.alert('Simple Button pressed')}
              title="12432543635"
              color="#e7b62c"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
          
        </View>
         */}
        
        <View style={styles.fastSearch}>
          <FlatList
            horizontal
            showsVerticalScrollIndicator={false}
            // numColumns={2}
            data={quickSearch}
            renderItem={this.renderQuickSearch}
            keyExtractor={item => `${item.recipeId}`}
          />
        </View>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={recipes}
          renderItem={this.renderRecipes}
          keyExtractor={item => `${item.recipeId}`}
        />
      </ScrollView>
    );
  }
}
