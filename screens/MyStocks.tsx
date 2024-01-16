import {   
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Image, 
  Pressable,
  Modal
} from 'react-native'
import React, {useState, useEffect, useCallback, useRef} from 'react'
import axios, { AxiosResponse } from 'axios';
import StockCard1 from '../components/StockCard1'
// import { AnimatedStyle } from 'react-native-reanimated/lib/types/lib/reanimated2/commonTypes';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, Swipeable } from 'react-native-gesture-handler';
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import StockPage from './stockPage/StockPage';
import useStockStore from '../stateManagement/StockContext';
import useUserStore from '../stateManagement/UserContext';
import { Close } from '@mui/icons-material';
import { Button, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';
import { EXPO_PUBLIC_SERVER_URL } from '@env';



const MyStocks = () => {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
   const [popupTicker, setPopupTicker] = useState('')
   const [popupName, setPopupName] = useState('')
  const navigation: any = useNavigation();

  const store = useStockStore();
  const userStore = useUserStore();

  const [stockInfo, setStockInfo] = useState([])
  const storeStocks = userStore.MyStocks
  const stockTickerList = ['MSFT', 'F', 'AMZN', 'TSLA', 'NVDA']
  const [currentStockList, setCurrentStockList] = useState(storeStocks);

  const swipeableRef = useRef<Swipeable>(null);
  /// Atom
 const stockString = storeStocks.toString()
 const [snapshots, setSnapshots] = useState([])
 const unqStoreStocks = [...new Set(storeStocks)];
 const getMyStocksSnapshot = async () => {
  axios.get(EXPO_PUBLIC_SERVER_URL + `/stock/stock_snapshots/`, {
    method: "GET",
    headers: {
      ticker: unqStoreStocks.toString()
    }
  }).then((response: any) => {
    if (response == 'Empty'){
      console.log(response)
    } else {
      setSnapshots(response.data.map((i: any) => i))
      console.log(response.data.map((i: any) => i))
    }
    
   
  })
 }
useEffect(() => {
  getMyStocksSnapshot();
},[userStore.MyStocks])


// const filteredSnapshots =  [...new Set(snapshots)];
const stockChange = () => {
  setCurrentStockList(["TSLA", "F"])
  // userStore.setMyStocks(["TSLA", "F"])
}

/// delete
const [, updateState] = useState<object>();
const forceUpdate = useCallback(() => updateState({}), []);

const deleteStock = (ticker: any) => {
  userStore.deleteMyStocks(ticker)
  hideDialog();
  axios.delete(EXPO_PUBLIC_SERVER_URL + `/mystocks/${userStore.userID}/${ticker}`).then(res => {
    console.log(res.data)
    forceUpdate();
    getMyStocksSnapshot();
  })
}

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const deleteModalToggle = () => {
      setDeleteModalVisible(!deleteModalVisible)
    }
  const [modalVisible, setModalVisible] = useState(false);
  const ModalToggle = () => {
       setModalVisible(!modalVisible)
    }
  const [selectedTicker, setSelectedTicker] = useState('');

  const StockRow = (props: any) => {

    const [stockIcon, setStockIcon] = useState([]);
    const [stockName, setStockName] = useState([]);
  
    // useEffect(() => {
    //   axios.get(`https://api.polygon.io/v3/reference/tickers/${stock.ticker}?apiKey=KxWufj3XvOHL844CeJUPh5DQFp_5F06n`).then(res => {

    //       setStockName(res.data.results.name);
     
    //   });
    // }, []);
    return(
      // <View key={stock.ticker} style={stock.ticker == selectedTicker? styles.selectedStockCardContainer : styles.stockCardContainer}>
      <View key={props.ticker} style={styles.stockCardContainer}>
    
      
      <View style={styles.stockTextContainer}>
       <Text allowFontScaling={false} style={styles.stockName}>{props.name}</Text>
       <Text allowFontScaling={false} style={styles.stockTicker}>{props.ticker}</Text>

      </View>
      <View style={styles.stockTextContainerRight}>
       <Text allowFontScaling={false} style={styles.stockPrice}>${props.price}</Text>
       <Text allowFontScaling={false} style={styles.stockPercent}><Text style={ props.todaysChange > 0 ? { color:'green'} : {color : 'red'} }>{props.todaysChange?.toFixed(2)} ({props.todaysChangePerc?.toFixed(2)})%</Text></Text>
 
      </View>
    </View>
    )
  
  }





  ///////swipe list /////
// 

const rightSwipeActions = (ticker: string) => {
  
  return (
    <Pressable
    onPress={() => { store.setStockTicker(`${ticker}`); showDialog();}}

      style={{
        backgroundColor: '#D50F0F',
        justifyContent: 'center',
        alignItems: 'flex-end',
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        height: 85, 
        marginTop: 'auto',
        marginBottom: 'auto',
        width: 70,
        // marginRight: -10,

      }}
    >
      
      <Text
        style={{
          color: 'white',
          paddingHorizontal: 10,
          fontWeight: '600',
          
          paddingVertical: 20,
        }}
      >
        Delete
      </Text>
    </Pressable>
  );
};


const [loadedFonts] = useFonts({
  Regular: require("../assets/fonts/Graphik-Regular-Web.ttf"),
  Bold: require("../assets/fonts/Graphik-Bold-Web.ttf"),
  Medium: require('../assets/fonts/Graphik-Medium-Web.ttf')
});
if (!loadedFonts) {
  return <AppLoading />;
}
  
  return (
    <Provider>
    <ScrollView style={styles.container}>
    {/* <View style={styles.container} > */}
    

        
      <View style={styles.headerContainer}>
      <Text style={styles.headerText}> My Stocks</Text>
      
        <Portal>
          <Dialog style={{backgroundColor: '#2436E7', height: 300, borderRadius: 50}} visible={visible} onDismiss={hideDialog}>
         
          <Dialog.Content style={{display: 'flex', justifyContent: 'center', }}>
              <Text onPress={hideDialog} style={{color: 'white', marginLeft: 'auto', marginRight: 20, fontFamily: 'Medium', fontSize: 28}}>X</Text>
            </Dialog.Content>
            <Dialog.Content style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'white', fontFamily: 'Medium', fontSize: 28, textAlign: 'center', lineHeight: 35}}>Are you sure you want to remove {store.stockTicker}?</Text>
              <Text onPress={() => deleteStock(store.stockTicker)} style={{color: 'white', fontFamily: 'Regular', fontSize: 14, textDecorationLine: 'underline', marginTop: 30}}>Yes please remove</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => {deleteStock(selectedTicker);}}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
      
      <View style={styles.cardContainer}>

      <Modal
        animationType="slide"
        transparent={true}
        statusBarTranslucent={true}
        visible={modalVisible}>
          
          <StockPage ModalToggle={ModalToggle} />
      </Modal>
    
    {unqStoreStocks.length == 0 ? 
   <View style={{ flex: 1, alignItems: "center", marginHorizontal: 20 }}>
   <Text style={{ fontFamily: "Regular",  fontSize: 15, marginBottom: 10 }}>
       Your stock watchlist is currently empty.
   </Text>
   <Text style={{ fontFamily: "Regular", marginBottom: 10, fontSize: 15, textAlign: 'center' }}>
       Start adding stocks to your watchlist to track your preferred stocks.
   </Text>
   <TouchableOpacity onPress={() => navigation.navigate('BrowseStocks')}>
       <Text style={{ fontFamily: "Regular", color: '#007BFF', fontSize: 20 }}> 
           Browse Stocks
       </Text>
   </TouchableOpacity>
</View>

    :
  (
    snapshots.map((stock: any, index) => {
    return (
    <Pressable key={index} onPress={() => {
      store.setStockTicker(`${stock[0].ticker}`); 
      store.setStockType(`${stock[0].type}`)
      // console.log(stock[0].ticker, stock[0].type)
      ModalToggle();
    }}>
      <Swipeable 
      ref={swipeableRef} 
        renderRightActions={() => rightSwipeActions(stock[0].ticker)}>
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
      </Swipeable>
      </Pressable>

     )
    }))
    }
     </View>
    {/* </View> */}
    </ScrollView>
    </Provider>
  )
}
const styles = StyleSheet.create({

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
    // marginLeft: 'auto',
    // marginRight: 'auto'
    display: 'flex',
    
    alignItems: 'center'

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
    right: -10,
    height: 80
},
stockLogo: {
  width: 40,
  height: 40,
  borderRadius: 30,
  backgroundColor: 'blue',
  
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
  // marginTop: 20,
  width: '100%',
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
  marginBottom: 5
},
selectedStockCardContainer: {
  // marginTop: 20,
  width: 350,
  height: 85,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  // justifyContent: 'space-between',
  backgroundColor: '#FFFFFF',
  borderRadius: 10,
  shadowColor: '#171717',
  shadowOffset: {width: 0, height: 3},
  shadowOpacity: 0.3,
  shadowRadius: 4,
  elevation: 12,
  marginBottom: 5, 
  borderColor: 'blue',
  borderWidth: 2
},

});

export default MyStocks
// const closeRow = (rowMap: any, rowKey: any) => {
  //     if (rowMap[rowKey]) {
  //         rowMap[rowKey].closeRow();
  //     }
  // };
  
  // const deleteRow = (rowMap: any, rowKey: any) => {
  //     // closeRow(rowMap, rowKey);
  //     // const newData = [...stockInfo];
  //     // const prevIndex = stockInfo.findIndex(item => item.ticker === rowKey);
  //     // newData.splice(prevIndex, 1);
  //     // setStockInfo(newData);
  // };
  // const onRowDidOpen = (rowKey: any) => {
  //   console.log('This row opened', rowKey);
  // };
  // // const [iconURL, setIconURL] = useState(null);
  //   const [stockName, setStockName] = useState(null);
  // const renderItem = (data: AnimatedStyle) => {
  //   const stockProps = {
  //     ticker: data.item.ticker
  //   }
  
  //   // const [iconURL, setIconURL] = useState(null);
  //   // const [stockName, setStockName] = useState(null);
  
  //   // const getIcon = async (prop:any) => {
  //   //   const res = await axios.get(`https://api.polygon.io/v3/reference/tickers/${prop}?apiKey=KxWufj3XvOHL844CeJUPh5DQFp_5F06n`)
  //   //   return(res.data.results.branding.icon_url)
  //   // }
    
  //   // const getName = async (prop:any) => {
     
  //   //   const res = await axios.get(`https://api.polygon.io/v3/reference/tickers/${prop}?apiKey=KxWufj3XvOHL844CeJUPh5DQFp_5F06n`)
  //   //   return(res.data.results.name)
  //   // }
  //   // useEffect(() => {
  //   //   getIcon(data.item.ticker).then(setIconURL);
  //   //   getName(data.item.tickerr).then(setStockName);
  //   // }, []);
  //   // useEffect(() => {
  //   //   setStockName('test')
  //   // })
  //   return (
  //     <Pressable
   
  //   onPress={(ticker: any) => {navigation.navigate('StockPage', {ticker})}}
  //   // onPress={() => {navigation.navigate('StockPage')}}
  //       style={styles.rowFront}>
  //     {/* <Pressable 
  //       // ticker={data.item.ticker}
  //       // onPress={ticker => {navigation.navigate('StockPage', {ticker})}}
  //       style={styles.rowFront}> */}
  //         <View style={styles.stockCardContainer}>
  //       <View>
  //         <View style={styles.stockLogo}></View>
          
  //       </View>
        
  //       <View style={styles.stockTextContainer}>
  //        <Text style={styles.stockName}>{data.item.name}</Text>
  //        <Text style={styles.stockTicker}>{data.item.ticker}</Text>
         
         
  //       </View>
  //       <View style={styles.stockTextContainerRight}>
  //        <Text style={styles.stockPrice}>{data.item.day.c > 0 ? data.item.day.c : data.item.prevDay.c}</Text>
  //        <Text style={styles.stockPercent}><Text style={ data.item.todaysChange > 0 ? { color:'green'} : {color : 'red'} }>{data.item.todaysChange?.toFixed(2)} ({data.item.todaysChangePerc?.toFixed(2)})%</Text></Text>
         
         
  //       </View>
  //     </View>
  //     {/* </Pressable> */}
  
    
  //   </Pressable>
  //   )
  // };
  // const renderHiddenItem = (data: any, rowMap: any) => (
  //   <View style={styles.rowBack}>
       
  //       {/* <TouchableOpacity
  //           style={[styles.backRightBtn, styles.backRightBtnLeft]}
  //           onPress={() => closeRow(rowMap, data.item.key)}
  //       >
  //           <Text style={styles.backTextWhite}>Close</Text>
  //       </TouchableOpacity> */}
  //       <TouchableOpacity
  //           style={[styles.backRightBtn, styles.backRightBtnRight]}
  //           onPress={() => deleteRow(rowMap, data.item.name)}
  //       >
  //           <Text style={styles.backTextWhite}>Delete</Text>
  //       </TouchableOpacity>
  //   </View>
  // );