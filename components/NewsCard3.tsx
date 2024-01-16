import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import FontPath from '../assets/fonts/FontPath';
import RenderHtml from 'react-native-render-html';


const NewsCard3 = (props: any) => {
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
  {readMore? 
  <RenderHtml  
    contentWidth={360}
    source={source} 
    tagsStyles={{
      li: {
        lineHeight: 20,
        fontSize: 13,
        paddingBottom: 10,
        // color: '#000000b3',
        // listStyleType: 'none',
        fontFamily: 'Regular',

      },
      ul: {
        // color: '#1890ff',
        paddingLeft: 10,
        marginVertical: 0,
        // listStyleType: 'none',
        fontFamily: 'Regular',

      },
    }}  /> 
  : 
    null
  }
  
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
    width: 300,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10
  },
  newsContainer: {
    width: 350,
    // height: 150,
    display: 'flex',
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 12,
    marginBottom: 20
  },
  newsPhoto: {
    width: 120,
    height: 120,
    // backgroundColor: 'grey',
    borderRadius: 10,
   
    marginRight: 10
  },
  titleText: {
    
    fontFamily: 'Medium',
    fontSize: 16,
    paddingBottom: 10,
    lineHeight: 18
  },
  storyText: {
    fontFamily: 'Regular',
    fontSize: 13,
    lineHeight: 20,
   
  }

  
});

export default NewsCard3