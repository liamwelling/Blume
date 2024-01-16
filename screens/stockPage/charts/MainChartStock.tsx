import  React, {useState} from 'react';
import { View, useWindowDimensions, Text } from 'react-native';
import { color } from 'react-native-reanimated';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import DayChartStock from './DayChartStock';
import WeekChartStock from './WeekChartStock';
import MonthChartStock from './MonthChartStock';
import YearChartStock from './YearChartStock';
import AllChartStock from './AllChartStock';
import useStockStore from '../../../stateManagement/StockContext';


const renderScene = SceneMap({
  day: DayChartStock,
  week: WeekChartStock,
  month: MonthChartStock,
  year: YearChartStock,
  all: AllChartStock
});

export default function MainChartStock() {

  const store = useStockStore();
  const selectedTicker = store.stockTicker

  const layout = useWindowDimensions();
  const [timeFrame, setTimeFrame] = useState('day')
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'day', title: 'Day' },
    { key: 'week', title: 'Week' },
    { key: 'month', title: 'Month' },
    { key: 'year', title: 'Year' },
    { key: 'all', title: 'All' },
  ]);
  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#2436E7', height: 1}}
      activeColor={'#2436E7'}
      labelStyle={{color: '#CCCCCC', fontFamily: 'Medium', fontSize: 12,  }}
      style={{ backgroundColor: 'white', width: '100%', marginLeft: 'auto', marginRight: 'auto'}}
    />
  );
  const [loadedFonts] = useFonts({
    Regular: require("../../../assets/fonts/Graphik-Regular-Web.ttf"),
    Bold: require("../../../assets/fonts/Graphik-Bold-Web.ttf"),
    Medium: require('../../../assets/fonts/Graphik-Medium-Web.ttf')
});

if (!loadedFonts) {
    return <AppLoading />;
}
  return (
    <View style={{width: '100%', height: 305 }}>
{/* 
    <Text>sdf{selectedTicker}</Text> */}
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: 400 }}
      tabBarPosition={'bottom'}
      renderTabBar={renderTabBar}
      
    />
    </View>
  );
}