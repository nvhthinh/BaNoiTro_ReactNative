import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export default class LogoImage extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.headerButtonContainer2} onPress={this.props.onPress}>
        <Image
          style={styles.headerButtonImage2}
          source={require('../../../assets/icons/logo.png')}
        />
      </TouchableOpacity>
    );
  }
}

LogoImage.propTypes = {
  onPress: PropTypes.func
};
