import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Checkbox from 'expo-checkbox';
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import FakeInvestorData from '../../../assets/FakeInvestorData';
import useInvestorStore from '../../../stateManagement/InvestorContext';
import { RadioButton } from 'react-native-paper';
import useUserStore from '../../../stateManagement/UserContext';
import { EvilIcons } from '@expo/vector-icons';
import { EXPO_PUBLIC_SERVER_URL } from '@env';

const SubVI2 = ({investorModalToggle}: any) => {

  

  ///

  const store = useInvestorStore();
  const userStore = useUserStore();
  const selectedInvestorID = store.investorID
  // const currentInvestor = FakeInvestorData.filter(i => i.id == selectedInvestorID);
  const [check, setCheck] = useState(true)
  const [checked, setChecked] = useState('first');
  const [text, onChangeText] = useState("8364 9375 0930 7302");
  const [cardNumber, setCardNumber] = useState("8364 9375 0930 7302");
  const [cardName, setCardName] = useState("Zubaedah Valcova");
  const [cardExpires, setCardExpires] = useState("22 / 20");
  const [cardCVC, setCardCVC] = useState("847");
  
const addInvestor = () => {
  axios.post(EXPO_PUBLIC_SERVER_URL + `/myinvestors/${userStore.userID}/${store.investorID}`).then(res => {
    // console.log(res.data.map((u: any)=>u.stockticker))
    userStore.setMyInvestors(res.data.map((u: any)=>u.investor_id))
    console.log(res.data.map((u: any)=>u.investor_id));
    investorModalToggle();
    // userStore.setMyStocks(res.data.map((u: any)=>u.stockticker));
    // setStockInfo(res.data.map((u: any)=>u.stockticker));
   
  })
}
const [currentInvestor, setCurrentInvestor] = useState([])

const getInvestorData = (investorID: number) => {
  axios.get(EXPO_PUBLIC_SERVER_URL + `/investors/${store.investorID}`).then(
    (response) => {
      console.log(response.data)
     setCurrentInvestor(response.data)
    })
}
useEffect(() => {
  getInvestorData(store.investorID);
  // getHistoricalInvestorData(store.investorID)
  // getData(store.investorID);
}, []);
function capitalizeFirstLetter(string: string) {
  return string[0].toUpperCase() + string.slice(1);
} 
  const [publishableKey, setPublishableKey] = useState('pk_test_51LxXBlECOUaD3S2QpWYWW4mZQFzB3eCTCTjDji9923UCTK3nN8poU2apEl9R8CinwcW5hzUcd1Mw3L0mfYqMk7zK00sPhdKhFf')
  return (
    
   <ScrollView>

    {currentInvestor.map((investor: any, index) => {
      return (
    <View style={styles.container} >
      <View style={{zIndex: 1000, flexDirection: 'row', marginBottom: -100, paddingTop: 60, width: '100%', paddingRight: 20, justifyContent: 'flex-end' }}>
        <Pressable onPress={() => investorModalToggle()}>
          <EvilIcons name="close" size={34} color="#2436E7" />
        </Pressable>
      </View>
      <View style={styles.headerContainer}>
      
      <Text style={styles.headerText} >Payment Information</Text>
      </View>

      <View style={styles.investorCardContainer}>
        <View style={styles.investorCard}>
        <Image style={styles.investorPhoto} source={{ uri: `${investor.imageURL}`}} />
          <Text style={[styles.boldText, {marginLeft: 20}]}>{capitalizeFirstLetter(investor.first_name)} {capitalizeFirstLetter(investor.last_name)}</Text>

        </View>
      </View>
      <View style={styles.formContainer}>
        <Text style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 10, marginBottom: 10, fontFamily: 'Regular', fontSize: 13, color: '#666666'}}>
          Choose your payment method
        </Text>
        <View style={styles.paymentTypeSelectRow}>
          <View>  
            <View style={styles.paymentTypeBox}>
            <Text>Visa</Text>  
            </View>       
            <RadioButton
        value="visa"
        status={ checked === 'visa' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('visa')}
      />
          </View>
          <View>  
            <View style={styles.paymentTypeBox}>
            <Text>pay pal</Text> 
            </View>        
            <RadioButton
        value="paypal"
        status={ checked === 'paypal' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('paypal')}
      />
          </View>
          <View>  
          <View style={styles.paymentTypeBox}>
            <Text>applepay</Text>  
            </View>       
            <RadioButton
        value="applepay"
        status={ checked === 'applepay' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('applepay')}
      />
          </View>

        </View>
        <View style={{flexDirection: 'row', alignItems: 'center',  marginBottom: 10}}>
          <View style={{flex: 1, height: 1, backgroundColor: '#D8D8D8', marginLeft: 0, marginRight: 0}} />
        </View>
        <View style={styles.paymentTypeRow}>
          <Text style={styles.boldText}>Card Number</Text>
          <TextInput
            style={{marginLeft: 'auto', fontFamily: 'Regular', fontSize: 17, color: '#8A8A8F'}}
            onChangeText={setCardNumber}
            value={cardNumber}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center',  }}>
          <View style={{flex: 1, height: 1, backgroundColor: '#D8D8D8', marginLeft: 0, marginRight: 0}} />
        </View>
        <View style={styles.paymentTypeRow}>
          <Text style={styles.boldText}>Card Holder</Text>
          <TextInput
            style={{marginLeft: 'auto', fontFamily: 'Regular', fontSize: 17, color: '#8A8A8F'}}
            onChangeText={setCardName}
            value={cardName}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center',  }}>
          <View style={{flex: 1, height: 1, backgroundColor: '#D8D8D8', marginLeft: 0, marginRight: 0}} />
        </View>
        <View style={styles.paymentTypeRow}>
          <Text style={styles.boldText}>Expires</Text>
          <TextInput
            style={{marginLeft: 'auto', fontFamily: 'Regular', fontSize: 17, color: '#8A8A8F', marginRight: 20}}
            onChangeText={setCardExpires}
            value={cardExpires}
          />
          <Text style={styles.boldText}>CVC</Text>
          <TextInput
            style={{marginLeft: 'auto', fontFamily: 'Regular', fontSize: 17, color: '#8A8A8F'}}
            onChangeText={setCardCVC}
            value={cardCVC}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center',  }}>
          <View style={{flex: 1, height: 1, backgroundColor: '#D8D8D8', marginLeft: 0, marginRight: 0}} />
        </View>
        <View style={styles.paymentTypeRow}>
          <Text style={{fontFamily: 'Regular', fontSize: 15, color: '#666666' }}>Save credit information</Text>
          
        </View>

        <View style={styles.paymentTypeRow}>
          <Text style={{fontFamily: 'Regular', fontSize: 17,  }}>Subtotal</Text>
          <Text style={{fontFamily: 'Regular', fontSize: 17, marginLeft: 'auto' }}>${investor.price}</Text>
        </View>

        <View style={styles.paymentTypeRow}>
          <Text style={{fontFamily: 'Regular', fontSize: 17,  }}>Tax</Text>
          <Text style={{fontFamily: 'Regular', fontSize: 17, marginLeft: 'auto' }}>${investor.price}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center',  }}>
          <View style={{flex: 1, height: 1, backgroundColor: '#D8D8D8', marginLeft: 0, marginRight: 0}} />
        </View>
        <View style={styles.paymentTypeRow}>
          <Text style={{fontFamily: 'Bold', fontSize: 17,  }}>Total</Text>
          <Text style={{fontFamily: 'Bold', fontSize: 17, marginLeft: 'auto' }}>$0.00</Text>
        </View>
        <Pressable onPress={() => addInvestor()} style={[styles.button, {marginBottom: 100, marginTop: 50}]}>
          <Text    style={styles.text}>Complete Order</Text>
        </Pressable>

      </View>

    </View>
    )
  })}
  </ScrollView>
 
  
  )
}
const styles = StyleSheet.create({
  investorPhoto: {
    width: 57,
    height: 57,
    borderRadius: 30,
    backgroundColor: 'blue',
    marginTop: 12,
    marginLeft: 12,
    marginRight: 12,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: '#2436E7',
    width: 325  
  },   text: {
    fontSize: 16,
    lineHeight: 21,
    // fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    fontFamily: 'Medium'
  },
  paymentTypeBox: {
    width: 80,
    height: 50,
    borderColor: '#D8D8D8',
    borderWidth: 1,
    borderRadius: 10
  },
  boldText: {
    fontFamily: 'Medium',
    fontSize: 17
  },
  paymentTypeSelectRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  paymentTypeRow: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 15, 
    marginTop: 15
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center',
    width: 330,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  investorCardContainer: {
    height: 140,
    backgroundColor: '#F9F9F9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  investorCard:{
    width: 350,
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
 
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 12,
    // marginBottom: 20,
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
  container: {
    backgroundColor: 'white',
    flex: 1,
    showsVerticalScrollIndicator: false,
  }

});
export default SubVI2