// import React, { useState } from 'react'
import * as React from 'react';
import { Text, useWindowDimensions, View, StyleSheet, Alert, Pressable, Platform } from 'react-native' 
import { DefaultTheme, NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import PickInvestor from './screens/PickInvestor';
import Homepage from './screens/homepage/Homepage';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, } from '@react-navigation/drawer';
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import MyStocks from './screens/MyStocks';
import MyInvestors from './screens/MyInvestors';
import VerifiedInvestor from './screens/verifiedInvestors/VerifiedInvestor';
import BrowseInvestors from './screens/browseInvestors/BrowseInvestors';
import IndustrySelect from './screens/browseInvestors/IndustrySelect';
import StockPage from './screens/stockPage/StockPage';
import BrowseStocks from './screens/browseStocks/BrowseStocks';
import Login from './screens/Login';
import useUserStore from './stateManagement/UserContext';
import SignUp1 from './screens/signUp/SignUp1';
import useLoginStore from './stateManagement/LoginContext';
import VISubscribe from './screens/verifiedInvestors/VISubscribe/VISubscribe';
import Inbox from './screens/inbox/Inbox';
import Account from './screens/account/Account';
import Support from './screens/support/Support';
import InvestorPageTest from './screens/investorPage/InvestorPageTest';
import FontPath from './assets/fonts/FontPath';
import StripeTest from './screens/StripeTest';
import InvestorSignUp from './screens/signUp/InvestorSignUp';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
import { EXPO_PUBLIC_SERVER_URL } from '@env';
import Purchases from 'react-native-purchases';
import SplashScreenBlume from './screens/SplashScreenBlume';
import OpenerStory from './screens/OpenerStory';
import ForgotPassword from './screens/auth/ForgotPassword';
import { MaterialIcons } from '@expo/vector-icons';
import PrivacyPolicy from './screens/support/documents/PrivacyPolicy';
import DataMinimization from './screens/support/documents/DataMin/DataMinimization';
import Subscriptions from './screens/support/documents/Subscriptions/Subscriptions';
import TOS from './screens/support/documents/TOS/TOS';

export type RootStackParamList = {
  Homepage: undefined;
  VerifiedInvestor: {name: string};
  MyStocks: undefined;
  MyInvestors: undefined;
  BrowseInvestors: undefined;
  IndustrySelect: undefined;
  StockPage: {ticker: any};
  BrowseStocks: any; 
  VISubscribe: any;
  Account: any;
  Support: any;
  PrivacyPolicy: any;
  DataMinimization: any;
  Subscriptions: any;
  TOS: any;
  Inbox: any;
  Goose: any;

};

export type AuthStackList = {
  OpenerStory: any;
  Login: any;
  SignUp1: any;
  InvestorSignUp: any;
  ForgotPassword: any;
}


const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};
// type Props = NativeStackScreenProps<RootStackParamList>;
const RootStack = createNativeStackNavigator<RootStackParamList>();

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {

  const store = useUserStore();
  const loginStore = useLoginStore();
  const userEmail = store.Email;
  const username = store.Username;
  const width = useWindowDimensions().width * 0.3;

  const [loadedFonts] = useFonts({
    Regular: require("./assets/fonts/Graphik-Bold-Web.ttf"),
    Bold: require("./assets/fonts/Graphik-Bold-Web.ttf"),
    Medium: require('./assets/fonts/Graphik-Medium-Web.ttf')
  });
  
const signOut = async () => {
  try {
    await AsyncStorage.setItem('@user_id', '0')
    store.setUserID(0)
  } catch (e) {
  }
}

if (!loadedFonts) {
    return <AppLoading />;
}

  return (
    <DrawerContentScrollView {...props}>
      <View  style={styles.menuContainer} >
        <View style={styles.userInfoView}>
          {/* <DrawerIcon  height={200} width={400} style={{marginBottom: -180, marginTop: -170,}}/> */}
          {/* <View style={{width: 70, height: 70, backgroundColor: '#C5C5C5', borderRadius: 50, marginBottom: 20, marginLeft: 'auto', marginRight: 'auto'}}></View> */}
          <Text style={styles.usernameText} >{username}</Text>
          <Text style={styles.userEmailText}>{userEmail}</Text>
        </View>
        
         <View
          style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
          >

          <Pressable  style={styles.menuTextContainer}
          onPress={() => {
            props.navigation.navigate('Homepage');
          }} >
            <Text  style={styles.menuItemsText}>Home</Text>
           </Pressable >

          <Pressable  style={styles.menuTextContainer}
          onPress={() => {props.navigation.navigate('BrowseInvestors');
        }}>
              <Text 
                style={styles.menuItemsText}>Browse Investors</Text>
          </Pressable >

          <Pressable  style={styles.menuTextContainer}
          onPress={() => {
            props.navigation.navigate('BrowseStocks');
          }} >
            <Text  style={styles.menuItemsText}>Browse Stocks</Text>
          </Pressable >

          <Pressable  style={styles.menuTextContainer}
          onPress={() => {
            props.navigation.navigate('MyInvestors');
          }} >
            <Text  style={styles.menuItemsText}>My Investors</Text>
          </Pressable >

          <Pressable style={styles.menuTextContainer} 
          onPress={() => {
            props.navigation.navigate('MyStocks');
          }} >
            <Text  style={styles.menuItemsText}>My Stocks</Text>
          </Pressable >

        <Pressable 
          onPress={() => {props.navigation.navigate('Inbox');}}
          style={styles.menuTextContainer}  >
            <Text style={styles.menuItemsText}>Notifications</Text>
          </Pressable>
          <Pressable style={styles.menuTextContainer} 
          onPress={() => {
            props.navigation.navigate('Account');
          }} >
            <Text  style={styles.menuItemsText}>Account</Text>
          </Pressable >
          <Pressable style={styles.menuTextContainer} 
          onPress={() => {
            props.navigation.navigate('Support');
          }} >
            <Text  style={styles.menuItemsText}>Support</Text>
          </Pressable >
            {/* <Text onPress={() => {
              props.navigation.navigate('Homepage');
            }}  style={styles.menuItemsText}>My Account</Text> */}
                     {/* <Text onPress={() => {
              props.navigation.navigate('Login');
            }}  style={styles.menuItemsText}>Login</Text> */}
          <Pressable 
            onPress={() => signOut()} 
            style={[styles.menuTextContainer,{marginTop: 60}]}  >
              <Text  style={[styles.menuItemsText, ]}>Sign Out</Text>
          </Pressable>  
         
        </View>
       
      </View>
    </DrawerContentScrollView>
  );
}
const styles = StyleSheet.create({

  menuContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',

  },
  menuItemsCard: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  userInfoView: {
    marginTop: 100
  },
  usernameText: {
    fontFamily: 'Regular',
    fontSize: 20,
    marginBottom: 12,
    textAlign: 'center'
   
  },
  userEmailText: {
    fontFamily: 'Regular',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 70
  },
  menuItemsText: {
    fontFamily: 'Regular',
    fontSize: 16,
   
  },
  menuTextContainer: {
    display: 'flex',
    width: 230,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  }

});




function MyDrawer() {
  return (
    <NavigationContainer theme={navTheme}>
    <Drawer.Navigator useLegacyImplementation 
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={({ navigation }) => ({
      headerLeft: () => (
        <Pressable 
            style={{marginLeft: 20}}   
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <MaterialIcons name="menu" size={30} color={'#0088DD'}  />
        </Pressable>
      ),
      // headerShown: false,
      headerTransparent: true,
     
      headerTitleStyle: {
        fontWeight: "bold",
        color: "white",
        opacity: 0
      },
      headerStyle: {
        height: 80, 
      },
      drawerStyle: {
        backgroundColor: 'white',
        width: 240,
      },
    })}
    > 
    
      <RootStack.Screen name="Homepage" component={Homepage}  />
      {/* <RootStack.Screen name="PickInvestor" component={PickInvestor} /> */}
      <RootStack.Screen name="MyStocks" component={MyStocks} />

      <RootStack.Screen name="BrowseStocks" component={BrowseStocks} />
      <RootStack.Screen name="MyInvestors" component={MyInvestors} />
      <RootStack.Screen name="VerifiedInvestor" component={VerifiedInvestor} />
      <RootStack.Screen name="StockPage" component={StockPage} />
      <RootStack.Screen name="VISubscribe" component={VISubscribe} />
      <RootStack.Screen name="BrowseInvestors" component={BrowseInvestors} />
      <RootStack.Screen name="Account" component={Account} />
      <RootStack.Screen name="Support" component={Support} />
      <RootStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <RootStack.Screen name="Subscriptions" component={Subscriptions} />
      <RootStack.Screen name="TOS" component={TOS} />
      <RootStack.Screen name="Inbox" component={Inbox} />
      <RootStack.Screen name="DataMinimization" component={DataMinimization} />
        <RootStack.Group screenOptions={{ presentation: 'modal' }}>
          <RootStack.Screen name="IndustrySelect" component={IndustrySelect} />
        </RootStack.Group>
      
    </Drawer.Navigator>
    </NavigationContainer>
  );
}
function AuthenticationStack() {
  const Stack = createNativeStackNavigator<AuthStackList>();

  return (
    <NavigationContainer theme={navTheme} >     
      <Stack.Navigator
          screenOptions={{
            headerShown: false,
            headerTransparent: true,
            headerTitleStyle: {
              fontWeight: "bold",
              color: "white",
            },
      }}
    > 
  
     <Stack.Screen name="OpenerStory" component={OpenerStory} />
     <Stack.Screen name="Login" component={Login} />
     <Stack.Screen name="SignUp1" component={SignUp1} />
     <Stack.Screen name="ForgotPassword" component={ForgotPassword} />  
     <Stack.Screen name="InvestorSignUp" component={InvestorSignUp} />
  
   </Stack.Navigator> 
   </NavigationContainer>
  )
}

function Navigation() {
  const [appIsReady, setAppIsReady] = React.useState(false);
  const loginStore = useLoginStore();
  const signedIn = loginStore.token
  const userStore = useUserStore();
  const userID = userStore.userID

  const configureRC = async () => {
    try {
      Purchases.configure({apiKey: "appl_XRblDrTQGWVbwVbmLaiDYanVGCC"});
    } catch (e) {
      console.log(e)
    }
  }

  const getUserID = async () => {
    try {
      const value: any = await AsyncStorage.getItem('@user_id')
      if(value !== '0') {
        console.log(value)
        userStore.setUserID(JSON.parse(value))
        console.log(typeof(userStore.userID))
        getUserData(JSON.parse(value))
      }
    } catch(e) {
      // error reading value
    }
  }

  const getUserData = async (value: number) => {
    axios.get(EXPO_PUBLIC_SERVER_URL + `/userInfo/${value}`).then(
      (response) => {
        userStore.setMyStocks(response.data.tickers.map((u: any)=>u.stockticker))
        userStore.setUsername(response.data.user.map((i:any) => i.username))
        userStore.setEmail(response.data.user.map((i:any) => i.email))
      })
    // storeUserID(JSON.stringify(response.data.result[0].idusers))
    // loginStore.setToken(response.data.token);

    // store.setUserID(response.data.result[0].idusers)
    configureRC()
  }
React.useEffect(() => {
  async function prepare() {
    try {
      
      await getUserID();
      await new Promise(resolve => setTimeout(resolve, 2000));
     
    } catch (e) {
      console.warn(e);
    } finally {
      setAppIsReady(true);
    }
  }
  prepare();

},[])
 

  return (
    <>
    {!appIsReady ? 
      <SplashScreenBlume />
    : (userID == 0) ? 
      <AuthenticationStack /> 
    : 
      <MyDrawer />  
    }
  </>
  )
}

export default Navigation