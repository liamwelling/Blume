import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import NewsCard1 from '../../components/NewsCard1';
import NewsCard2 from '../../components/NewsCard2';
import NewsCard3 from '../../components/NewsCard3';
import { ScrollView, Swipeable } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { Close } from '@mui/icons-material';
import { EXPO_PUBLIC_SERVER_URL } from '@env';
import useUserStore from '../../stateManagement/UserContext';

const StockNews = () => {
  const swipeableRef = useRef(null);
  const store = useUserStore();

  const [stockNews, setStockNews] = useState([]);
  const getNews = async () => {
    if (store.MyStocks.length == 0) {
      axios.get(EXPO_PUBLIC_SERVER_URL + `/news`).then(
        (response) => {
          // console.log(response.data)
          setStockNews(response.data)
      })
    } else {
      axios.get(EXPO_PUBLIC_SERVER_URL + `/related_news`, {
        method: "GET",
        headers: {
          tickers: (store.MyStocks).toString(),
        }
      }).then(
      (response) => {
        console.log('test: ', response.data)
        setStockNews(response.data)
      // console.log(response.data.map((i:any) => i.headline))
    }).catch(
      (error) => {
        
        console.log('error: ', error)
      }
    )
    }
    console.log((store.MyStocks).toString().length)
    // axios.get(SERVER_URL + `/related_news`).then(

  }

  useEffect(() => {
    getNews()
  }, []);


  /// close row and delete
  let row: Array<any> = [];
  let prevOpenedRow: any;
  const deleteArticle = (articleID: string) => {
    console.log(articleID)
    setStockNews(stockNews.filter((i: any) => i.id != articleID))
    // swipeableRef.current.close();
  }
  


//   const closeRow = (index) => {
//     if (prevOpenedRow && prevOpenedRow !== row[index]) {
// 		prevOpenedRow.close();
//     }
//     prevOpenedRow = row[index];
// }
  const rightSwipeActions = (articleID: string, index: number) => {
  
    return (
      <View
        style={{
          backgroundColor: '#D50F0F',
          justifyContent: 'center',
          alignItems: 'flex-end',
          borderBottomLeftRadius: 10,
          borderTopLeftRadius: 10,
          height: 150, 
          // marginTop: 'auto',
          // marginBottom: 20,
          width: 70
        }}
      >
        
        <Text
          style={{
            color: 'white',
            paddingHorizontal: 10,
            fontWeight: '600',
            
            paddingVertical: 20,
          }}
          onPress={() => { deleteArticle(articleID); closeRow(index)}}
        >
          <View style={{marginLeft: 0,  }}>
            <AntDesign style={{paddingRight: 30, paddingTop: 40, paddingLeft: 20}} name="delete" size={25}  color="white" />
          </View>
          
        </Text>
      </View>
    );
  };

  function closeRow(index: number) {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  }

  return (
    <View style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 50, alignSelf: 'stretch',}}>
          {/* <Text onPress={() => {console.log(stockNews)}}>test</Text> */}
      
           {stockNews && stockNews.map((article: any, index) =>{
         return (
          // <Swipeable 
          //   ref={ref => row[index] = ref} 
          //   renderRightActions={() => rightSwipeActions(article.id, index)}
           
          //   >
            <View
                style={{
                  paddingHorizontal: 20,
                  // paddingVertical: 20,
                  // height: 100,
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
           <NewsCard1
            key={index}
            image={article.image_url} 
            date={article.date}
            source={article.source}
            title={article.headline} 
            description={article.story}
          />
         </View>
        //  </Swipeable>
         )
        })}
    </View>
  )
}

export default StockNews