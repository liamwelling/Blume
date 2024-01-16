import React, { useCallback, useEffect, useRef } from 'react'
import { useState } from 'react';
import { TextInput } from "react-native-paper";
import { StyleSheet, Text, View, Pressable, Switch, SafeAreaView, Dimensions, Alert, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import * as SplashScreen from 'expo-splash-screen';
import * as yup from "yup";
import { useForm, Controller, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios'
import useUserStore from '../stateManagement/UserContext';
import * as SecureStore from 'expo-secure-store';
import useLoginStore from '../stateManagement/LoginContext';
import SvgComponent from '../assets/SVG/MainLogo'
// SplashScreen.preventAutoHideAsync();
import { Svg, LinearGradient } from 'react-native-svg';
import SvgXml from '../assets/SVG/MainLogo'
import { EXPO_PUBLIC_SERVER_URL, EXPO_PUBLIC_RC_KEY } from '@env';
import { ScrollView } from 'react-native-gesture-handler';
import Purchases from 'react-native-purchases';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import SplashScreenBlume from './SplashScreenBlume';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';




function Login() {
  const navigation: any = useNavigation();
  const store = useUserStore();
  const loginStore = useLoginStore();

  const [keyboardStatus, setKeyboardStatus] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [appIsReady, setAppIsReady] = useState<boolean>(false);

  const [loginID, setLoginID] = useState<string>('');


  const storeUserID = async (value: string) => {
    console.log('input:', value)
    try {
      await AsyncStorage.setItem('@user_id', value)
    } catch (e) {
      // saving error
    }
  }

  const storeUserData = async (email:string, username:string, id:string) => {
    console.log('input:', email, username, id)
    try {
      await AsyncStorage.setItem('@user_email', email)
    } catch (e) {
      // saving error
    }
  }

  useEffect(() => {

  },[])
const signOut = async () => {
  try {
    await AsyncStorage.setItem('@user_id', '0')
  } catch (e) {
    // saving error
  }
}
const getData = async () => {
  try {3
    const value = await AsyncStorage.getItem('@user_id')
    if(value !== null) {
      console.log(value)
    }
  } catch(e) {
    // error reading value
  }
}

  const offset = useSharedValue(0);

const animatedStyles = useAnimatedStyle(() => {
  return {
    // transform: [{ translateY: withTiming(keyboardStatus? -150: 0,{duration: 500})}],
  };
});

const FadeSVG = useAnimatedStyle(() => {
  return {
    // opacity: withTiming(keyboardStatus? 0 : 1, {duration: 300}),
    // transform: [{ translateY: withTiming(keyboardStatus? -150: 0,{duration: 500})}],

  };
});

  type FormValues = {
    email: string;
    password: string;
  };


  const schema1 = yup.object().shape({ 
    email: yup.string().email().required(),
    password: yup.string().max(32).required(),

  }).required();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(schema1),

  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    login(data);
  };



  const login = (data: FormValues) => {
    console.log(EXPO_PUBLIC_SERVER_URL + `/login/`)
    axios.post(EXPO_PUBLIC_SERVER_URL + `/login/`,{
        email: data.email,
        password: data.password,
    }).then(async (response) => {
        if (!response.data.auth) {
            // setLoginStatus(false);
            setLoginError(true);
            console.log('Failed')
        } else {
            // localStorage.setItem('token', response.data.token)
          
            // setLoginStatus(true);
            // navigate('/profile');
            let email = response.data.result[0].email
            let username = response.data.result[0].username
            let id = response.data.result[0].idusers
            // let myStocks = response.data.map((u: any)=>u.stockticker)
            axios.get(EXPO_PUBLIC_SERVER_URL + `/mystocks/${id}`).then(
              (response) => {
                console.log(response.data.map((u: any)=>u.stockticker))
                store.setMyStocks(response.data.map((u: any)=>u.stockticker))
              })
              // axios.get(EXPO_PUBLIC_SERVER_URL + `/myinvestors/${response.data.result[0].idusers}`).then(
              //   (response) => {
              //     // store.setMyInvestors(response.data.map((u: any)=>u.investor_id))
              //   })
            storeUserID(JSON.stringify(response.data.result[0].idusers))
            // loginStore.setToken(response.data.token);
            store.setUsername(username)
            store.setEmail(email)
            store.setUserID(id)
            configureRC()
    
      
            
        }
    });
};
const configureRC = async () => {
  console.log('RC KEY:::',EXPO_PUBLIC_RC_KEY)
  try {
    Purchases.configure({apiKey: EXPO_PUBLIC_RC_KEY});
  } catch (e) {
    console.log(e)
  }
}


  useEffect(() => {
  
  async function prepare() {
      try {
        // await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();

    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });
  
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

const [fontsLoaded] = useFonts({
  Regular: require("../assets/fonts/Graphik-Regular-Web.ttf"),
  Bold: require("../assets/fonts/Graphik-Bold-Web.ttf"),
});


if (!fontsLoaded) {
  return <AppLoading />;
}
  return (
<>
{!appIsReady ? 
<SplashScreenBlume />  
: 
<ScrollView>


  
    <View style={styles.container}>     




        <Animated.View style={[FadeSVG]}>
        <SvgXml height={600} width={900} style={{marginBottom: -180, marginTop: -170}}/> 

        </Animated.View>

          <Animated.View style={[ animatedStyles]}>
    
      <Pressable onPress={() => {navigation.navigate('SignUp1')}}>
      <Text style={{fontSize: 14, fontFamily: "Regular", textDecorationLine: 'underline', color: '#2436E7' , textAlign: 'center'}} >Sign Up</Text>
      </Pressable>
      <Controller
        control={control}
        name="email"
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (        
        <TextInput
          label="Email"
          // left={<TextInput.Icon name="email" />}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          style={{ margin: 0, backgroundColor: 'white', width: 350 }}
          activeUnderlineColor="#8DC63F"
          underlineColor="#C5C5C5"
          
        />  
        )}
      />
     
     
      <Controller
        control={control}
        name="password"
        rules={{
        required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          label="Password"
          // left={<TextInput.Icon name="email" />}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          secureTextEntry={showPassword}
          right={<TextInput.Icon onPress={() => setShowPassword(!showPassword)} name="eye" />}
          style={{ margin: 0, backgroundColor: 'white', width: 350  }}
          activeUnderlineColor="#8DC63F"
          underlineColor="#C5C5C5"
        />
        )}
      />
      {loginError? 
        <Text style={{textAlign: 'center', marginBottom: -18}}>Incorrect username or password.</Text>
      :
        null
      }

 
  
    <View style={{display: 'flex', flexDirection: 'row', marginTop: 20, marginBottom: 10 }}>
      {/* <View style={{marginRight: 'auto'}}><Text>Remember Me</Text></View>
      <Text>Forgot Password?</Text> */}
    </View>
    <Pressable onPress={() => {navigation.navigate('ForgotPassword')}}>
      <Text style={{fontSize: 14, fontFamily: "Regular", textDecorationLine: 'underline', color: '#2436E7' , textAlign: 'center', marginBottom: 15}} >
        Forgot Password?
      </Text> 
    </Pressable>
  <Pressable 
    onPress={handleSubmit(onSubmit)} 
    // onPress={()=>toggleSwitch()}
    style={({ pressed }) => [{ backgroundColor: pressed ? '#1D2CB5': '#2436E7' }, styles.button]}
  >
  <Text style={styles.text}>Login</Text>
</Pressable>


  
  
  </Animated.View>
    </View>

    </ScrollView>
    }
   </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  signUpItems: {
    padding: 10
  },
    signUpWithButton: {
    
      alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: '#2436E7',
    width: 325,
    borderWidth: 1.5,
    borderColor: '#c5c5c5'
    // width: 325,
    // // max-width: 100%;
    // height: 50,
    // // /* UI Properties */
    //  border: '1 solid #A5A6A8',
    // border-radius: 30px;
    // opacity: 1;
    // font-family: graphik-regular;
    // font-size: 17px;
    // white-space: nowrap;
    // color: var(--unnamed-color-ffffff);
    // text-align: center;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    // vertical-align:middle;
    // /* font: normal normal medium 22px/22px Graphik; */
    // letter-spacing: 0px;
    // color: #C5C5C5;
    // opacity: 1;
  },
  signUpWithButtonContainer: {
    display: 'flex',
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginTop: 5,
    marginBottom: 'auto',
    marginRight: 'auto',
    marginLeft: 15,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    marginLeft: 'auto',
    marginRight: 'auto',
    // backgroundColor: '#2436E7',
    width: 325
    
    
  }, 
  logo: {
    marginTop: 100
  }, 
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    // fontFamily: 'graphik-medium'
  },
  text2: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
    // fontFamily: 'graphik-medium'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200
  },
  dropdownContainer: {
    width: 325
  },
  dropdown: {
    borderRadius: 30,
  },
  picker: {
    marginVertical: 30,
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: "#666",
  },
});


export default Login