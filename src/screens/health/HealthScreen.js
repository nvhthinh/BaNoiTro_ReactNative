import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import styles from './styles'
import { health } from '../../data/dataArrays';
import { getNumberOfRecipes } from '../../data/MockDataAPI';

export default class HealthsScreen extends React.Component {
  static navigationOptions = {
    title: 'Sức khỏe'
  };

  constructor(props) {
    super(props);
  }

  onPressCategory = item => {
    const title = item.name;
    const category = item;
    this.props.navigation.navigate('ReadPost', { category, title });
  };
  onPressRecipe = item => {
    this.props.navigation.navigate('Recipe', { item });
  };

  renderCategory = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this.onPressCategory(item)}>
      <View style={styles.healthItemContainer}>
        <Image style={styles.healthPhoto} source={{ uri: item.photo_url }} />
        <Text style={styles.healthName}>{item.name}</Text>
        <Text style={styles.healthInfo}>{item.des}</Text>
      </View>
    </TouchableHighlight>
  );

  render() {
    return (
      <View>
        <FlatList
          data={health}
          renderItem={this.renderCategory}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    );
  }
}
