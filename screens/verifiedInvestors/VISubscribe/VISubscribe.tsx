import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import SubVI1 from './SubVI1'
import SubVI2 from './SubVI2'
import useInvestorStore from '../../../stateManagement/InvestorContext'
import Purchases, { PurchasesOffering } from 'react-native-purchases';
import { EXPO_PUBLIC_SERVER_URL, EXPO_PUBLIC_RC_KEY } from '@env';


const VISubscribe = ({investorModalToggle}: any) => {
  const investorStore = useInvestorStore();
  const investorID = investorStore.investorID
  const [infoScreen, setInfoScreen] = useState(true)

  const [currentOffering, setCurrentOffering] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      Purchases.setDebugLogsEnabled(true);
      
      Purchases.configure({
        apiKey: EXPO_PUBLIC_RC_KEY
      });
      const prods = await Purchases.getProducts([`${investorID}`]);
      setCurrentOffering(prods.map((i):any => {return (i.price)}));
      console.log('Product :',prods)
      // console.log(prods)
     
    };
    fetchData()
  }, []);
  return (
    <View style={{backgroundColor: 'white', height: "100%"}}>
      {/* <SubVI2 investorModalToggle={investorModalToggle} /> */}
      {/* <Text style={{marginBottom: -100}}onPress={() => investorModalToggle()} >BACK</Text> */}
      {infoScreen?<SubVI1 investorModalToggle={investorModalToggle} setInfoScreen={setInfoScreen} currentOffering={currentOffering}
      />:<SubVI2 investorModalToggle={investorModalToggle}/>}   
    </View>
  )
}

export default VISubscribe