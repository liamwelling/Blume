import { View, Text, StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useFonts } from "expo-font";
import NewsCard from '../../components/NewsCard1';
import axios from 'axios'
import { EXPO_PUBLIC_SERVER_URL } from '@env';
import SplashScreenBlume1 from '../SplashScreenBlume1';






const NewsForYou = () => {

  const [stockNews, setStockNews] = useState([]);

  const getNews = async () => {
    axios.get(EXPO_PUBLIC_SERVER_URL + `/news`).then(
      (response) => {
        // console.log(response.data)
        setStockNews(response.data)
    })
  }
  const getAllInvestors = async () => {
    axios.get(EXPO_PUBLIC_SERVER_URL + `/investors/getall/`).then(
      (response) => {
        // console.log(response.data);
      }
    )
  }

  useEffect(() => {
    
    getNews()
    // axios.get(`https://api.polygon.io/v2/reference/news?limit=3&apiKey=KxWufj3XvOHL844CeJUPh5DQFp_5F06n`).then(res => {
    //   // console.log(res.data.results);
    //   setStockNews(res.data.results);
       
    // });
  }, []);

  const [loadedFonts] = useFonts({
    Regular: require("../../assets/fonts/Graphik-Regular-Web.ttf"),
    Bold: require("../../assets/fonts/Graphik-Bold-Web.ttf"),
    Medium: require('../../assets/fonts/Graphik-Medium-Web.ttf')
});
if (!loadedFonts) {
  return <SplashScreenBlume1 />;
}
  return (
    <View style={{marginTop: 30}}>
      <Text style={{fontFamily: "Medium", fontSize: 20, color: '#2436E7', textAlign: 'left', marginBottom: 20}}
      onPress={() => {getAllInvestors()}}
      >
        For You
       </Text>
       {stockNews && stockNews.map((article: any, index) =>{
         return (
          <NewsCard 
            key={index}
            image={article.image_url} 
            date={article.date}
            source={article.source}
            title={article.headline} 
            description={article.story}
          />
          )
       })}
       
    </View>
  )
}

export default NewsForYou