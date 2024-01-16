import  React, {useState} from 'react';
import { View, useWindowDimensions, Text } from 'react-native';
import { color } from 'react-native-reanimated';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import HomepageChart from './HomepageChart';
import DayChartHP from './homepageCharts/DayChartHP';
import WeekChartHP from './homepageCharts/WeekChartHP';
import MonthChartHP from './homepageCharts/MonthChartHP';
import YearChartHP from './homepageCharts/YearChartHP';
import AllChartHP from './homepageCharts/AllChartHP';


const renderScene = SceneMap({
  day: DayChartHP,
  week: WeekChartHP,
  month: MonthChartHP,
  year: YearChartHP,
  all: AllChartHP
});

export default function TabViewExample() {
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
      indicatorStyle={{ backgroundColor: '#42C0F0', height: 1, zIndex: 100,  }}
      activeColor={'#42C0F0'}
      labelStyle={{color: 'white', fontFamily: 'Medium', fontSize: 12 }}
      style={{ backgroundColor: '#2436E7', width: '100%', marginLeft: 'auto', marginRight: 'auto'}}
    />
  );
  const [loadedFonts] = useFonts({
    Regular: require("../../assets/fonts/Graphik-Regular-Web.ttf"),
    Bold: require("../../assets/fonts/Graphik-Bold-Web.ttf"),
    Medium: require('../../assets/fonts/Graphik-Medium-Web.ttf')
});

if (!loadedFonts) {
    return <AppLoading />;
}
  return (
    <View style={{width: '100%', height: 305 }}>

    
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: 400 }}
      tabBarPosition={'bottom'}
      renderTabBar={renderTabBar}
      
      
    />
         <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0, backgroundColor: '#2436E7' }}>
        <View style={{flex: 1, height: .75, backgroundColor: 'black', }} />
      </View>
    <View style={{height: 15, backgroundColor: '#2436E7', zIndex: 0}}></View>
    </View>
  );
}