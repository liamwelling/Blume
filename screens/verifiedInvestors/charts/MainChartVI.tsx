import  React, {useState} from 'react';
import { View, useWindowDimensions, Text, StyleSheet, Dimensions } from 'react-native';
import { color } from 'react-native-reanimated';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import DayChartVI from './DayChartVI';
import WeekChartVI from './WeekChartVI';
import MonthChartVI from './MonthChartVI';
import YearChartVI from './YearChartVI';
import AllChartVI from './AllChartVI';
import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";
import FontPath from '../../../assets/fonts/FontPath';


const renderScene = SceneMap({
  day: DayChartVI,
  week: WeekChartVI,
  month: MonthChartVI,
  year: YearChartVI,
  all: AllChartVI
});
interface historicalChartDataProps {
  x: number;
  y: number;
}

const MainChartVI = (historicalChartData: any) => {
  const chartWidth = Dimensions.get("window").width;
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
      {historicalChartData && historicalChartData.map((i:any) => {
        return (<Text>{i.ROI}</Text>)
      })}
<VictoryChart
  theme={VictoryTheme.material}
>
  <VictoryLine
    style={{
      data: { stroke: "#c43a31" },
      parent: { border: "1px solid #ccc"}
    }}
    data={[1,2,4]}
  />
</VictoryChart>
{/* 
  
      <View style={{marginTop: -250}}> */}
      {/* <VictoryLine
        height={250}
        width={chartWidth}
        padding={0}
        style={{
          data: { stroke: "#8DC63FEB" },
          parent: { border: "1px solid #ccc", boxShadow: 1}
        }}
        data={data2}
      /> */}

      {/* </View> */}
    {/* <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: 400 }}
      tabBarPosition={'bottom'}
      renderTabBar={renderTabBar}
      
    /> */}
    </View>
  );
}

export default MainChartVI