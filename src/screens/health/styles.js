import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  healthItemContainer: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 20,
  },
  healthPhoto: {
    width: '100%',
    height: 155,
    borderRadius: 20,
    borderBottomLeftRadius: 0, 
    borderBottomRightRadius: 0,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 3
  },
  healthName: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
    marginTop: 8
  },
  healthInfo: {
    marginTop: 3,
    marginBottom: 5
  }
});

export default styles;
