import { View, Text, StyleSheet,  Keyboard, TextInput, Pressable, Image, Modal } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import StockCard1 from '../../components/StockCard1';
import StockPage from '../stockPage/StockPage';
import { PanGestureHandler, PanGestureHandlerGestureEvent, ScrollView } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Searchbar } from 'react-native-paper';
import useStockStore from '../../stateManagement/StockContext';
import useUserStore from '../../stateManagement/UserContext';
import debounce from 'lodash/debounce';
import { EXPO_PUBLIC_SERVER_URL } from '@env';


const BrowseStocks = () => {
  const [text, onChangeText] = React.useState('Search');
  const store = useStockStore();
  const userStore = useUserStore();
  const navigation: any = useNavigation();
  
  const stockTickerList = ['MSFT', 'F', 'AMZN', 'TSLA', 'NVDA', 'META', 'JPM', 'XOM']
  const [currentStockList, setCurrentStockList] = useState<string | any>(stockTickerList);
  const [input, setInput] = useState('');
  const [snapshots, setSnapshots] = useState([])
  const [searched, setSearched] = useState(false)

  const getMyStocksSnapshot = async () => {
    axios.get(EXPO_PUBLIC_SERVER_URL + `/stock/stock_snapshots/`, {
      method: "GET",
      headers: {
        ticker: stockTickerList.toString()
      }
    }).then((response: any) => {
      if (response == 'Empty'){
        // console.log(response)
      } else {
        setSnapshots(response.data);
        // console.log(response.data.map((i: any) => i))
      }
      
     
    })
   }
   const [keyboardStatus, setKeyboardStatus] = useState(true);

   useEffect(() => {
     const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
       setKeyboardStatus(false);
     });
     const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
       setKeyboardStatus(true);
     });
 
     return () => {
       showSubscription.remove();
       hideSubscription.remove();
     };
   }, []);
///debounce search 
const [search, setSearch] = useState([]);
const [showSearch, setShowSearch] = useState(false);
const [equities, setEquities] = useState([])
const [funds, setFunds] = useState([])

//working search
const onChange = async (e: any) => {
  if (e.length > 0) {
    await sendSearch(e).then((response:any) => {
      console.log(response.map((i: any) => i));
      setEquities(response.map((i: any) => i));
    })

  } else {
    setSearch([]);
    setShowSearch(false);
  }
}

const debouncedOnChange = useMemo(() => debounce(onChange, 300), []);

const [loading, setLoading] = useState(true)
const [searchResponse, setSearchResponse] = useState([])
const sendSearch = async (input:any) => {
  setLoading(false)
  let searchTicker = `${input}`.toUpperCase()

  axios.get(EXPO_PUBLIC_SERVER_URL + `/stock/search2.0/`, {
    method: "GET",
    headers: {
      ticker: `${searchTicker}`,
    },
  }).then((response: any) => {
    console.log(response.data)
    setSearchResponse(response.data);
    setSearched(true)
    //  setEquities(response.data.equity.map((i:any) =>  i))
    //  setFunds(response.data.fund.map((i:any) => i))
    setLoading(true)
  })
}

useEffect(() => {
  getMyStocksSnapshot()
},[])


useEffect(() => {
  sendSearch
},[input])

// const equity1 = searchResponse?.map((i:any) => {return i.equity})
// const fund1 = searchResponse?.map((i:any) => {return i.fund})

  // useEffect(() => {
  //   axios.get(`http://localhost:8080/stock/search/`, {
  //     method: "GET",
  //     headers: {
  //       ticker: currentStockList,
  //     },
  //   }).then((response: any) => {
  //     console.log(response.data)
  //     // console.log(response.json())
  //   })
  //   // axios.get(`https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?tickers=${currentStockList}&apiKey=KxWufj3XvOHL844CeJUPh5DQFp_5F06n`).then(res => {
  //   // console.log(res.data.tickers)
  //   // // console.log('i fire once');
  //   // setEquities(res.data.tickers); 
  //   // });

  // }, [currentStockList]);



 
  const handleChange = (text: any) => {
    // text.preventDefault();
    setInput(text);
    if (text.length > 0) {
      return setCurrentStockList(() => (text.toUpperCase()));
    } else {
      return setCurrentStockList(stockTickerList);
    }
  }

  const [modalVisible, setModalVisible] = useState(false);
  const ModalToggle = () => {
       setModalVisible(!modalVisible)
    }
  const [selectedTicker, setSelectedTicker] = useState('');

  
  const StockRow = ( props: any) => {

    const [stockIcon, setStockIcon] = useState([]);
    const [stockName, setStockName] = useState([]);
  
    // useEffect(() => {
    //   axios.get(`https://api.polygon.io/v3/reference/tickers/${stock.ticker}?apiKey=KxWufj3XvOHL844CeJUPh5DQFp_5F06n`).then(res => {

    //       setStockName(res.data.results.name);
    //       // setStockIcon(res.data.results.branding.icon_url);
    //   });
    // }, []);
    return(
      // <View key={stock.ticker} style={stock.ticker == selectedTicker? styles.selectedStockCardContainer : styles.stockCardContainer}>
      <View key={props.ticker} style={styles.stockCardContainer}>
      <View>
       
        
      </View>
      
      <View style={styles.stockTextContainer}>
       <Text style={styles.stockName}>{(props.name?.length) > 25 ?
    `${props.name.substring(0, 25)}...` : props.name
  }</Text>
       <Text style={styles.stockTicker}>{props.ticker}</Text>

      </View>
      <View style={styles.stockTextContainerRight}>
       <Text style={styles.stockPrice}>${props.price}</Text>
       <Text style={styles.stockPercent}><Text style={ props.todaysChange > 0 ? { color:'green'} : {color : 'red'} }>{props.todaysChange?.toFixed(2)} ({props.todaysChangePerc?.toFixed(2)})%</Text></Text>
 
      </View>
    </View>
    )
  
  }
  

  const [loadedFonts] = useFonts({
    Regular: require("../../assets/fonts/Graphik-Regular-Web.ttf"),
    Bold: require("../../assets/fonts/Graphik-Bold-Web.ttf"),
    Medium: require('../../assets/fonts/Graphik-Medium-Web.ttf')
  });
  if (!loadedFonts) {
    return <AppLoading />;
  }
  return (
    <View style={styles.container} >
            <Modal
           
              animationType="slide"
              transparent={true}
              visible={modalVisible}>
                <StockPage ModalToggle={ModalToggle} selectedTicker={selectedTicker}/>
            </Modal>
      <View style={styles.headerContainer}>
      <Text style={styles.headerText} >Browse Stocks</Text>

   {/* <Text>{input}</Text> */}
      </View>
      <Searchbar 
      style={styles.input}
      inputStyle={{textTransform: 'uppercase'}}
        placeholder="Search" 
        // onChangeText={(e:any) => debouncedOnChange(e)}
        onChangeText={(text) => {
          debouncedOnChange(text)
          setInput(text);
          // handleChange(text);
        }}
        value={input} />
      {/* <TextInput
        style={styles.input}
        onChangeText={setCurrentStockList(input)}
        value={input}
      /> */}
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.cardContainer, {marginBottom: keyboardStatus ? 0 : 300}]}>
    

      {input == '' ?
      <>
         {snapshots && snapshots.map((stock: any, index) => {
      return (
      <Pressable 
      key={index}
      onPress={() => {
        store.setStockTicker(`${stock[0].ticker}`); 
        store.setStockType(`${stock[0].type}`)
        ModalToggle();
      }}>

              <View
                style={{
                  paddingHorizontal: 20,
                  // paddingVertical: 20,
                  height: 100,
                  // width: 350,
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
        <StockRow  
          name={stock[0].name} 
            ticker={stock[0].ticker} 
            price={stock[0].price}
            // price={stock.day.c > 0 ? stock.day.c : stock.prevDay.c} 
            todaysChange={stock[0].change} 
            todaysChangePerc={stock[0].changePercent}/>
        </View>
        </Pressable>

       )
      })}
      </>
      : 
      <>
               {searchResponse && searchResponse.map((stock: any, index) => {
      return (
        <Pressable 
        key={index}
        onPress={() => {
          // setSelectedTicker(`${stock.ticker}`); 
          store.setStockTicker(`${stock.ticker}`); 
          store.setStockType(`${stock.type}`)
          ModalToggle()
        }}
          
        >
        
      <View
        key={index}
        style={{
        paddingHorizontal: 20,
        // paddingVertical: 20,
        height: 100,
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <StockRow  
        name={stock.name} 
        ticker={stock.ticker} 
        price={stock.price}
            // price={stock.day.c > 0 ? stock.day.c : stock.prevDay.c} 
        todaysChange={stock.change} 
        todaysChangePerc={stock.changePercent}
      />
        
        </View>
      
        </Pressable>
      
       )
      })}
      </> 
      }
  
       
      </View>
      </ScrollView>

    </View>
  )
}
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  
  // },
  input: {
    height: 40,
    // margin: 12,
    borderWidth: 1,
    paddingLeft: 15,
    borderRadius: 100,
    borderColor: '#C5C5C5',
    color: '#C5C5C5',
    width: 350,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
    shadowColor: '#171717',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerContainer:{
    marginTop: 100,
    marginLeft: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30
  
  }, 
  headerText: {
    fontFamily: 'Medium',
    fontSize: 22
  }, 
  addLogo: {
    marginRight: 30
  },
  cardContainer: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    showsVerticalScrollIndicator: false,
    
},
backTextWhite: {
    color: '#FFF',
},
rowFront: {
    alignItems: 'center',
    backgroundColor: 'white',

    justifyContent: 'center',
    height: 100,
},
rowBack: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    height: 100
},
backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20
},
backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
},
backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    height: 80
},
stockLogo: {
  width: 57,
  height: 57,
  borderRadius: 30,
  // backgroundColor: 'blue',
  
  marginLeft: 12,
  marginRight: 15,
},
stockName: {
  fontFamily: 'Regular',
  fontSize: 18
},
stockPercent: {
  fontFamily: 'Medium',
  fontSize: 14,
  textAlign: 'right'
},
stockTicker: {
  fontFamily: 'Regular',
  fontSize: 14
},
stockPrice: {
  fontFamily: 'Medium',
  fontSize: 14,
  textAlign: 'right'
},
stockTextContainer: {
height: 50,
marginLeft: 15,
 display: 'flex',
 flexDirection: 'column',
 justifyContent: 'space-evenly',

},
stockTextContainerRight: {
   height: 50,
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'space-evenly',
   textAlign: 'right',
   marginLeft: 'auto',
   marginRight: 14

  },
stockCardContainer: {
  marginTop: 20,
  width: 350,
  height: 85,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  // justifyContent: 'space-between',
  backgroundColor: '#FFFFFF',
  borderRadius: 10,
  shadowColor: '#171717',
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 12,
  marginBottom: 20

}

});

export default BrowseStocks