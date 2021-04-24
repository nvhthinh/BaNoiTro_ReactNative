import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

class MenuImage extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.headerButtonContainer} onPress={this.props.onPress}>
        <Image
          style={styles.headerButtonImage}
          source={require('../../../assets/icons/menu.png')}
        />
      </TouchableOpacity>
    );
  }
}

class LogoImage extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.headerButtonContainer} onPress={this.props.onPress}>
        <Image
          style={styles.headerButtonLogoImage}
          source={require('../../../assets/icons/logo.png')}
        />
      </TouchableOpacity>
    );
  }
}

class SearchImage extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.headerButtonContainer} onPress={this.props.onPress}>
        <Image
          style={styles.headerButtonImage}
          source={require('../../../assets/icons/search.png')}
        />
      </TouchableOpacity>
    );
  }
}

module.exports = {
  MenuImage: MenuImage,
  LogoImage: LogoImage,
  SearchImage: SearchImage
}

MenuImage.propTypes = {
  onPress: PropTypes.func
};
