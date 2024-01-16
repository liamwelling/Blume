import React from 'react'
import { useState } from 'react';
import { TextInput } from "react-native-paper";
import { StyleSheet, Text, View, Pressable, Switch, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller, Resolver } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios'
import {EXPO_PUBLIC_SERVER_URL} from '@env';

// import BlumeLogo from '/Users/liamwelling/FirstProjectRN/assets/SVG/BlumeLockup.svg';

const InvestorSignUp = () => {

  const navigation: any = useNavigation();

  type FormValues = {
    fullName: string;
    email: string;
    SSN: string;
    // birthyear: string;
    facebook: string;
    twitter: string;
    instagram: string;
    linkedIn: string;
  };
  
  const schema1 = yup.object().shape({
    fullName: yup.string().max(32).required('Required Field'),
    email: yup.string().email().required(),
    SSN:  yup.string().max(32).required('Required Field'),
    // birthyear:  yup.string().max(32).required('Required Field'),
    facebook:  yup.string().max(32).required('Required Field'),
    twitter:  yup.string().max(32).required('Required Field'),
    instagram:  yup.string().max(32).required('Required Field'),
    linkedIn:  yup.string().max(32).required('Required Field'),

    

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

  // const onSubmit = (data: FormValues)=> console.log(data);

  const onSubmit = (data: FormValues) => {
    console.log(data)
    // registerUser(data)
  };

  const registerUser = (data: FormValues) => {
    axios.post(EXPO_PUBLIC_SERVER_URL + `/register/`,{
      
      email: data.email,
 
      
    }).then((response) => {
        console.log(response);
        navigation.navigate('Login')
    })
    .catch((error) => {
      console.log(error)
    })
    };




  const [openYear, setOpenYear] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);

const [loadedFonts] = useFonts({
  Regular: require("../../assets/fonts/Graphik-Regular-Web.ttf"),
  Bold: require("../../assets/fonts/Graphik-Bold-Web.ttf"),
  Medium: require("../../assets/fonts/Graphik-Medium-Web.ttf"),
});

if (!loadedFonts) {
    return <AppLoading />;
}
  return (
    <ScrollView>

    
    <View  style={styles.container}>
    {/* <BlumeLogo height={400} width={400} style={{marginBottom: -120, marginTop: -50}}/> */}

      <Text style={{ fontSize: 18, fontFamily: "Medium", marginBottom: 30, marginTop: 20, color: '#2436E7' }}>Investor Application</Text>
      <Text onPress={() => {navigation.navigate('Login')}} style={{textAlign: 'center', fontSize: 14, fontFamily: "Regular", textDecorationLine: 'underline', color: '#CCCCCC' , marginBottom: 20}}>Already have an account?</Text>

      <View style={styles.dropdownContainer} >
        <DropDownPicker
          open={openYear}
          value={value}
          items={items}
          setOpen={setOpenYear}
          setValue={setValue}
          setItems={setItems}
          placeholder="The Year You Were Born"
          placeholderStyle={{
            marginLeft: 10,
            fontFamily: "Medium"
          }}
          style={{borderRadius: 30, borderWidth: 1, borderColor: '#C4C4C4',  zIndex: 3000, height: 45}}
          dropDownContainerStyle={{
            borderRadius:30,
            elevation: 12,
            overflow: 'visible',
            zIndex: 1000,
            borderWidth: 1,
             borderColor: '#C4C4C4',
          }}
        />  
      </View>
      <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
    <TextInput
      label="Full Name"
      // left={<TextInput.Icon name="email" />}
      onBlur={onBlur}
      onChangeText={onChange}
      value={value}
      style={{ margin: 0, backgroundColor: 'white', width: 350  }}
      activeUnderlineColor="#8DC63F"
      underlineColor="#C5C5C5"
    />
    )}
    name="fullName"
    rules={{ required: true }}
  />
        <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
    <TextInput
      label="Email Address"
      // left={<TextInput.Icon name="email" />}
      onBlur={onBlur}
      onChangeText={onChange}
      value={value}
      style={{ margin: 0, backgroundColor: 'white', width: 350  }}
      activeUnderlineColor="#8DC63F"
      underlineColor="#C5C5C5"
    />
    )}
    name="email"
    rules={{ required: true }}
  />
        <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
    <TextInput
      label="Last 4 Digits of your Social"
      // left={<TextInput.Icon name="email" />}
      onBlur={onBlur}
      onChangeText={onChange}
      value={value}
      style={{ margin: 0, backgroundColor: 'white', width: 350  }}
      activeUnderlineColor="#8DC63F"
      underlineColor="#C5C5C5"
    />
    )}
    name="SSN"
    rules={{ required: true }}
  />


    
 
    {/* <Pressable style={styles.signUpWithButton}>
      <View style={styles.signUpWithButtonContainer}>
        <Text style={{fontFamily: 'Medium', fontSize: 14}} >Upload PDF Resume</Text>
        <View>
        <Text  style={{fontFamily: 'Medium', fontSize: 16, }}>+</Text>
        </View>
        
      </View>
    </Pressable> */}

    <View style={{marginRight: 'auto', marginLeft: 20, marginBottom: 30}}>
    <Text style={{ fontSize: 18, fontFamily: "Medium", marginBottom: 10, marginTop: 20, color: '#2436E7' }}>
      Share your social accounts with us.
    </Text>
    </View>

    <View style={{marginBottom: 20}}>
      <Text style={{fontFamily: 'Medium', fontSize: 14, marginBottom: -10, zIndex: 100}}>Facebook</Text>
      <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (        
  <TextInput
    label="Username"
    // left={<TextInput.Icon name="email" />}
    onBlur={onBlur}
    onChangeText={onChange}
    value={value}
    style={{ margin: 0, backgroundColor: 'white', width: 350  }}
    activeUnderlineColor="#8DC63F"
    underlineColor="#C5C5C5"
    
  />
  )}
  name="facebook"
/>
    </View>

    <View style={{marginBottom: 20}}>
      <Text style={{fontFamily: 'Medium', fontSize: 14, marginBottom: -10, zIndex: 100}}>Twitter</Text>
      <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (        
  <TextInput
    label="Username"
    // left={<TextInput.Icon name="email" />}
    onBlur={onBlur}
    onChangeText={onChange}
    value={value}
    style={{ margin: 0, backgroundColor: 'white', width: 350  }}
    activeUnderlineColor="#8DC63F"
    underlineColor="#C5C5C5"
    
  />
  )}
  name="twitter"
/>
    </View>

    <View style={{marginBottom: 20}}>
      <Text style={{fontFamily: 'Medium', fontSize: 14, marginBottom: -10, zIndex: 100}}>Instagram</Text>
      <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (        
  <TextInput
    label="Username"
    // left={<TextInput.Icon name="email" />}
    onBlur={onBlur}
    onChangeText={onChange}
    value={value}
    style={{ margin: 0, backgroundColor: 'white', width: 350  }}
    activeUnderlineColor="#8DC63F"
    underlineColor="#C5C5C5"
    
  />
  )}
  name="instagram"
/>
    </View>

    <View style={{marginBottom: 20}}>
      <Text style={{fontFamily: 'Medium', fontSize: 14, marginBottom: -10, zIndex: 100}}>LinkedIn</Text>
      <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (        
  <TextInput
    label="Username"
    // left={<TextInput.Icon name="email" />}
    onBlur={onBlur}
    onChangeText={onChange}
    value={value}
    style={{ margin: 0, backgroundColor: 'white', width: 350  }}
    activeUnderlineColor="#8DC63F"
    underlineColor="#C5C5C5"
    
  />
  )}
  name="linkedIn"
/>
    </View>

    <Pressable 
// onPress={() => {console.log('press')}}
    onPress={handleSubmit(onSubmit)} 
style={({ pressed }) => [{ backgroundColor: pressed ? '#1D2CB5': '#2436E7', marginBottom: 90 }, styles.button]}

// style={[styles.button, {marginBottom: 90}]}
>
<Text     style={styles.text}>Finish Account Setup</Text>
</Pressable>

    <Text style={{marginTop: 20, marginBottom: 100, fontFamily: 'Regular', fontSize: 10, textAlign: 'center', lineHeight: 15}}>By continuing, you agree to accept our{"\n"} Privacy Policy & Terms of Service.</Text>
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
    // backgroundColor: '#2436E7',
    width: 325,
    borderWidth: 1.5,
    borderColor: '#c5c5c5',
    marginTop: 30

  },
  signUpWithButtonContainer: {
    
    flexDirection: "row",
    justifyContent: "space-between",
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
    width: 325,
    marginBottom: 20,
    zIndex: 300,
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

export default InvestorSignUp