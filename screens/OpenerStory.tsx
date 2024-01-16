import { StyleSheet, Text, ImageBackground, View, Image, Dimensions, ScrollView, SafeAreaView, TouchableOpacity, Pressable  } from 'react-native'
import React, { useEffect, useState } from 'react'
// import {slideOneImage} from './../assets/shutterstock_1304593297.jpg'
// import FakeInvestorData from '../assets/slideOnePhoto.jpg';
import { PanGestureHandler } from 'react-native-gesture-handler';
// import { SvgXml } from 'react-native-svg';
import SvgXml from '../assets/SVG/MainLogo'
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useFonts } from "expo-font";
import SplashScreenBlume from './SplashScreenBlume';
import AppLoading from "expo-app-loading";


const OpenerStory = () => {
  const navigation: any = useNavigation();

  const { width } = Dimensions.get('window');

  const [slide, setSlide] = useState(1);
  const [appIsReady, setAppIsReady] = useState<boolean>(false);

  const onSwipeGesture = (event: any) => {
    const { translationX } = event.nativeEvent;
    // Calculate the index of the current subcomponent based on the swipe distance
    const currentIndex = Math.floor(translationX / -width) + 1;
    // Do something with the current index, e.g., update state or perform actions based on the index
    // console.log('Current Index:', currentIndex);
  };

  const SlideOne = () => {
    return (
    
          <View style={styles.container}>
          <ImageBackground
            source={require('./../assets/slideOnePhoto2.jpeg')}
            style={styles.imageBackground}
          >
            <View style={styles.overlay}>
              <Text allowFontScaling={false} style={[styles.text, {width: '90%', marginTop: 50, marginLeft: 'auto', marginRight: 'auto'}]}>Join the community taking finances into their own hands.</Text>
              {/* <Pressable  style={[styles.button, {marginTop: 430, marginBottom: 10}]}  onPress={() => {navigation.navigate('Login')}}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </Pressable >
              <Pressable style={{marginBottom: 'auto'}} onPress={() => navigation.navigate('SignUp1')}>
                <Text style={{color: 'white', fontFamily: 'Regular'}}>Already a user? Login</Text>
            </Pressable> */}
            </View>
         
          </ImageBackground>
        </View>
    )
  }
  const SlideTwo = () => {
    return (
      <View style={styles.containerTwo}>
      <View style={styles.header}>
        <Text allowFontScaling={false} style={[styles.headerText, {width: '80%'}]}>Leverage the portfolios of verified investors to maintain successful investments on your terms.
        </Text>
      </View>
      <View style={styles.content}>
        <Image source={require('../assets/main_circle2.png')} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.footer}>
      {/* <Pressable  style={styles.button}  onPress={() => {navigation.navigate('Login')}}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </Pressable >
              <Pressable  style={{marginTop: 10}} onPress={() => {navigation.navigate('SignUp1')}}>
              <Text style={{color: 'white', fontFamily: 'Regular'}}>Already a user? Login</Text>
              </Pressable > */}
      </View>
    </View>
    )
  }
  const SlideThree = () => {
    return (
      <View style={styles.container}>
      <ImageBackground
        source={require('./../assets/slideThreePhoto.jpg')}
        style={styles.imageBackground}
      >
        <View style={styles.overlay}>
          <View >
        <SvgXml height={300} width={500} style={{marginTop: -50, fontFamily: "Regular"}}/> 
        <Text allowFontScaling={false} style={[styles.logoText, {marginLeft: 'auto', marginRight: 'auto',marginTop: -120}]}>BLUME</Text>
        </View>
        {/* <Pressable  style={[styles.button, {marginTop: 430, marginBottom: 10}]}  onPress={() => {navigation.navigate('Login')}}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </Pressable >
              <Pressable style={{marginBottom: 'auto'}} onPress={() => navigation.navigate('SignUp1')}>
                <Text style={{color: 'white', fontFamily: 'Regular'}}>Already a user? Login</Text>
            </Pressable> */}
        </View>
      </ImageBackground>
    </View>
    )
  }
  const subcomponents = [
    <SlideOne />,
    <SlideTwo />,
    <SlideThree />,
  ]

  useEffect(() => {
  async function prepare() {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (e) {
      console.warn(e);
    } finally {
      setAppIsReady(true);
    }
  }
  prepare();


}, []);
  const [fontsLoaded] = useFonts({
    Regular: require("../assets/fonts/Graphik-Regular-Web.ttf"),
    Bold: require("../assets/fonts/Graphik-Bold-Web.ttf"),
    SemiBold: require("../assets/fonts/Graphik-Semibold-Web.ttf"),
    Juana: require("../assets/fonts/Juana-Regular.otf"),
    JuanaBold: require("../assets/fonts/Juana-SemiBold.otf"),

  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <>
{!appIsReady ? 
<SplashScreenBlume />  
: 
<View style={styles.wrapper} >
<View style={styles.container} >
  <PanGestureHandler onGestureEvent={onSwipeGesture}>
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
    >
      {subcomponents.map((subcomponent, index) => (
        <View key={index} style={{ width }}>
          {subcomponent}
        </View>
      ))}
    </ScrollView>
    
  </PanGestureHandler>
</View>
<View style={styles.buttonContainer}>
  <Pressable style={[styles.button, {marginTop: 0, marginBottom: 10}]} onPress={() => {navigation.navigate('SignUp1')}}>
    <Text style={styles.buttonText}>Sign Up</Text>
  </Pressable>

  <Pressable style={{marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto'}} onPress={() => navigation.navigate('Login')}>
    <Text style={{color: 'white', fontFamily: 'Regular'}}>Already a user? Login</Text>
  </Pressable>
</View>
</View>
      }
      </>
  )
}

export default OpenerStory

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: 'black',

  },
  containerTwo: {
    flex: 1,
    backgroundColor: '#4dabe9',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    // marginHorizontal: 0,
    // marginTop: 50
    // paddingVertical: 20,
    // marginTop: 100 ,
  },
  headerText: {
    // width: 270, 
    marginTop: 100, 
    marginLeft: 'auto', 
    marginRight: 'auto',
    fontSize: 30,
    color: 'white',
    fontFamily: "Juana",
    textAlign: 'center',
    lineHeight: 32,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: '90%',
    marginTop: -80,
  },
  footer: {
    alignItems: 'center',
    // paddingVertical: 50,
    marginBottom: 35
  },
  wrapper: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  subcomponent: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,

    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingVertical: 50,

  },
  text: {
    fontSize: 30,
    fontFamily: "JuanaBold",
    color: 'white',
    textAlign: 'center',
    lineHeight: 35,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 2,
    borderRadius: 30,
    elevation: 3,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#2436E7',
    width: 280
    
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  }, 
  logoText: {
    fontFamily: 'SemiBold',
    fontSize: 35,
    color: 'white',
  },
  buttonContainer: {
    
    position: 'absolute',
    bottom: 50,
  
    left: 0,
  right: 0,
  alignItems: 'center',
  },
})