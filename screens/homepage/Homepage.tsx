import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import HomepageChart from "./HomepageChart";
import Leaderboard from "./Leaderboard";
// import StockCard1 from '../../components/StockCard1'
import MostActive from "./MostActive";
// import Navbar from '../../components/Navbar'
// import PopUp from '../../components/PopUp'
import NewsForYou from "./NewsForYou";
// import NewsCard from '../../components/NewsCard1'
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { NavigationContainer, DrawerActions, useNavigation } from '@react-navigation/native';
// import {

//   DrawerContentScrollView,
//   DrawerItemList,
//   DrawerItem,
// } from '@react-navigation/drawer';
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import TabViewExample from "./SliderChart";
import useUserStore from "../../stateManagement/UserContext";
import useInvestorStore from "../../stateManagement/InvestorContext";
import VerifiedInvestor from "../verifiedInvestors/VerifiedInvestor";
import VISubscribe from "../verifiedInvestors/VISubscribe/VISubscribe";
import StockPage from "../stockPage/StockPage";
import PlaidTest from "../investorPage/PlaidTest";
import InvestorPageTest from "../investorPage/InvestorPageTest";
import FontPath from "../../assets/fonts/FontPath";
import SubVI2 from "../verifiedInvestors/VISubscribe/SubVI2";
import Purchases, { PurchasesOffering } from "react-native-purchases";
// import * as InAppPurchases from 'expo-in-app-purchases';
import { ATOM_API_KEY } from "@env";
import { EXPO_PUBLIC_SERVER_URL, EXPO_PUBLIC_RC_KEY } from '@env';

const Homepage = () => {
  const userStore = useUserStore();
  const [currentOffering, setCurrentOffering] = useState(null);
  const [appIsReady, setAppIsReady] = useState(false);
  //   useEffect(() => {
  //   const fetchData = async () => {
  //     Purchases.setDebugLogsEnabled(true);

  //     await Purchases.configure({
  //       apiKey: 'appl_XRblDrTQGWVbwVbmLaiDYanVGCC'
  //     });
  //     const prods = await Purchases.getProducts(["02"]);
  //     setCurrentOffering(prods);
  //     console.log(prods)

  //   };
  //   fetchData()
  // }, []);
  const [activeSubs, setActiveSubs] = useState<any>([]);
  const configureRC = async () => {
    console.log('RC KEY:::',EXPO_PUBLIC_RC_KEY)
    try {
      Purchases.configure({apiKey: EXPO_PUBLIC_RC_KEY});
    } catch (e) {
      console.log('ERROR',e)
    }
  }
  const loginRC = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      const userID = `${userStore.userID}`;
      console.log("ID:", userID);
      const { customerInfo, created } = await Purchases.logIn(
        JSON.stringify(userID)
      );
      console.log('SUBS:',customerInfo.allPurchasedProductIdentifiers);
      setActiveSubs(customerInfo.allPurchasedProductIdentifiers);
      userStore.setMyInvestors(
        customerInfo.allPurchasedProductIdentifiers.map((i) => {
          return parseInt(i);
        })
      );
    } catch (e) {
      console.log(e);
    } finally {
      setAppIsReady(true);
    }
  };
  useEffect(() => {
    configureRC();
    loginRC();
  }, [userStore.userID]);
  // useEffect(() => {
  //   const getOfferings = async () => {
  //     Purchases.setDebugLogsEnabled(true);

  //         await Purchases.configure({
  //           apiKey: 'appl_XRblDrTQGWVbwVbmLaiDYanVGCC'
  //         });
  //     try {
  //       const offerings = await Purchases.getOfferings();
  //       if (offerings.current !== null) {
  //           // setCurrentOffering(offerings)
  //           console.log(offerings)
  //       }
  //     } catch (e) {

  //     }
  //   }
  //   getOfferings()
  // },[])

  // const loginRC = async () => {
  //   const userID = `${userStore.Email}`
  //   console.log(userID)
  //   try {
  //     Purchases.configure({apiKey: "appl_XRblDrTQGWVbwVbmLaiDYanVGCC", appUserID: JSON.stringify(userID)});
  //   } catch (e) {
  //     console.log(e)
  //   } finally {
  //     setAppIsReady(true);
  //   }
  // }

  const makePurchase = async () => {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      console.log(customerInfo);
      console.log(store.MyInvestors);
      // access latest customerInfo
    } catch (e) {
      // Error fetching customer info
    }
  };

  const investorStore = useInvestorStore();
  const store = useUserStore();
  /// modals
  const conditionalInvestorToggle = (ID: any) => {
    if (store.MyInvestors.includes(ID)) {
      investorModalToggle();
      // console.log("subbed");
    } else {
      subInvestorModalToggle();
      // console.log("not subbed");
    }
  };

  const [investorModalVisible, setInvestorModalVisible] = useState(false);
  const investorModalToggle = () => {
    setInvestorModalVisible(!investorModalVisible);
  };

  const [subInvestorModalVisible, setSubInvestorModalVisible] = useState(false);
  const subInvestorModalToggle = () => {
    setSubInvestorModalVisible(!subInvestorModalVisible);
  };

  const [stockModalVisible, setStockModalVisible] = useState(false);
  const stockModalToggle = () => {
    setStockModalVisible(!stockModalVisible);
  };

  ///
  const [loadedFonts] = useFonts({
    Regular: require("../../assets/fonts/Graphik-Regular-Web.ttf"),
    Bold: require("../../assets/fonts/Graphik-Bold-Web.ttf"),
    Medium: require("../../assets/fonts/Graphik-Medium-Web.ttf"),
  });
  if (!loadedFonts) {
    return null;
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <Modal
          presentationStyle="fullScreen"
          animationType="slide"
          // transparent={true}
          statusBarTranslucent={true}
          visible={investorModalVisible}
        >
          <InvestorPageTest investorModalToggle={investorModalToggle} />

          {/* <VerifiedInvestor investorModalToggle={investorModalToggle} /> */}
        </Modal>
        <Modal
          presentationStyle="fullScreen"
          animationType="slide"
          // transparent={true}
          statusBarTranslucent={true}
          visible={subInvestorModalVisible}
        >
          <VISubscribe investorModalToggle={subInvestorModalToggle} />
        </Modal>
        <Modal
          statusBarTranslucent={true}
          presentationStyle="fullScreen"
          animationType="slide"
          // transparent={true}
          visible={stockModalVisible}
        >
          <StockPage ModalToggle={stockModalToggle} />
          {/* <VISubscribe investorModalToggle={subInvestorModalToggle}/> */}
        </Modal>
        {/* <InvestorPageTest /> */}
        {/* <PlaidTest /> */}
        <HomePageHeader />
        <HomepageChart />
        {/* {store.MyInvestors.map((i) => {return (
        <Text>
          {i}
        </Text>
      )})} */}
        {/* <Text onPress={() => console.log(store.MyInvestors)}>press{store.MyInvestors}</Text> */}

        {/*
      <Text onPress={() => loginRC()}>press{store.MyInvestors}</Text>

      <Text onPress={() => makePurchase()}>press</Text> */}
        {/* <TabViewExample /> */}
{appIsReady && <Leaderboard conditionalInvestorToggle={conditionalInvestorToggle} />}
        

        <MostActive stockModalToggle={stockModalToggle} />
        <NewsForYou />
      </View>
    </ScrollView>
  );
};

const HomePageHeader = () => {
  return (
    <View style={styles.header}>
      <View style={{ marginTop: "auto", marginLeft: 20 }}>

        <Text allowFontScaling={false} style={styles.logoText}>
          BLUME
        </Text>

        <View style={styles.dotContainer}>
          <View style={styles.whiteDot}></View>
          <Text allowFontScaling={false} style={styles.smallText}>
            Verified Investors
          </Text>
        </View>

        <View style={styles.dotContainer}>
          <View style={styles.greenDot}></View>
          <Text allowFontScaling={false} style={styles.smallText}>
            S&P 500
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: 150,
    backgroundColor: "#2436E7",
  },
  logoText: {
    fontSize: 24,
    color: "white",
    fontFamily: "Bold",
    marginBottom: 10,
  },
  smallText: {
    color: "white",
    fontSize: 14,
  },
  greenDot: {
    height: 15,
    width: 15,
    backgroundColor: "#8DC63F",
    borderRadius: 50,
    marginRight: 7,
  },
  whiteDot: {
    height: 15,
    width: 15,
    backgroundColor: "white",
    borderRadius: 50,
    marginRight: 7,
  },
  dotContainer: {
    display: "flex",
    flexDirection: "row",
  },
});

export default Homepage;
