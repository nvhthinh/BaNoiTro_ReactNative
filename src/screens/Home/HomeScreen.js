import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image } from 'react-native';
import styles from './styles';
import { SearchBar } from 'react-native-elements';
import { recipes } from '../../data/dataArrays';

import {MenuImage, LogoImage, SearchImage} from '../../components/MenuImage/MenuImage';

import ProfileImage from '../../components/ProfileImage/ProfileImage';
import DrawerActions from 'react-navigation';
import { getCategoryName } from '../../data/MockDataAPI';

export default class HomeScreen extends React.Component {
  // static navigationOptions = ({ navigation }) => ({
  //   title: 'Home',
  //   headerLeft: () => <MenuImage
  //     onPress={() => {
  //       navigation.openDrawer();
  //     }}
  //   />
  // });

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

  render() {
    return (
      <View>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={recipes}
          renderItem={this.renderRecipes}
          keyExtractor={item => `${item.recipeId}`}
        />
      </View>
    );
  }
}
