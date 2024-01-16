import { View, Text, StyleSheet, Image, Pressable, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import  fakeInboxUpdates  from './FakeUpdates'
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import {EXPO_PUBLIC_SERVER_URL} from '@env';
import useUserStore from '../../stateManagement/UserContext';


const InvestorUpdates = ({setNotificationCount}: any) => {
  const store = useUserStore()
  const [notifications, setNotifications] = useState<any[]>([]);
  const [namesArray, setNamesArray] = useState<any[]>([])
  
  function capitalizeFirstLetter(string: string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  const getNotifications = (userID: number) => {
    axios.get(EXPO_PUBLIC_SERVER_URL + `/notifications/${store.userID}`).then(
      (response) => {
        // console.log(response.data.map((i:any) => i))
        setNotifications(response.data.map((i:any) => { return (i)}))
        console.log('data::', response.data)
        // setNamesArray([...new Set(response.data.map((i: any) => i.first_name))]);
        // setNamesArray([...new Set(response.data.map((i: any) => {return {firstName: i.first_name, photoURL: i.investor_photo}}))]);
        setNamesArray(response.data.filter((notification: any, index: any, self: any) =>
        index === self.findIndex((n: any) => (
          n.investor_id === notification.investor_id
        ))
        ))
        setNotificationCount(response.data.length)
        // console.log([...new Set(response.data.map((i: any) => i.first_name))]);
      }
    )
  }

  const deleteNotification = (notificationID: number) => {
    axios.delete(EXPO_PUBLIC_SERVER_URL + `/notifications/${notificationID}`).then(
      (response) => {
        console.log(response);
        
      }
    )
  }
 


  const handleDeleteClick = (notificationID: any) => {
    // console.log(notificationID)
    const newUpdates = notifications.filter(a => a.idnotifications !== notificationID)
    setNotificationCount(newUpdates.length)
    setNotifications(newUpdates)
    deleteNotification(notificationID)
    // setNamesArray([...new Set(newUpdates.map((i: any) => i.first_name))]);
    setNamesArray(newUpdates.filter((notification, index, self) =>
index === self.findIndex((n: any) => (
  n.investor_id === notification.investor_id
))
))
    
  }
  // const updateState = (notificationID: any) => {
  //   const newState = notifications.map((obj: any) => {
  //     // 👇️ if id equals 2, update country property
  //     if (obj.idnotifications === notificationID) {
  //       return {...obj, read: '0'};
  //     }

  //     // 👇️ otherwise return object as is
  //     return obj;
  //   });

  //   setNotifications(newState);
  // };

  // add user id to this
  useEffect(() => {
    getNotifications(14);
  }, []) 
  const [showMore, setShowMore] = useState(null);
  const [loadedFonts] = useFonts({
    Regular: require("../../assets/fonts/Graphik-Regular-Web.ttf"),
    Bold: require("../../assets/fonts/Graphik-Bold-Web.ttf"),
    Medium: require('../../assets/fonts/Graphik-Medium-Web.ttf')
  });
  // if (!loadedFonts) {
  //   return <AppLoading />;
  // }
  return (
    <View>
      {/* <Text onPress={() => getNotifications(14)}>nkjn</Text>
      <Text onPress={() => console.log(notifications)}>nkjn</Text>
      <Text onPress={() => setNotifications([])}>nkfsdjn</Text> */}
      {/* <Text onPress={() => console.log(showMore)}>nkjn</Text> */}
      {namesArray.map((i: any, index: any) =>{
        const updateIndex = index;
        const firstName = i.first_name;
        const notificationSubLength = notifications.filter((e:any) => e.first_name == firstName).length
        return (
          <View style={styles.contentContainer}>
            <Pressable onPress={() => {
              setShowMore(i.investor_id);
              console.log(showMore);
              console.log(i.investor_id)
              }}>
                 <View style={styles.updateRowInbox}>
            
            <Image style={styles.investorPhoto} source={{ uri: `${i.photoURL}`}} />
            
            <Text style={styles.investorName}>{capitalizeFirstLetter(`${i.first_name}`)}</Text>
            <View style={styles.notificationNumber}>

              <Text style={styles.notificationNumberText}>{notificationSubLength}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', }}>
            <View style={{flex: 1, height: 1, backgroundColor: '#CCCCCC', marginLeft: 20, marginRight: 20}} />
          </View>
          </Pressable>
          {showMore == i.investor_id 
        && (
          <>
       
        {notifications.map((notification:any, index:any) => (
          notification.read = 'false' && notification.investor_id == i.investor_id 
          ?
          <View key={index} style={styles.updateDropdownInbox}>
          <View style={styles.updateDropdownRowInbox}>
           
          <View style={styles.leftSideDropdownRowInbox}>
              <View >
                <Text style={styles.timeInbox}>
                  {notification.date}
                </Text>
                </View>
              <View >
                <Text style={styles.messageInbox}>
                {notification.type =='sell' ? 'Sold ' : 'Bought '}{notification.asset_name}
                </Text>
              </View>
            </View>
            <Pressable  
            onPress={() => {
              console.log('delete'); 
              handleDeleteClick(notification.idnotifications);
            }} 
              >
            <View style={styles.rightSideDropdownRowInbox} >
             
              <View style={{marginLeft: 'auto', marginBottom: 15, marginTop: -15 }} >
                <AntDesign name="delete" size={20} color="#C5C5C5" />
               </View>
        
            </View>
            </Pressable>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', }}>
            <View style={{flex: 1, height: 1, backgroundColor: '#CCCCCC', marginLeft: 20, marginRight: 20}} />
          </View>
    


        </View>
        : null
        ))}
        </>
        )
        }
          </View>
        )
      })}

    </View>
  )
}
const styles = StyleSheet.create({
  updateDropdownRowInbox: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center'
  },
  timeInbox: {
    fontFamily: 'Medium',
    fontSize: 12,
    marginBottom: 10,
    color: '#CCCCCC'
  },
  messageInbox: {
    fontFamily: 'Regular',
    fontSize: 14,
    lineHeight: 17
  },
  leftSideDropdownRowInbox: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 30,
    // backgroundColor: 'pink',
    width: 280,
    // marginBottom: 10
  },
  rightSideDropdownRowInbox: {
    marginLeft: 'auto',
    marginRight: 30,
    // backgroundColor: 'blue'
  },
  dropdownRow: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row'
  },
  updateDropdownInbox: {
    display: 'flex',
    flexDirection: 'column'
  },
  notificationNumberText: {
    fontFamily: 'Medium',
    color: 'white',
    marginTop: Platform.OS === 'ios' ? 1.5 : 0,
    marginLeft: Platform.OS === 'ios' ? 1 : 0,
    marginBottom: Platform.OS === 'ios' ? 0 : 5,
  },
  notificationNumber: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#69AA0F',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
    marginLeft: 'auto'
  },
  investorName: {
    fontFamily: 'Medium',
    fontSize: 18,
    marginLeft: 20
  },
  investorPhoto: {
    width: 57,
    height: 57,
    borderRadius: 30,
  //  backgroundColor: 'blue',
    
    marginLeft: 30,
   
  },
contentContainer: {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  marginTop: 20,
  marginBottom: 20,
},
updateRowInbox: {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  // marginLeft: 'auto',
  // marginRight: 'auto',

  marginBottom: 10,
 
},

});

export default InvestorUpdates