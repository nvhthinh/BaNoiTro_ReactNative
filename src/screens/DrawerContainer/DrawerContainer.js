import React from 'react';
import { View, ImageBackground, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import MenuButton from '../../components/MenuButton/MenuButton';
export default class DrawerContainer extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.content}>
        <View style={styles.containerUser}>
          <ImageBackground source={require('../../../assets/icons/backround2.png')} style={styles.image}>
            <Image
              style={styles.userLogo}
              source={require('../../../assets/icons/userlg.jpg')}
            />
            <Text style={styles.text}>Hoàn Thịnh</Text>
          </ImageBackground>
        </View>
        <View style={styles.container}>
          <MenuButton
            title="HOME"
            source={require('../../../assets/icons/home.png')}
            onPress={() => {
              navigation.navigate('Home');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="CATEGORIES"
            source={require('../../../assets/icons/category.png')}
            onPress={() => {
              navigation.navigate('Categories');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="SEARCH"
            source={require('../../../assets/icons/search.png')}
            onPress={() => {
              navigation.navigate('Search');
              navigation.closeDrawer();
            }}
          />

          {/* custom */}
          <MenuButton
            title="SÁCH NẤU ĂN"
            source={require('../../../assets/icons/open-book.png')}
            onPress={() => {
              navigation.navigate('cook');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="CHĂN SÓC SỨC KHỎE"
            source={require('../../../assets/icons/heart.png')}
            onPress={() => {
              navigation.navigate('heat');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="MẸO VẶT"
            source={require('../../../assets/icons/advice.png')}
            onPress={() => {
              navigation.navigate('tips');
              navigation.closeDrawer();
            }}
          />

        </View>
      </View>
    );
  }
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  })
};
