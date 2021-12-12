import * as React from 'react';
import { View, useWindowDimensions, ScrollView} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import SpendingHistory from './SpendingHistory';
import SpendingSummary from './SpendingSummary';

const FirstRoute = () => (
    <ScrollView>
        <SpendingHistory/>
        {/* <SpendingSummary/> */}
    </ScrollView>
);

const SecondRoute = () => (
    <ScrollView>
        <SpendingSummary/>
        {/* <SpendingHistory/> */}
    </ScrollView>
);
// navigationOptions = {
//     title: 'Danh mục'
//   };
export default function TabViewSpendingBook() {
    
  TabViewSpendingBook.navigationOptions  = {
    title: 'Quản lý thu chi'
  };

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Quản lý thu chi' },
    { key: 'second', title: 'Thống kê thu chi' },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={props => <TabBar {...props} style={{backgroundColor: '#e7b62c'}}/>} // <-- add this line
    />
  );
}