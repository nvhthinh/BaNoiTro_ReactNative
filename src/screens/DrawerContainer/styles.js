import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    
  },
  container: {
    left: 0,
    flex: 4,
    alignItems: 'flex-start',
    paddingHorizontal: 20
  },
  containerUser: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: 'skyblue',
    alignItems: 'stretch',
    paddingHorizontal: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'flex-end',
 
  },
  image: {
    flex: 1,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    flexDirection: 'column',
    backgroundColor: "#000000a0",
    alignItems: 'flex-start',
  },
  userLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignSelf: "flex-start",
    flexDirection: 'row-reverse',
    position: 'absolute',
    bottom: 40,
    left: 20,
    borderWidth: 1,
    borderColor: "#ffffff",
    borderStyle: 'solid',
  },
  text: {
    color: "#ffffff",
    fontSize: 23,
    fontWeight: '900',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 5,
    left: 20,
    textTransform: 'uppercase'
  },
  
});

export default styles;
