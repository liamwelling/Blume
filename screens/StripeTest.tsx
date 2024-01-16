import { View, Platform, Text, Button, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Purchases, { PurchasesOffering } from 'react-native-purchases';

const APIKeys = {
  apple: "appl_XRblDrTQGWVbwVbmLaiDYanVGCC",
  google: "appl_XRblDrTQGWVbwVbmLaiDYanVGCC"
};



const StripeTest = () => {

  const [currentOffering, setCurrentOffering] = useState<PurchasesOffering | null>(null);
 

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const offerings = await Purchases.getOfferings();
  //     setCurrentOffering(offerings.current);
  //     console.log(offerings)
  
  //   };

  //   Purchases.setDebugLogsEnabled(true);
  //   if (Platform.OS == "android") {	    
  //     Purchases.configure({ apiKey: (APIKeys.google) });      
  //   } else {	    
  //     Purchases.configure({ apiKey:( APIKeys.apple) });     
  //   }

  //   fetchData()
  //     .catch(console.log);
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     Purchases.setDebugLogsEnabled(true);
      
  //     await Purchases.configure({
  //       apiKey: 'appl_XRblDrTQGWVbwVbmLaiDYanVGCC'
  //     });
  //     const prods = await Purchases.getProducts(['testsub1id']);
  //     console.log(prods)
  //   };
  //   fetchData()
  // }, []);



  const pressed = () => {
    console.log('pressed')
  }
  // useEffect(() => {
  //   initializePaymentSheet();
  // }, []);

  // const openPaymentSheet = async () => {
  //   const { error } = await presentPaymentSheet();

  //   if (error) {
  //     console.log(`Error code: ${error.code}`, error.message);
  //   } else {
  //     console.log('Success', 'Your order is confirmed!');
  //   }
  // };
  return (
    <View>
         
          <View style={{marginTop: 100}}></View>
          
<Text onPress={() => {pressed()}}>click me</Text>
{/* {currentOffering?.availablePackages.map((pkg) => {
            return <Text>{ pkg.product.identifier }</Text>
          })
        } */}
    </View>
  )
}

export default StripeTest