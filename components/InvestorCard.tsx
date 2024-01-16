import { View, Text, StyleSheet, Image, Modal } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Navigation';
import * as SplashScreen from 'expo-splash-screen';


SplashScreen.preventAutoHideAsync();

// interface Props {
//   name: string;
//   bio: string;
//   risk: string;
//   photo: any;

// }

  const InvestorCard = (props: any) => {

  //  const reader = new FileReader();
  // var blobUrl = URL.createObjectURL("props.photo");
  //   reader.readAsDataURL(props.photo); 
  //   reader.onloadend = function() {
  //       var base64data = reader.result;                
  //       console.log(base64data);
  //       return;
  //   }
  // const urii = URL.createObjectURL(props.photo);
  // function capitalizeFirstLetter(string: string) {
  //   if (string.length == 0) {
  //     return
  //   } else {
  //     return string[0].toUpperCase() + string.slice(1);
  //   }
  // }
  function capitalizeFirstLetter(string: string) {
    return string[0].toUpperCase() + string.slice(1);
  } 
  const [fontsLoaded] = useFonts({
    Regular: require("../assets/fonts/Graphik-Regular-Web.ttf"),
    Bold: require("../assets/fonts/Graphik-Bold-Web.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View  style={styles.investorCardContainer}>
      <View>
      <Image style={styles.investorPhoto} source={{ uri: `${props.imageURL}`}} />
        
      </View>
      
      <View style={styles.investorTextContainer}>
       <Text  style={styles.investorName}>
          {capitalizeFirstLetter(props.firstName)} {capitalizeFirstLetter(props.lastName)}
        </Text>
       <Text style={styles.investorStats}>ROI: {Number(props.roi).toFixed(2)}% Risk {props.risk != null && capitalizeFirstLetter(props.risk)}</Text>
       <View>
       <Text numberOfLines={3} ellipsizeMode='tail' style={styles.investorBio}>{props.bio?.length > 25 ?
    `${props.bio.substring(0, 110)}...` : props.bio}
    </Text>
       </View>
       
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    
  },
  investorPhoto: {
    width: 57,
    height: 57,
    borderRadius: 30,
    // backgroundColor: 'blue',
    marginTop: 12,
    marginLeft: 12,
    marginRight: 12,
  },
  investorName: {
    fontFamily: 'Medium',
    fontSize: 16,
    marginTop: 20
  },
  investorStats: {
    fontFamily: 'Medium',
    fontSize: 14,
    marginTop: 10
  },
  investorBio: {
    fontFamily: 'Regular',
    fontSize: 14,
    marginTop: 10,
    flexShrink: 1

  },
  investorStatsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  investorTextContainer: {
  height: 150,
   width: 250,
   display: 'flex',
   flexDirection: 'column',
   paddingBottom: 10
  //  justifyContent: 'space-evenly',

  },
  investorCardContainer: {
    width: 360,
    height: 130,
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
    elevation: 10,
    marginBottom: 20
  //   background: #FFFFFF 0% 0% no-repeat padding-box,
  // box-shadow: 0px 3px 6px #0000003B,
  }
  
});

export default InvestorCard