import { View, StyleSheet, Text, ScrollView, Platform } from 'react-native'
import React, { useState } from 'react'
import SwitchSelector from "react-native-switch-selector";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import InvestorUpdates from './InvestorUpdates';
import StockNews from './StockNews';
import  fakeInboxUpdates  from './FakeUpdates'
import axios from 'axios';
import StripeTest from '../StripeTest';
import { Margin } from '@mui/icons-material';
const SwitchSelect = SwitchSelector as any; 

const Inbox = () => {
  const [updates, setUpdates] = useState(fakeInboxUpdates)
  const unreadMessages = updates.map((update) => {
    return {...update, notifications: update.notifications.filter((notification) => notification.unread === true)}
  })
const [notificationCount, setNotificationCount] = useState(0);
  // const getNotifications = (userID: number) => {
  //   axios.get(`http://localhost:8080/notifications/14`).then(
  //     (response) => {
  //       console.log(response.data)
  //       setNotifications(response.data)
  //     }
  //   )
  // }



  const finalMessages =  unreadMessages.filter(update=> update.notifications.length > 0)
  const count = finalMessages.map(i => i.notifications)
  const [messageCount, setMessageCount] = useState(finalMessages)
  const notificationNumber = () => {
    return (
      <View style={styles.notificationNumber}>
        <Text style={styles.notificationNumberText} >{notificationCount}</Text>
      </View>
    )
  }
  const [selectedOption, setSelectedOption] = useState(true)
  const options = [
    { label: "Investor Updates", value: true, customIcon: notificationNumber },
    { label: "Stock News", value: false },
    
  ];

  const [loadedFonts] = useFonts({
    Regular: require("../../assets/fonts/Graphik-Regular-Web.ttf"),
    Bold: require("../../assets/fonts/Graphik-Bold-Web.ttf"),
    Medium: require('../../assets/fonts/Graphik-Medium-Web.ttf')
});

if (!loadedFonts) {
    return <AppLoading />;
}
  return (
<ScrollView>
  
     <View style={styles.container} >
      <View style={styles.headerContainer}>
      <Text style={styles.headerText} >My Inbox</Text>
 
      </View>
      <View style={{width: 350, marginLeft: 'auto', marginRight: 'auto'}} >
      <SwitchSelect
        options={options}
        initial={0}
        borderColor={'#0000001F'}
        backgroundColor={'#0000001F'}
        borderWidth={1}
        buttonMargin={2}
        buttonColor={'white'}
        height={30}
        textStyle={{ fontFamily: 'Medium',}}
        selectedTextStyle={{ fontFamily: 'Medium',  }}
        selectedColor={'#2436e7'}
        onPress={() =>{setSelectedOption(!selectedOption)}}
      /> 
      </View>
{selectedOption? <InvestorUpdates setNotificationCount={setNotificationCount}/> : <StockNews/>}
    </View> 
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  notificationNumberText: {
    fontFamily: 'Medium',
    color: 'white',
    marginLeft:  Platform.OS === 'ios' ? 5.5 : 'auto',
    marginRight: 'auto',
    marginTop: Platform.OS === 'ios' ? 3 : -1,
    marginBottom: 'auto',
    // margin: 'auto',
  },
  notificationNumber: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#69AA0F',
    display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginRight: 10,
    marginLeft: -5
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



});

export default Inbox