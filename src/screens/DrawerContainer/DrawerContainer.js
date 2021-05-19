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
            <Text style={styles.text}>KIỀU THU TRANG</Text>
          </ImageBackground>
        </View>
        <View style={styles.container}>
          <MenuButton
            title="TRANG CHỦ"
            source={require('../../../assets/icons/home.png')}
            onPress={() => {
              navigation.navigate('Home');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="QUẢN LÝ THU CHI"
            source={require('../../../assets/icons/Money.png')}
            onPress={() => {
              navigation.navigate('Spending');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="SÁCH NẤU ĂN"
            source={require('../../../assets/icons/category.png')}
            onPress={() => {
              navigation.navigate('Categories');
              navigation.closeDrawer();
            }}
          />
          {/* custom */}
          <MenuButton
            title="SỨC KHỎE"
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
          <MenuButton
            title="ĐĂNG XUẤT"
            source={require('../../../assets/icons/logout.png')}
            onPress={() => {
              navigation.navigate('StartScreen');
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
