import React  from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from "react-native";
const baseUrl = 'https://reqres.in';

function APItest() {
  const [advice, setAdvice] = useState([]);
  const myStockTickerList = ['AAPL', 'MSFT', 'F', 'AMZN', 'TSLA', 'NVDA' ]
  const [currentStockList, setCurrentStockList] = useState(myStockTickerList);
  const [stockInfo, setStockInfo] = useState([]);

useEffect(() => {
  axios.get(`https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?tickers=${currentStockList}&apiKey=KxWufj3XvOHL844CeJUPh5DQFp_5F06n`).then(res => {
  console.log(res.data)
  // console.log('i fire once');
  setStockInfo(res.data.tickers);
     
  });
}, [currentStockList]);
    const getRandomId = (min: number, max: number) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return (Math.floor(Math.random() * 
            (max - min + 1)) + min).toString();
    };
  
    const getAdvice = () => {
        axios
            .get("https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?tickers=F&apiKey=KxWufj3XvOHL844CeJUPh5DQFp_5F06n")
            .then((response) => {
              console.log(response.data)
                setAdvice(response.data.ticker);
            });
    };
  return (
    <View style={styles.container}>
     
      {/* {advice?.map(stock => <Text style={styles.advice}>dfgd{stock}</Text>)} */}
      { stockInfo && stockInfo.map((opt: any) => {
          return <Text>{opt.ticker}</Text>
}) }   
            <Button title="Get Advice" 
                onPress={getAdvice} color="green" />
        </View>
    
  )
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
  },
  advice: {
      fontSize: 20,
      fontWeight: "bold",
      marginHorizontal: 20,
  },
});

export default APItest