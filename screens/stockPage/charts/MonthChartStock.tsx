import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";
import moment from 'moment';
import axios from 'axios'
import useStockStore from '../../../stateManagement/StockContext';
import { EXPO_PUBLIC_SERVER_URL } from '@env';

const MonthChartVI = () => {
  const chartWidth = Dimensions.get("window").width;
  const store = useStockStore();
  const selectedTicker = store.stockTicker
  const selectedType = store.stockType
  const [monthData, setMonthData] = useState([])
  const month = moment().subtract(30,'d').format('YYYY-MM-DD');
  const date = new Date(month).valueOf();

  const todaysDate = moment().format("YYYY-MM-DD");
  const monthRange = moment().subtract(30, 'days').format("YYYY-MM-DD")
  // useEffect(() => {
    
  //   axios
  //     .get(`https://api.polygon.io/v2/aggs/ticker/${selectedTicker}/range/3/minute/${monthRange}/${todaysDate}?adjusted=true&sort=asc&limit=120&apiKey=KxWufj3XvOHL844CeJUPh5DQFp_5F06n`)
  //     .then(response => 
  //      { 
  //       //  console.log(response.data.results);
  //       // setDayOpenData(Object.values(response.data.data.items).map((v) => (v.open)));
  //       setMonthData(response.data.results);
  //       }
        
  //       );
  // }, []);
  const getStockData = async () => {
    const rangeDay = 'month';
    axios.get(EXPO_PUBLIC_SERVER_URL + `/stock/stock_history/`, {
      method: "GET",
      headers: {
        range: rangeDay,
        ticker: selectedTicker,  
        type:  selectedType
      },
    }).then((response: any) => {
      // console.log(response.data.priceHistory[0].quotes.map((i: any) => {return{close: i.close, time: i.timestamp}}))
       setMonthData(response.data.priceHistory[0].quotes.map((i: any) => {return{close: i.close, time: i.timestamp}}));
    })
  }
  useEffect(() => {
    getStockData()
  }, []);
  
    const monthChartData =  monthData.map((i:any) => i.close);
  const [data] =  useState([1,1])

  return (
    <View>
      
      {/* <VictoryChart width={chartWidth}> */}
      <View style={{height: 260, backgroundColor: 'white', justifyContent:'center'}}>
        
      <VictoryLine
        height={250}
        width={chartWidth}
        padding={0}
        style={{
          data: { stroke: "#8DC63FEB" },
          parent: { border: "1px solid #ccc"}
        }}
        data={monthChartData.length > 0? monthChartData : data}
      />

    </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  }
});


export default MonthChartVI