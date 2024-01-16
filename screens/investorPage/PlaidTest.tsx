import {StyleSheet, View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { DataItem, Categories, ErrorDataItem, Data } from "./dataUtilities";
import { EXPO_PUBLIC_SERVER_URL } from '@env';

interface Props {
  endpoint: string;
  name?: string;
  categories: Array<Categories>;
  schema: string;
  description: string;
  transformData: (arg: any) => Array<DataItem>;
}
const PlaidTest = () => {
  const [contacts, setContacts] = useState([]);
  // const [error, setError] = useState(null);


  const [showTable, setShowTable] = useState(false);
  const [transformedData, setTransformedData] = useState<Data>([]);
  const [pdf, setPdf] = useState<string | null>(null);
  const [error, setError] = useState<ErrorDataItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState([])

  const [totalBalance, setTotalBalance] = useState(0)
  const [totalAvailable, setTotalAvailable] = useState(0)
  const [holdings, setHoldings] = useState([])
  const [securities, setSecurities] = useState([])
  const [mergedList, setMergedList] = useState([])
  // const totalInvested = responseData.accounts[0].balances.current
  const mergeById = (a1: any, a2: any) =>
  a1.map((itm: any) => ({
      ...a2.find((item: any) => (item.security_id === itm.security_id) && item),
      ...itm
  }));



  type getDataValues = {
    investorID: number;
  };
  // useEffect(() => {
  //   getData(11)
  // }, []);
  const getData = (investorID: number) => {
    setIsLoading(true);
    axios.get(EXPO_PUBLIC_SERVER_URL + `/api/holdings/`, { 
      
      method: "GET",
      headers: {
        // Enabling the next line will solve the error, but it shouldn't make a difference
        // 'Content-Type': 'application/json',
        investorID: investorID,
        
      }, 
      
    }).then((response) => {
      console.log(response.data)
      setResponseData(response.data.holdings)
      setTotalBalance(response.data.balance.accounts[0].balances.current)
      setTotalAvailable(response.data.balance.accounts[0].balances.available)
      // setHoldings(response.data.holdings.holdings.filter((i: any) => i.security_id != "7dD8KV8owvUgk4Zqk1e3tLPy8Kyr9dFQbMyQQ"))
      // setSecurities(response.data.holdings.securities.filter((i: any) => i.security_id != "7dD8KV8owvUgk4Zqk1e3tLPy8Kyr9dFQbMyQQ"))
      // console.log(response.data.holdings)
      // // console.log(response.data.holdings.holdings.map((i: any) => i.security_id))
      // // console.log(response.data.holdings.securities.map((i: any) => i.security_id))
      // setMergedList(mergeById(response.data.holdings.holdings.filter((i: any) => i.security_id != "7dD8KV8owvUgk4Zqk1e3tLPy8Kyr9dFQbMyQQ"), response.data.holdings.securities.filter((i: any) => i.security_id != "7dD8KV8owvUgk4Zqk1e3tLPy8Kyr9dFQbMyQQ")));
    });
  };
  const options = {
    method: 'POST',
    headers: {accept: 'application/json', 'content-type': 'application/json'},
    body: JSON.stringify({
      asset: {identifier: 'ticker', value: 'JPM', assetType: 'equity', market: 'USA'}
    })
  };
  const atomTest = async () => {
    try {
      const response = await fetch('https://platform.atom.finance/api/2.0/equity/overview?api_key=77c1532c-f4c7-49ba-86b8-465454b37ae1', options);
      const response_1 = await response.json();
      return console.log(response_1.lists[0].name);
    } catch (err) {
      return console.error(err);
    }
  }
  let arr = [1,2,3]
 
  const [newArr, setNewArr] = useState<any>([])
  const arrayTest = () => {
    arr.forEach(element => atomTest().then(
      response => setNewArr((newArr: any) =>[...newArr, response])
    ))
  }
  const stockTest = () => {
    axios.post('https://platform.atom.finance/api/2.0/equity/overview?api_key=77c1532c-f4c7-49ba-86b8-465454b37ae1',
    {
      method: 'POST',
      headers: {accept: 'application/json', 'content-type': 'application/json'},
      body: JSON.stringify({
        asset: {identifier: 'ticker', value: 'F', assetType: 'equity', market: 'USA'}
      })
    }
    ).then((response) => {
      console.log(response.data.lists)
    })
  }
  // fetch('https://try.readme.io/https://platform.atom.finance/api/2.0/equity/overview?api_key=77c1532c-f4c7-49ba-86b8-465454b37ae1', options)
  //   .then(response => response.json())
  //   .then(response => console.log(response.data))
  //   .catch(err => console.error(err));
  return (
    <View>

      <Text onPress={() => getData(11)}>PlaidTest </Text>
      {/* <Text>TOTAL: {totalBalance - totalAvailable}</Text> */}
      {responseData && responseData.map((i: any, index) => {
        return (
<Text>{i.name} {i.type} : {i.industry} 
{Math.round(i.institution_value  / (totalBalance - totalAvailable) * 100)}
%</Text>
        )
        
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  
  },
});

export default PlaidTest