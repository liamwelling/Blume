import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import FontPath from '../assets/fonts/FontPath';
import RenderHtml from 'react-native-render-html';


const NewsCard2 = (props: any) => {
  const source = {
    html: `${props.description}`
  };

const [readMore, setReadMore] = useState(false)
const toggleReadMore = () => setReadMore(value => !value);
  const [loadedFonts] = useFonts({
    Regular: require("../assets/fonts/Graphik-Regular-Web.ttf"),
    Bold: require("../assets/fonts/Graphik-Bold-Web.ttf"),
    Medium: require('../assets/fonts/Graphik-Medium-Web.ttf')
});


if (!loadedFonts) {
    return <AppLoading />;
}
  return (
<Pressable onPress={() => {toggleReadMore(); console.log(props.title)}}>

    <View style={styles.newsContainer}  >
      <View style={styles.textContainer}>
      <Text style={styles.titleText}>
        {/* {props.title.length > 25 ?
    `${props.title.substring(0, 90)}...` : props.title
  } */}
  {props.title}
  </Text>
      {/* <Text style={styles.storyText}>{props.description?.length > 25 ?
    `${props.description.substring(0, 80)}...` : props.description
  }</Text> */}
  {readMore? <RenderHtml source={source}/> : null}
  
  </View>

        <Image style={styles.newsPhoto}
       source={{
         uri: `${props.image}`,
       }}
     />
    </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: 320,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 10
  },
  newsContainer: {
    width: 350,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20
  },
  newsPhoto: {
    width: 120,
    // height: 120,
    // backgroundColor: 'grey',
    borderRadius: 10,
   
    marginRight: 10
  },
  titleText: {
    
    fontFamily: 'Medium',
    fontSize: 18,
    marginBottom: 10,
    lineHeight: 20,
    marginRight: 'auto'
  },
  storyText: {
    width: 350,
    fontFamily: 'Regular',
    fontSize: 13,
    lineHeight: 20,
   
  }

  
});

export default NewsCard2