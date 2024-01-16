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

const AllChartVI = () => {
  const chartWidth = Dimensions.get("window").width;
  const store = useStockStore();
  const selectedTicker = store.stockTicker
  const selectedType = store.stockType
  const [allData, setAllData] = useState([])
  const [data] =  useState([1,1])
  const todaysDate = moment().format("YYYY-MM-DD");

  const allRange = moment().subtract(1825, 'days').format("YYYY-MM-DD")
  const date = new Date(allRange).valueOf();

  const getStockData = async () => {
    const rangeDay = 'all';
    axios.get(EXPO_PUBLIC_SERVER_URL + `/stock/stock_history/`, {
      method: "GET",
      headers: {
        range: rangeDay,
        ticker: selectedTicker,
        type:  selectedType  
      },
    }).then((response: any) => {
      // console.log(response.data.priceHistory[0].quotes.map((i: any) => {return{close: i.close, time: i.timestamp}}))
       setAllData(response.data.priceHistory[0].quotes.map((i: any) => {return{close: i.close, time: i.timestamp}}));
    })
  }

  const allChartData = allData.map((i:any) => i.close);
  useEffect(() => {
    getStockData()
  }, []);

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
        data={allChartData.length > 0? allChartData : data}
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


export default AllChartVI