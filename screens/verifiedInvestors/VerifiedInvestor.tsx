import { View, Text, StyleSheet, Image } from 'react-native'
import React, {useState} from 'react'
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import MainChartVI from './charts/MainChartVI';
import { ScrollView } from 'react-native-gesture-handler';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigation';
import IndustryPieChartVI from './IndustryPieChartVI';

import IndustryBreakdown from './IndustryBreakdown';
import { useNavigation } from '@react-navigation/native';
import useInvestorStore from '../../stateManagement/InvestorContext';
import { LinearGradient } from 'expo-linear-gradient';
import { EvilIcons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'VerifiedInvestor'>


const VerifiedInvestor = ({investorModalToggle}: any) => {

  ///// DELETE THIS WHOLE PAGE ?????  /////
  const store = useInvestorStore();
  const navigation: any = useNavigation();
  // const currentInvestor = FakeInvestorData.filter()
  // const [selectedInvestor, setSelectedInvestor] = useState()
  // const currentInvestor = FakeInvestorData.filter(i => i.id == store.investorID);
  // const investorStocksTypes = currentInvestor.map((investor) => investor.stocks.map((stock: any) => stock.type));
  // const uniqueTypes = [...new Set(investorStocksTypes[0])];

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
     
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  
  },
  userPhoto: {
    marginTop: 100,
    width: 150,
    height: 150,

    borderRadius: 100,
    marginBottom: 20
  },
  upperContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    
  },
  nameText: {
    fontFamily: 'Medium',
    fontSize: 28,
    color: '#2436E7',
    marginBottom: 20
  },
  bioText: {
    fontFamily: 'Regular',
    fontSize: 14,
    lineHeight: 25
  },
  smallText: {
    color: 'black',
    fontSize: 14,
  },
  greenDot: {
    height: 15,
    width: 15,
    backgroundColor: '#8DC63F',
    borderRadius: 50,
    marginRight: 7
  },
  blueDot: {
    height: 15,
    width: 15,
    backgroundColor: '#2436E7',
    borderRadius: 50,
    marginRight: 7
  },
  dotContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 'auto',
    marginLeft: 20,
   
  },
  strategyContainer: {
    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    marginTop: 40,
    // marginBottom: 100
  },
  strategyBigText: {
    textAlign: 'left',
    fontFamily: 'Medium',
    fontSize: 22
  },
  strategyLittleText: {
    fontFamily: 'Regular',
    fontSize: 14,
    marginTop: 30,
    lineHeight: 25
  }

});

export default VerifiedInvestor