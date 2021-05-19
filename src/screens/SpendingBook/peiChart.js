import React from 'react';
import {View, Text, Dimensions,} from "react-native";
import {PieChart,} from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;


export default class Peichart extends React.Component {
  render() {
      
    return (
        <View style= {{flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <PieChart
                    data={[
                    {
                        name: 'Mua xắm',
                        population: 53111444,
                        color: '#ff9900',
                        legendFontColor: '#7F7F7F',
                        legendFontSize: 15111111,
                    },
                    {
                        name: 'Trang bị',
                        population: 2800000,
                        color: '#109618',
                        legendFontColor: '#7F7F7F',
                        legendFontSize: 15,
                    },
                    {
                        name: 'Sinh hoạt',
                        population: 8538000,
                        color: '#990099',
                        legendFontColor: '#7F7F7F',
                        legendFontSize: 15,
                    },
                    {
                        name: 'Đầu tư',
                        population: 11920000,
                        color: '#0099c6',
                        legendFontColor: '#7F7F7F',
                        legendFontSize: 15,
                    },
                    {
                        name: 'Lương',
                        population: 11920000,
                        color: '#dd4477',
                        legendFontColor: '#7F7F7F',
                        legendFontSize: 15,
                    },
                    {
                        name: 'Thu nhập khác',
                        population: 11920000,
                        color: '#6a0',
                        legendFontColor: '#7F7F7F',
                        legendFontSize: 15,
                    },
                    {
                        name: '1',
                        population: 11920000,
                        color: '#b82e2e',
                        legendFontColor: '#7F7F7F',
                        legendFontSize: 15,
                    },
                    {
                        name: '2',
                        population: 11920000,
                        color: '#316395',
                        legendFontColor: '#7F7F7F',
                        legendFontSize: 15,
                    },
                    {
                        name: '3',
                        population: 11920000,
                        color: '#994499',
                        legendFontColor: '#7F7F7F',
                        legendFontSize: 15,
                    },
                    {
                        name: '4',
                        population: 11920000,
                        color: '#2a9',
                        legendFontColor: '#7F7F7F',
                        legendFontSize: 15,
                    },
                    ]}
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
                    accessor="population"
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
