import { View, Text, StyleSheet, Image, ScrollView,ActivityIndicator,Pressable, Dimensions, Alert, Button } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import FakeInvestorData from '../../../assets/FakeInvestorData';
import useInvestorStore from '../../../stateManagement/InvestorContext';
import MainChartVI from '../charts/MainChartVI';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { EvilIcons } from '@expo/vector-icons';
import axios from 'axios'
import { VictoryLine, VictoryChart, VictoryTheme, VictoryLabel } from "victory-native";
import Purchases, { PurchasesOffering } from 'react-native-purchases';
import { EXPO_PUBLIC_SERVER_URL } from '@env';
import useUserStore from '../../../stateManagement/UserContext';
import { Store } from '@mui/icons-material';
import SplashScreenBlume1 from '../../SplashScreenBlume1';
import { VictoryPie } from 'victory-native'
import { set } from 'react-hook-form';



const SubVI1 = ({setInfoScreen, investorModalToggle, currentOffering}: any) => {

  const userStore = useUserStore();
  const investorStore = useInvestorStore();
  const currentUser = userStore.userID
  const selectedInvestorID = investorStore.investorID
  // const currentInvestor = FakeInvestorData.filter(i => i.id == selectedInvestorID);
  const [screen, setScreen] = useState(true)
  const [isLoading, setIsLoading] = useState(false);
  const chartWidth = Dimensions.get("window").width;
  const [currentInvestor, setCurrentInvestor] = useState([])
  const [responseData, setResponseData] = useState([])
  const [totalBalance, setTotalBalance] = useState(0)
  const [totalAvailable, setTotalAvailable] = useState(0)
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseLoading, setPurchaseLoading] = useState(false);

  const addSubscription = async () => {
    userStore.setMyInvestors([...userStore.MyInvestors, selectedInvestorID])
  }


  const makePurchase = async () => {
    setPurchaseLoading(true);
    try {
      const purchase = await Purchases.purchaseProduct(`${selectedInvestorID}`)
      console.log(purchase.customerInfo.entitlements.active)
      // Alert.alert("Error:", `${purchase.customerInfo.entitlements.active}`)
      addSubscription();
      setPurchaseLoading(false);
      investorModalToggle();
         if (typeof purchase.customerInfo.entitlements.active ! == "undefined"){
     
      Alert.alert('Error, please try again.')
     }

    } catch (e) { 
      setPurchaseLoading(false);
      console.log("Error:", e);
    }
  }
  
  const getInvestorData = (investorID: number) => {
    setIsLoading(true);
    axios.get(EXPO_PUBLIC_SERVER_URL + `/investors/${investorStore.investorID}`).then(
      (response) => {
        console.log('RES:',response.data)
       setCurrentInvestor(response.data)
      })
  }

  const [historicalData, setHistoricalData] = useState([])
  const getHistoricalInvestorData = (investorID: number) => {
   
    axios.get(EXPO_PUBLIC_SERVER_URL + `/investorHistory/${investorStore.investorID}`).then(
      (response) => {
        console.log(response.data.map((i:any) => (i.ROI )))

        setHistoricalData(response.data.map((i:any) => ({x: i.date, y: i.ROI })))
        // console.log(response.data.map((i:any) => ({x: i.date, y: i.ROI })))
      })
  }

  const getData = (investorID: number) => { 
    axios.get(EXPO_PUBLIC_SERVER_URL + `/api/holdings/`, { 
      method: "GET",
      headers: {
        investorID: investorID,
      },  
    }).then((response) => {
      console.log('PLAID RES',response.data.holdings)
      setResponseData(response.data.holdings)
      setTotalBalance(response.data.balance.accounts[0].balances.current)
        setTotalAvailable(response.data.balance.accounts[0].balances.available)
      setIsLoading(false)
    });
  };

  const donutData = responseData.map((i: any) => (
    {x: i.industry, y: Math.round(Math.round(i.institution_value)  / (totalBalance - totalAvailable) * 100), name: i.name }
  ));
  const chartData = Array.from(donutData?.reduce(
    (m: any, {x, y}: any) => m.set(x, (m.get(x) || 0) + y), new Map
  ), ([x, y]) => ({x, y}));

  useEffect(() => {
    getInvestorData(investorStore.investorID);
    getHistoricalInvestorData(investorStore.investorID)
    getData(investorStore.investorID)
  }, []);

  const historicalChartData = Array.from(historicalData.reduce(
    (m: any, {x, y}: any) => m.set(x, (m.get(x) || 0) + y), new Map
  ), ([x, y]) => ({x, y}));
  const Page1 = ({investor}: any) => {
    return (
      <View>
         <View style={styles.upperContainer}>
      <Text allowFontScaling={false} style={styles.bioText}>
      {investor.bio}
      </Text>
      </View>
    
    <View style={[styles.dotContainer, {marginTop: 20}]}>
      <View style={styles.blueDot}></View>
      <Text allowFontScaling={false} style={styles.smallText}>User's Investments</Text>
    </View>

    <View style={styles.dotContainer}>
      <View style={styles.greenDot}></View>
      <Text allowFontScaling={false} style={styles.smallText}>S&P 500</Text>
    </View>
    <MainChartVI />

   <View style={{flexDirection: 'row', alignItems: 'center', marginTop: -2, marginBottom: 20, zIndex: -1}}>
      <View style={{flex: 1, height: 3, backgroundColor: '#CCCCCC',}} />
    </View>

    <View style={styles.strategyContainer}>
      <Text allowFontScaling={false} style={styles.strategyBigText}>Strategy</Text>
      <Text allowFontScaling={false} style={styles.strategyLittleText}>
      {investor.strategy}
      </Text>
    </View>



    <Pressable onPress={() => setScreen(false)}  
    style={({ pressed }) => [{ backgroundColor: pressed ? '#1D2CB5': '#2436E7',marginBottom: 100, marginTop: 50 }, styles.button]}

    // style={[styles.button, {marginBottom: 100, marginTop: 50}]}
    >
      <Text allowFontScaling={false}  style={styles.text}>Subscribe</Text>
    </Pressable>
      </View>
    )
  }
  function capitalizeFirstLetter(string: string) {
    return string[0].toUpperCase() + string.slice(1);
  } 

  const [loadedFonts] = useFonts({
    Regular: require("../../../assets/fonts/Graphik-Regular-Web.ttf"),
    Bold: require("../../../assets/fonts/Graphik-Bold-Web.ttf"),
    Medium: require('../../../assets/fonts/Graphik-Medium-Web.ttf'),
    Semibold: require('../../../assets/fonts/Graphik-Semibold-Web.ttf')
  });
  if (isLoading) {
      return <SplashScreenBlume1 />;
  }
  return (
    <ScrollView>
    {currentInvestor.map((investor: any, index) => (
  <View style={styles.container} >
       <LinearGradient
          // Background Linear Gradient
          colors={['#42C0F04D', 'transparent']}
          style={styles.background}
        />
      
      <View style={{zIndex: 1000, flexDirection: 'row', marginBottom: -100, paddingTop: 60, width: '100%', paddingRight: 20, justifyContent: 'flex-end' }}>
        <Pressable onPress={() => investorModalToggle()}>
          <EvilIcons name="close" size={34} color="#2436E7" />
        </Pressable>
      </View> 
    <View style={styles.upperContainer}>

      {/* <Text style={{marginTop: 100}} onPress={() => investorModalToggle()}> X </Text> */}
      <Image  style={styles.userPhoto} source={{ uri: `${investor.image_url}`}}/>
      <Text allowFontScaling={false} style={styles.nameText}>{capitalizeFirstLetter(investor.first_name)} {capitalizeFirstLetter(investor.last_name)}</Text>
      </View>

   {screen
   ? 
   <>
         <View style={styles.upperContainer}>
      <Text allowFontScaling={false} style={styles.bioText}>
      {investor.bio}
      </Text>
      </View>
    
    <View style={[styles.dotContainer, {marginTop: 20}]}>
      <View style={styles.blueDot}></View>
      <Text style={styles.smallText}>User's Investments</Text>
    </View>

    <View style={styles.dotContainer}>
      <View style={styles.greenDot}></View>
      <Text allowFontScaling={false} style={styles.smallText}>S&P 500</Text>
    </View>
    {!isLoading && 
  <VictoryLine
          height={260}
          width={chartWidth}
          // labels={({ datum }) => datum.y}
          labelComponent={<VictoryLabel renderInPortal dy={-20}/>}
          padding={0}
          domainPadding={{x: [0, 0], y: 5}}
          style={{
            data: { stroke: "#8DC63FEB" },
            parent: { border: "1px solid #ccc", boxShadow: 1}
          }}
          data={historicalChartData}
        />
  
  }

   <View style={{flexDirection: 'row', alignItems: 'center', marginTop: -2, marginBottom: 20, zIndex: -1}}>
      <View style={{flex: 1, height: 3, backgroundColor: '#CCCCCC',}} />
    </View>

    <View style={styles.strategyContainer}>
      <Text allowFontScaling={false} style={styles.strategyBigText}>Strategy</Text>
      <Text allowFontScaling={false} style={styles.strategyLittleText}>
      {investor.strategy}
      </Text>
    </View>

    {/* <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 30, }}>
        <View style={{flex: 1, height: .75, backgroundColor: 'black', marginLeft: 130, marginRight: 130}} />
      </View>
   */}
        
    
    {chartData.length > 0 &&  
    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 0, position: 'relative' }}>
    <IndustryPieChartVI chartData={chartData}  />
       <View style={styles.innerContainer}>
       <Text allowFontScaling={false} style={styles.riskLittleText}>Risk</Text>
       <Text allowFontScaling={false} style={styles.riskBigText}>{(investor.risk).toUpperCase()}</Text>
     </View>
     </View>
       }


    <Pressable onPress={() => setScreen(false)}
    style={({ pressed }) => [{ backgroundColor: pressed ? '#1D2CB5': '#2436E7',marginBottom: 100, marginTop: 50 }, styles.button]}
    >
      <Text allowFontScaling={false} style={styles.text}>Subscribe</Text>
    </Pressable>
      </>
   
    :
    <>
    <View style={styles.priceCard}>
      <Text allowFontScaling={false} style={{fontFamily: 'Semibold', fontSize: 16}}>Premium</Text>
      
      <View style={{display: 'flex', flexDirection: 'row', marginTop: 20, marginBottom: 15}}>
        <Text allowFontScaling={false} style={{fontFamily: 'Semibold', fontSize: 40}}>${parseFloat(currentOffering).toFixed(2)}</Text>
        <Text allowFontScaling={false} style={{fontFamily: 'Regular', fontSize: 40}}>/mo</Text>
      </View>
    
      <Text allowFontScaling={false} style={{fontFamily: 'Regular', fontSize: 12}}>Full Access with Notifications</Text>
    </View>
    <Text style={{width: 350, fontFamily: 'Regular', lineHeight: 25, marginTop: 40, marginBottom: 0, fontSize: 14}}>
    With a Verified Investor subscription, you can access the full portfolios of multiple investors. This includes a breakdown of their holdings by industry sectors, real-time updates on their transactions, and detailed investment strategies they follow. Subscribe today to explore these valuable insights from our Verified Investors.
    </Text>
        <Pressable 
           onPress={() => makePurchase()} 
            style={({ pressed }) => [{ backgroundColor: pressed ? '#1D2CB5': '#2436E7',marginBottom: 30, marginTop: 50 }, styles.button]}
        >
        <Text  
       
       allowFontScaling={false}
         style={styles.text}>Purchase Plan</Text>
      </Pressable>
      {purchaseLoading && <ActivityIndicator size="large" color="#2436E7"/>}
      
      </>
  } 
    
  </View>
  ))}
  </ScrollView>
  )
}

const IndustryPieChartVI = ({chartData, risk}: any) => {
    
  


  const [loadedFonts] = useFonts({
    Regular: require("../../../assets/fonts/Graphik-Regular-Web.ttf"),
    Bold: require("../../../assets/fonts/Graphik-Bold-Web.ttf"),
    Medium: require('../../../assets/fonts/Graphik-Medium-Web.ttf'),
    Semibold: require('../../../assets/fonts/Graphik-Semibold-Web.ttf')    
});
if (!loadedFonts) {
    return <AppLoading />;
}  
  return (
    <View style={{ display: 'flex',justifyContent:'center', alignItems:'center', marginBottom: 0}}>
      <VictoryPie
      labels={() => null}
  data={chartData}
  style={{
    data: { fill: ({ datum }) => 
      datum.x == 'Consumer Staples' ? '#00994c' 
    : datum.x == 'ETF' ? '#2e3192' 
    : datum.x == 'Technology' ? '#7184f4' 
    : datum.x == 'Financials' ? '#7cf473' 
    : datum.x == 'Energy' ? '#9e7eff' 
    : datum.x == 'crypto' ? '#b3aecc' 
    : datum.x == 'Healthcare' ? '#a7d6a3' 
    : datum.x == 'Consumer Discresionary' ? '#da1c5c' 
    : datum.x == 'Materials' ? '#ed8700' 
    : datum.x == 'Utilities' ? '#f9ed32' 
    : datum.x == 'Real Estate' ? '#ef84ad' 
    : datum.x == 'REIT' ? '#bce0ed' 
    : datum.x == 'Communication Services' ? '#27aae1' 
    : datum.x == 'Industrials' ? '#6a8482' 
    : 'grey'    
    }
  }}
  innerRadius={125}
  width={400}

/> 
{/* 
<View style={styles.innerContainer}>
  <Text style={styles.riskLittleText}>Risk</Text>
  <Text style={styles.riskBigText}>{(risk).toUpperCase()}</Text>
  </View> 
*/}
    </View>
  )
}

const styles = StyleSheet.create({
  innerContainer: {
    position: 'absolute',
    // top: 72.5,
    // left: 0,
    // right: 0,
    // bottom: 0,
    width: 230,
    height: 230,
    borderColor: '#E3E3E3',
    borderRadius: 230,
    borderWidth: 1.5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
},
  riskLittleText: {
    fontFamily: 'Medium',
    fontSize: 18
  },
  riskBigText: {
    fontFamily: 'Semibold',
    fontSize: 100
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  priceCard: {
    width: 350,
    height: 150,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 12,
    marginBottom: 20,
    
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  
  },
  userPhoto: {
    marginTop: 100,
    width: 150,
    height: 150,
    // backgroundColor: 'blue',
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

export default SubVI1