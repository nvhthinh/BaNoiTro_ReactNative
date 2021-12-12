import React from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableHighlight,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
// import styles from './styles';
import { getRecipes, getCategoryName } from '../../data/MockDataAPI';

export default class RecipesListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title')
    };
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('category');
    const recipesArray = getRecipes(item.id);
    return (
      <ScrollView>
        <View style={styles.container}>
          <Image style={styles.avatar}
                  source={{uri: item.photo_url}}/>

          <View style={styles.postContent}>
              <Text style={styles.postTitle}>
              {item.name}
              </Text>

              <Text style={styles.postDescription}>
              {item.des}
              </Text>

              <Text style={styles.postDescription}>
              (PLO) – Có nhiều phương pháp để tăng cường sức khỏe không rắc rối như: giảm cân, ăn ít, tập thể dục nhiều, tăng cường năng lượng, ngủ nhiều, uống nước nhiều.,, Tuy nhiên, cũng có những cách nghe có vẻ lạ mà lại đơn giản, rất tốt cho sức khỏe.
              </Text>

              <Text style={styles.tags}>
                Kiều Trang, Tiên Tiên
              </Text>

              <Text style={styles.date}>
                2017-11-27 13:03:01
              </Text>
              
              <TouchableOpacity style={styles.shareButton}>
                <Text style={styles.shareButtonText}>Like</Text>  
              </TouchableOpacity> 
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  header:{
    padding:10,
    alignItems: 'center',
    backgroundColor: "#e7b62c",
  },
  headerTitle:{
    fontSize:22,
    color:"#FFFFFF",
    marginTop:10,
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  postContent: {
    flex: 1,
    padding:30,
  },
  postTitle:{
    fontSize:26,
    fontWeight:'600',
  },
  postDescription:{
    fontSize:16,
    marginTop:10,
  },
  tags:{
    color: '#00BFFF',
    marginTop:10,
  },
  date:{
    color: '#696969',
    marginTop:10,
  },
  avatar: {
    width: "100%",
    height: 200,
    
  },
  profile:{
    flexDirection: 'row',
    marginTop:20
  },
  name:{
    fontSize:22,
    color:"#00BFFF",
    fontWeight:'600',
    alignSelf:'center',
    marginLeft:10
  }, 
  shareButton: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#e7b62c",
  },
  shareButtonText:{
    color: "#FFFFFF",
    fontSize:20,
  }
});