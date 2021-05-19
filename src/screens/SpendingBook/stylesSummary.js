import { StyleSheet, Dimensions } from 'react-native';
const Wwidth  = Dimensions.get("window").width;

const styles = StyleSheet.create({
  spendingContainer: {
    flex: 1,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  spendingHeaderContainer: {
    flexDirection: "row",
    marginBottom: 10,
    height: 42,
    position: "relative"
  },
  headerItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#e7b62c",
  },
  filterContainer: {
    margin: 2,
    flexDirection:'row',
    flexWrap: 'wrap'
  },
  filterlabel: {
    margin: 2,
    flexWrap: 'wrap',
    justifyContent: "center",
    alignItems: "center",
  },
  filterButton: {
    margin: 2,
    flexWrap: 'wrap'
  },
  searchContainer: {
    paddingTop: 0, 
    paddingRight: 20, 
    paddingBottom: 10, 
    paddingLeft: 20
  },
  //list
  spendingFilterContainer: {
    flex: 1,
    padding: 15,
    paddingLeft: 20,
    marginBottom: 2,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  spendingFilterTxt: {
    fontSize: 18,
    // flex: 1,
    // textAlign: 'center',
    color: '#333333',
    marginTop: 8,
    textTransform: 'uppercase',
    paddingRight: 10
  },
  spendingTotalContainer: {
    flex: 1,
    padding: 15,
    paddingLeft: 20,
    marginBottom: 2,
    backgroundColor: "#fff",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  spendingTotalTxt: {
    fontSize: 18,
    flex: 1,
    // textAlign: 'center',
    color: '#333333',
    marginTop: 8
  },
  // spendingTotalBtAdd: {
  //   flex: 1,
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   textAlign: 'right',
  //   color: '#333333',
  //   borderRadius: 30,
    
  // },
  spendingItemContainer: {
    flex: 1,
    width: Wwidth/2,
  },
  spendingPhoto: {
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
  spendingName: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    // textAlign: 'center',
    color: '#333333',
    marginTop: 8
  },
  spendingPrice: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#333333',
    marginTop: 8,
    marginRight: 20
  },
  spendingInfo: {
    marginTop: 3,
    marginBottom: 5
  },
////////////////////
spendingPeiContainer: {
  flex: 1,
  // padding: 10,
  marginBottom: 10,
  backgroundColor: "#fff",
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
},
});

export default styles;
