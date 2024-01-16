
import React, { createRef, useCallback, useEffect, useRef,  } from 'react'
import { useState } from 'react';
import { TextInput as TextInputPaper } from "react-native-paper";
import { StyleSheet, Text, View, Pressable, TextInput, Switch, SafeAreaView, Dimensions, Alert, Keyboard } from 'react-native';
import * as yup from "yup";
import { useForm, Controller, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios'
import SvgXml from '../../assets/SVG/MainLogo'
import BackSVG from '../../assets/SVG/BackArrow'
import { FlashOffTwoTone } from '@mui/icons-material';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
// import { TextInput as TextInputMUI } from "@react-native-material/core";
import { useFonts } from "expo-font";
import Step1 from './Step1';
import Step2 from './Step2';
import { EXPO_PUBLIC_SERVER_URL } from '@env';


//first step is to enter email, this will then check if email exists in the database
// if it does, then it will send an email to the user with a code to reset the passsword
// if it doesnt, then it will say that the email doesnt exist in the database
// if the email does exist, then it will go to the next step, which is to enter the code that was sent to the email
type StepOneFormValues = {
  email: string;
};

type StepTwoFormValues = {
  password: string;
  confirmPassword: string;
};


const ForgotPassword = () => {
  const navigation: any = useNavigation();

  const [step, setStep] = useState(false)
  const [pin, setPin] = useState(Array(4).fill(''));
  const [showPassword, setShowPassword] = useState(true)
  const [email, setEmail] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm({
    // resolver: yupResolver(),

  });
  ///code entry
  const inputRefs = Array(4).fill(null).map(() => createRef<any>());
  const handleInputChange = (text: string, index: number) => {
    setPin(prevState => {
      const newPin = [...prevState];
      newPin[index] = text;
      return newPin;
    });
    
    if (text) {
      if (index < 3) {
        inputRefs[index + 1].current?.focus();
      }
    } else if (index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };
  ///
  const conditionalBack = () => {
  if (step) {
    setStep(false)
  } else {
    navigation.navigate('Login')
  }
}

const sendEmail = async (data: StepOneFormValues) => {
  console.log(data)
  // try {
  //   const response = await axios.post('http://localhost:8080/forgotpassword', data)
  //   console.log(response)
  //   if (response.status === 200) {
  //     setStep(true)
  //   }
  // } catch (error) {
  //   console.log(error)
  // }
}

const [fontsLoaded] = useFonts({
  Regular: require("../../assets/fonts/Graphik-Regular-Web.ttf"),
  Bold: require("../../assets/fonts/Graphik-Bold-Web.ttf"),
});

  return (
  <View style={styles.container}>
    <Pressable style={{marginTop: 30,marginRight: 'auto', marginLeft: 20}} onPress={conditionalBack}>
      <Ionicons name="chevron-back" size={30} color="black" />
    </Pressable>
              <SvgXml height={500} width={700} style={{marginBottom: -200, marginTop: -200}}/> 



{!step?

<Step1 setStep={setStep} setEmail={setEmail}/>
:
<Step2 email={email}/>
}



    </View>
  )
}

export default ForgotPassword

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