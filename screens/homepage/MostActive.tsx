import { View, Text,  Pressable, Modal, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import StockCard1 from '../../components/StockCard1';
import StockPage from '../stockPage/StockPage';
import useStockStore from '../../stateManagement/StockContext';
import { EXPO_PUBLIC_SERVER_URL } from '@env';


const MostActive = ({stockModalToggle}: any) => {

  const stockStore = useStockStore();

  const [stockInfo, setStockInfo] = useState([])




  const stockTickerList = ['AAPL', 'MSFT', 'AMZN', ]
  const [currentStockList, setCurrentStockList] = useState(stockTickerList);
  // useEffect(() => {

  //   axios.get(`https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?tickers=${currentStockList}&apiKey=KxWufj3XvOHL844CeJUPh5DQFp_5F06n`).then(res => {
  //   // console.log(res.data.tickers)
  //   // console.log('i fire once');
  //   setStockInfo(res.data.tickers);
       
  //   });
  // }, [currentStockList]);
  // useEffect(() => {
  //   axios.get(`https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/gainers?apiKey=KxWufj3XvOHL844CeJUPh5DQFp_5F06n`).then(res => {
  //   console.log(res.data.tickers.ticker)
  //   console.log('i fire once');
  //   setStockInfo(res.data.tickers);
       
  //   });
  // }, []);
  const [snapshots, setSnapshots] = useState([])
  const getSnapshots = async () => {
    axios.get(EXPO_PUBLIC_SERVER_URL + `/stock/stock_snapshots/`, {
      method: "GET",
      headers: {
        ticker: 'GM,NVDA,META'
      }
    }).then((response) => {
      // console.log(response.data)
      setSnapshots(response.data.map((i: any) => i))
      //  console.log(response.data.map((i: any) => i))
      // console.log(response.data.map((e: any) =>{ return { ...e.asset, ...e.snapshot}}))
      // console.log(response.data.map((i: any) => i))
    })
  }
  useEffect(() => {
    getSnapshots();
  },[])
  return (
    <View style={{ marginTop: 30}}>
      <View style={styles.innerContainer}>
      <Text style={{fontFamily: "Medium", fontSize: 20, color: '#2436E7',textAlign: 'left', marginLeft: 5, marginBottom: 20}}>
       Most Active
     
      </Text>
      </View>
      {/* {snapshots && snapshots.map((stock: any) => {
        return (
          <Text>stock:{stock[0].name}</Text>
        )
       })} */}

      {snapshots && snapshots.map((stock: any, index) => {
        return (
        <Pressable
        key={index}
        onPress={() => {
          stockStore.setStockType(`${stock[0].type}`)
          stockStore.setStockTicker(stock[0].ticker); 
          stockModalToggle();
      }}>
          <StockCard1 
            name={stock[0].name} 
            ticker={stock[0].ticker} 
            price={stock[0].price}
            // price={stock.day.c > 0 ? stock.day.c : stock.prevDay.c} 
            todaysChange={stock[0].change} 
            todaysChangePerc={stock[0].changePercent}/>
        </Pressable>
       )
      })}


    </View>
  )
}
const styles = StyleSheet.create({
  innerContainer: {
    width: 360,
    marginLeft: 'auto',
   
  },
})
export default MostActive