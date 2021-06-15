import React from 'react';
import {View, Text, Dimensions, Alert ,AsyncStorage, ActivityIndicator} from "react-native";
import {PieChart,} from "react-native-chart-kit";


const screenWidth = Dimensions.get("window").width;


export default class Peichart extends React.Component {
    state = {
        idLG: "",
        spendingChartSV: null,
        isLoading: true,
      };

    componentDidMount () {
      this._refreshDataSpending();
      // setTimeout(() => {
      //   this.setState({isLoading: false});
      // }, 3000);
    }

    //reder data
    _refreshDataSpending = () => {
      this._renderDataSpending();
    }

    _renderDataSpending = async() => {
      try {
        const idLG = await AsyncStorage.getItem('idLG');
        console.log("___________________________________goilai")
        // console.log("./Start ...............................", idLG)
        await fetch('http://192.168.1.9:3000/api/spendingSummary',{
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'id': idLG,
            'type': 'MONTH'
          })
        }).then((response)=>response.json())
        .then((res)=>{
        //   this.setState({refreshing: false});
          if(res.status===1){
            let spending = res.body.data;
            this.setState({spendingChartSV: spending, isLoading: false})
            // console.log("sv is", this.state.spendingChartSV);
            // console.log("lc ", summarySpending);
          } else{
            console.log ("log info get all spending error  ", res)
          }
        })
        .done();
      } catch (error) {
        this.setState({refreshing: false});
        console.log("Login client fail ", error);
      }
    }

  render() {
    if( this.state.isLoading ) {
    return (
        <View style={{flex: 1,justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#e7b62c"/>
        </View>
      )
    }
    return (
      <View style= {{flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
      }}>
          <PieChart
            // data={summarySpending}
            data= {this.state.spendingChartSV}
            
            width={Dimensions.get('window').width - 16}
            height={280}
            chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
                borderRadius: 16,
            },
            }}
            style={{
            marginVertical: 8,
            borderRadius: 16,
            }}
            accessor="percent"
            backgroundColor="transparent"
            // paddingLeft="0"
            center={[screenWidth/4, 0]}
            absolute //for the absolute number remove if you want percentage
            hasLegend={false}
        />
      </View>
    );
  }
}
