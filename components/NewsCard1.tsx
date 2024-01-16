import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import RenderHtml from 'react-native-render-html';
import moment from 'moment';

const NewsCard1 = (props: any) => {
  const propDate = props.date

const date = new Date(propDate).valueOf();

let currentTime = null
if (Math.ceil((((Date.now() - props.date) / 60) / 60) / 60) < 24) {
  currentTime = `${Math.ceil((((Date.now() - props.date) / 60) / 60) / 60)}h`
} else {
  currentTime = `${Math.round(Math.ceil((((Date.now() - props.date) / 60) / 60) / 60) / 24)}d`
}
  const HTMLsource = {
    html: `${props.description}`
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

    <View style={styles.newsContainer} >
     
      {/* <Image style={styles.newsPhoto}
       
        HTMLsource={{
          uri: `${props.image}`,
        }}
      /> */}
      <View style={{display: 'flex', flexDirection: 'row', marginRight: 'auto', marginBottom: 10}}>
        <Text style={[styles.sourceText]}>{props.source} </Text>
        <Text style={styles.storyText}> {currentTime}</Text>
      </View>

      <Text style={styles.storyText}>{props.image}{props.title}</Text>
      <View>
      {/* <RenderHtml 
        contentWidth={350}
        source={HTMLsource}
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
        }}
      /> */}
      </View>
      {/* <Text style={styles.storyText}>{(props.description?.length) > 150 ?
    `${props.description.substring(0, 150)}...` : props.description
  }</Text> */}
     <View style={{flexDirection: 'row', alignItems: 'center', }}>
            <View style={{flex: 1, height: 1, backgroundColor: '#CCCCCC', marginLeft: 0, marginRight: 0, marginBottom: 20, marginTop: 20}} />
          </View>
    </View>
  )
}

const styles = StyleSheet.create({
  newsContainer: {
    width: 350,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20
  },
  newsPhoto: {
    width: 350,
    height: 200,
    // backgroundColor: 'grey',
    borderRadius: 10,
    marginBottom: 10
  },
  titleText: {
    // width: 350,
    fontFamily: 'Medium',
    fontSize: 18,
    marginBottom: 10,
    lineHeight: 20,
    marginRight: 'auto'
  },
  storyText: {
    width: 350,
    // height: 100,
    fontFamily: 'Regular',
    fontSize: 14,
    lineHeight: 23,
   
  },
  sourceText: {
    // width: 350,
    // height: 100,
    // fontFamily: 'Regular',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 23,
   
  }

  
});

export default NewsCard1