
import React, { createRef, useCallback, useEffect, useRef,  } from 'react'
import { useState } from 'react';
import { TextInput as TextInputPaper } from "react-native-paper";
import { StyleSheet, Text, View, Pressable, TextInput, Switch, ActivityIndicator, SafeAreaView, Dimensions, Alert, Keyboard } from 'react-native';
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
import useUserStore from '../../stateManagement/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Purchases from 'react-native-purchases';


type StepTwoFormValues = {
  password: string;
  confirmPassword: string;
};
interface Step2Props {
  email: string;
}
type FormValues = {
  email: string;
  password: string;
};

const Step2: React.FC<Step2Props> = ({ email }) => {
  const store = useUserStore();
  const [pinIsValid, setPinIsValid] = useState(false)
  const [pin, setPin] = useState(Array(4).fill(''));
  const [showPassword, setShowPassword] = useState(true)
  const[loading, setLoading] = useState(false)
  const [responseStatus, setResponseStatus] = useState('')
  const submitPin = async () => {
    console.log('pin', pin);
    try {
        const response = await axios.post(EXPO_PUBLIC_SERVER_URL + '/validatepin', 
        {
            pin: pin.join(''),
            email: `${email}`
        });

        switch (response.data) {
            case 'VALID':
                // console.log('valid');
                setResponseStatus('valid')

                setPinIsValid(true);
                break;
            case 'INVALID':
                // console.log('invalid');
                setResponseStatus('invalid')
                break;
            case 'EXPIRED':
                // console.log('expired');
                setResponseStatus('expired')
                break;
            default:
                console.log('Unknown response:', response.data);
        }
    } catch (error: any) {
        console.log('ERROR: ', error);
    }
}

  // pin entry
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
  const formSchema = yup.object().shape({
    password: yup.string().min(6, 'Password must be at least 6 characters.').required('Password is required.'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], 'Passwords must match.')
      .required('Confirm password is required.')
  });
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<StepTwoFormValues>({
    resolver: yupResolver(formSchema),

  });

  const storeUserID = async (value: string) => {
    console.log('input:', value)
    try {
      await AsyncStorage.setItem('@user_id', value)
    } catch (e) {
      // saving error
    }
  }

  const configureRC = async () => {
    try {
      Purchases.configure({apiKey: "appl_XRblDrTQGWVbwVbmLaiDYanVGCC"});
    } catch (e) {
      console.log(e)
    }
  }
  

  const login = (email: string, pass:string) => {
    console.log(EXPO_PUBLIC_SERVER_URL + `/login/`)
    axios.post(EXPO_PUBLIC_SERVER_URL + `/login/`,{
        email: email,
        password: pass,
    }).then(async (response) => {
        if (!response.data.auth) {
            // setLoginStatus(false);
            // setLoginError(true);
            console.log('Failed')
        } else {
            // localStorage.setItem('token', response.data.token)
          
            // setLoginStatus(true);
            // navigate('/profile');
            axios.get(EXPO_PUBLIC_SERVER_URL + `/mystocks/${response.data.result[0].idusers}`).then(
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
            store.setUsername(response.data.result[0].username)
            store.setEmail(response.data.result[0].email)
            store.setUserID(response.data.result[0].idusers)
            configureRC()
    
      
            
        }
    });
};
  /// submit new password, if successful should log in user
  const submitPassword = async (data: StepTwoFormValues) => {
    // console.log('Submitted data :',data)
    try {
      const response = await axios.post(EXPO_PUBLIC_SERVER_URL + '/resetpassword', 
      {
        email: `${email}`,
        password: `${data.password}`
      }
      )
      console.log(response)
      if (response.status === 200) {
        login(email, data.password)
        // setStep(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
<Text>Enter the 4 digit code sent to your email </Text>
<View style={{flexDirection: 'row', marginVertical: 20}}>
{pin.map((value, index) => (
        <TextInput
          key={index}
          ref={inputRefs[index]}
          style={styles.pinInput}
          onChangeText={(text) => handleInputChange(text, index)}
          value={value}
          maxLength={1}
          keyboardType="number-pad"
        />
      ))}
</View>
{/* <ActivityIndicator color='#2436E7' /> */}

<View style={{height: 20}}>
{responseStatus === 'valid' && <Text style={{color: 'green'}}>Valid Pin</Text>}
{responseStatus === 'invalid' && <Text style={{color: 'red'}}>Invalid Pin</Text>}
{responseStatus === 'expired' && <><Text style={{color: 'red'}}>Expired Pin. </Text> <Pressable><Text style={{textDecorationLine: 'underline'}}>Resend Email?</Text></Pressable></>}
</View>

{!pinIsValid ? 
  <Pressable 
      disabled={pin.join('').length < 4}
      onPress={submitPin}
        style={({ pressed }) => [{ backgroundColor: pin.join('').length < 4  ? '#d1d1d1': '#2436E7' , marginTop: 20}, styles.button]}
      >
      <Text style={styles.text}>Validate Pin</Text>
    </Pressable>
: 
  <>
  <Controller
  control={control}
  rules={{
   required: true,
  }}
  render={({ field: { onChange, onBlur, value } }) => (
  <TextInputPaper
    label="Enter New Password"
    // left={<TextInput.Icon name="email" />}
    onBlur={onBlur}
    onChangeText={onChange}
    value={value}
    secureTextEntry={showPassword}
    right={<TextInputPaper.Icon onPress={() => setShowPassword(!showPassword)} name="eye" />}
    style={{ margin: 0, backgroundColor: 'white', width: 350  }}
    activeUnderlineColor="#8DC63F"
    underlineColor="#C5C5C5"
  />
  )}
  name="password"
/>
{errors.password && <Text>{errors.password.message}</Text>}

<View style={{height: 20}}/>
  <Controller
  control={control}
  rules={{
   required: true,
  }}
  render={({ field: { onChange, onBlur, value } }) => (
  <TextInputPaper
    label="Re-enter Password"
    // left={<TextInput.Icon name="email" />}
    onBlur={onBlur}
    onChangeText={onChange}
    value={value}
    secureTextEntry={showPassword}
    right={<TextInputPaper.Icon onPress={() => setShowPassword(!showPassword)} name="eye" />}
    style={{ marginBottom: 40, backgroundColor: 'white', width: 350 }}
    activeUnderlineColor="#8DC63F"
    underlineColor="#C5C5C5"
  />
  )}
  name="confirmPassword"
/>
{errors.confirmPassword && <Text>{errors.confirmPassword.message}</Text>}

<Pressable 
onPress={handleSubmit(submitPassword)}
        // onPress={() => setStep(false)} 
        // onPress={()=>toggleSwitch()}
        style={({ pressed }) => [{ backgroundColor: pressed ? '#1D2CB5': '#2436E7' , marginTop: 20}, styles.button]}
      >
      <Text style={styles.text}>Submit</Text>
    </Pressable>
  </>
}

    </View>
  )
}

export default Step2

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