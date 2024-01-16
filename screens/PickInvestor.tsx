import React from 'react'
import InvestorCard from '../components/InvestorCard'
import { useState } from 'react';
import { TextInput } from "react-native-paper";
import { StyleSheet, Text, View, Pressable, Switch, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import { useFonts } from "expo-font";
import { Icon } from '@rneui/themed';
import AppLoading from "expo-app-loading";

const PickInvestor = () => {


const [loadedFonts] = useFonts({
  Regular: require("../assets/fonts/Graphik-Regular-Web.ttf"),
  Bold: require("../assets/fonts/Graphik-Bold-Web.ttf"),
  Medium: require('../assets/fonts/Graphik-Medium-Web.ttf')
});
if (!loadedFonts) {
    return <AppLoading />;
}
  return (
    <ScrollView>
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
      <View style={styles.bigTextContainer}>
        <Text style={styles.bigText}>Welcome to <Text style={{color: '#2436E7'}}>Blume.</Text>{"\n"}Pick a verified investor.{"\n"}On us!</Text>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 20}}>
        <View style={{flex: 1, height: 1, backgroundColor: '#8DC63F', marginLeft: 30, marginRight: 30}} />
      </View>

    <View style={styles.cardContainer}>
      <InvestorCard />
    </View>
    <View style={styles.cardContainer}>
      <InvestorCard />
    </View>
    <View style={styles.cardContainer}>
      <InvestorCard />
    </View>

    <Pressable style={styles.button}>
       <Text  onPress={() => console.log('presss')}  style={styles.buttonText}>Create Account</Text>
    </Pressable>

    <Text style={{fontSize: 14, fontFamily: "Regular", textDecorationLine: 'underline', color: '#2436E7', marginBottom: 60, marginTop: 20 }}>
      Choose for Me
    </Text>

    </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  bigText: {
    fontSize: 28,
    fontFamily: 'Bold',
    textAlign: 'left',
    lineHeight: 40

  },
  bigTextContainer: {
    width: 340,
    marginTop: 50,
    marginBottom: 10
  },
  cardContainer: {
    marginBottom: 25  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: '#2436E7',
    width: 325
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },


});


export default PickInvestor