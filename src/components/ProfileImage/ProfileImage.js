import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export default class UserImage extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.headerButtonContainer} onPress={this.props.onPress}>
        <Image
          style={styles.headerButtonImage}
          source={require('../../../assets/icons/person-icon.png')}
        />
      </TouchableOpacity>
    );
  }
}

UserImage.propTypes = {
  onPress: PropTypes.func
};
