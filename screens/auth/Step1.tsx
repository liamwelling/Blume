
import React, { createRef, useCallback, useEffect, useRef,  } from 'react'
import { useState } from 'react';
import { TextInput as TextInputPaper } from "react-native-paper";
import { StyleSheet, Text, View, Pressable, TextInput, Switch, SafeAreaView, Dimensions, Alert, Keyboard } from 'react-native';
import * as yup from "yup";
import { useForm, Controller, Resolver, set } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios'
import SvgXml from '../../assets/SVG/MainLogo'
import BackSVG from '../../assets/SVG/BackArrow'
import { FlashOffTwoTone } from '@mui/icons-material';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
// import { TextInput as TextInputMUI } from "@react-native-material/core";
import { useFonts } from "expo-font";
import { EXPO_PUBLIC_SERVER_URL } from '@env';

type StepOneFormValues = {
  email: string;
};
const Step1 = ({setStep, setEmail}: any) => {

  const [emailNotValid, setEmailNotValid] = useState(false)
  const formSchema = yup.object().shape({
    email: yup.string().email().required(),
  });
  const navigation: any = useNavigation();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<StepOneFormValues>({
    resolver: yupResolver(formSchema),
  
  });
  const sendEmail = async (data: StepOneFormValues) => {
    console.log('sent')
    try {
      const response = await axios.post(EXPO_PUBLIC_SERVER_URL + '/forgotpassword', data)
      console.log('Email Response',response)
      if (response.status === 200) {
        setEmail(data.email)
        setEmailNotValid(false)
        setStep(true)
      }
    } catch (error: any) {
      setEmailNotValid(true)
      console.log('ERROR: ',error)
    }
  }
  const [fontsLoaded] = useFonts({
    Regular: require("../../assets/fonts/Graphik-Regular-Web.ttf"),
    Bold: require("../../assets/fonts/Graphik-Bold-Web.ttf"),
  });
  return (
    <View style={styles.container}>
       <Text style={{fontSize: 30, fontWeight: 'bold', marginBottom: 20}}>Password Reset</Text>
<Text>Please enter your email </Text>
           <Controller
        control={control}
        name="email"
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (        
        <TextInputPaper
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
      <View style={{height: 40}}>
        {emailNotValid && <Text style={{color: 'red', fontFamily: 'Regular', marginTop: 10}}>Email not found</Text>}
      </View>
        <Pressable 
        onPress={ handleSubmit(sendEmail)} 
        // onPress={()=>toggleSwitch()}
        style={({ pressed }) => [{ backgroundColor: pressed ? '#1D2CB5': '#2436E7' , marginTop: 30}, styles.button]}
      >
      <Text style={styles.text}>Send Email</Text>
    </Pressable>
    </View>
  )
}

export default Step1

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
  pinInput : {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 30,
    margin: 5,
    fontSize: 20,
    paddingLeft: 7,
    // justifyContent: 'center',
  
  },
})