import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import styles from './styles'
import { tips } from '../../data/dataArrays';
import { getNumberOfRecipes } from '../../data/MockDataAPI';

export default class TipsScreen extends React.Component {
  static navigationOptions = {
    title: 'Mẹo vặt'
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
      <View style={styles.tipItemContainer}>
        <Image style={styles.tipPhoto} source={{ uri: item.photo_url }} />
        <Text style={styles.tipName}>{item.name}</Text>
        <Text style={styles.tipInfo}>{item.des}</Text>
      </View>
    </TouchableHighlight>
  );

  render() {
    return (
      <View>
        <FlatList
          data={tips}
          renderItem={this.renderCategory}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    );
  }
}
