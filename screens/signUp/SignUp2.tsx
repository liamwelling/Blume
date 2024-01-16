import React from 'react'
import { useState } from 'react';
import { TextInput } from "react-native-paper";
import { StyleSheet, Text, View, Pressable, Switch, SafeAreaView, Dimensions } from 'react-native';
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import DropDownPicker from 'react-native-dropdown-picker';
import SwitchSelector from "react-native-switch-selector";
import { Label, Margin } from '@mui/icons-material';
import * as yup from "yup";
import { useForm, Controller, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
const SwitchSelect = SwitchSelector as any; 



const SignUp2 = () => {
  type FormValues ={
    promoCode: string;
  }
  
  const schema = yup.object().shape({
    promoCode: yup.string().required(),
  });
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema)
  });
  const year = (new Date()).getFullYear();
  const years = Array.from(new Array(100),( val, index) => index - year);
  const options = [
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" }
  ];

  const [openHow, setOpenHow] = useState(false);
  const [openYear, setOpenYear] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);
  
  
 

  const [crypto, setCrypto] = useState(false);
  const [blueChip, setBlueChip] = useState(false);
  const [utilities, setUtilities] = useState(false);
  const [tech, setTech] = useState(false);
  const [biotech, setBiotech] = useState(false);
  const [realEstate, setRealEstate] = useState(false);

  const [save, setSave] = useState(false);
  const [income, setIncome] = useState(false);
  const [outpace, setOutpace] = useState(false);
  const [earn, setEarn] = useState(false);
  const toggleSwitchSave = () => setSave(previousState => !previousState);
  const toggleSwitchIncome = () => setIncome(previousState => !previousState);
  const toggleSwitchOutpace = () => setOutpace(previousState => !previousState);
  const toggleSwitchEarn = () => setEarn(previousState => !previousState);

  const [loadedFonts] = useFonts({
    Regular: require("/Users/liamwelling/FirstProjectRN/assets/fonts/Graphik-Regular-Web.ttf"),
    Bold: require("/Users/liamwelling/FirstProjectRN/assets/fonts/Graphik-Bold-Web.ttf"),
    Medium: require('/Users/liamwelling/FirstProjectRN/assets/fonts/Graphik-Medium-Web.ttf')
});

if (!loadedFonts) {
    return <AppLoading />;
}
  return (
    <View style={styles.container}>
    <View style={{ flex: 1, width: 325}}>

      <Text style={{ fontSize: 24, fontFamily: "Bold", marginBottom: 10, marginTop: 40, lineHeight: 30 }}>
        Just a few more questions to optimize your <Text style={{color: '#2436E7'}}>Blume</Text> experience.
      </Text>

      <View style={styles.dropdownContainer} >
        <DropDownPicker
          open={openYear}
          value={value}
          items={items}
          setOpen={setOpenYear}
          setValue={setValue}
          setItems={setItems}
          placeholder="The Year You Were Born"
          style={{borderRadius: 30, borderWidth: 1, borderColor: '#C4C4C4'}}
          dropDownContainerStyle={{
            borderRadius:30,
          }}
        />  
      </View>

      <Text style={{fontFamily: "Medium", fontSize: 18, color: '#2436E7',textAlign: 'left', marginBottom: 20}}>
        Risk Tolerance
      </Text>

      <View style={{marginBottom: 20}}>
      <SwitchSelect
        options={options}
        initial={0}
        borderColor={'#0000001F'}
        backgroundColor={'#0000001F'}
        borderWidth={1}
        buttonMargin={3}
        buttonColor={'white'}
        height={30}
        textStyle={{ fontFamily: 'Medium'}}
        selectedTextStyle={{ fontFamily: 'Medium'}}
        selectedColor={'#2436e7'}
        // onPress={console.log(`Call onPress with value:}`)}
      />  
      </View>
      
    <Text style={{fontFamily: "Medium", fontSize: 18, color: '#2436E7',textAlign: 'left'}}>
        Investment Goals
    </Text> 
    
    <View style={styles.goalsContainer}>
      <View>
        <Text style={styles.goalsText}>Save for retirement</Text>   
      </View>
      <Switch
        style={{ transform: [{ scaleX: .9 }, { scaleY: .9 }] }}
        trackColor={{ false: "#C5C5C5", true: "#2436e7" }}
        thumbColor={save ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#C5C5C5"
        onValueChange={toggleSwitchSave}
        value={save} 
      />
    </View>
   
    <View style={styles.goalsContainer}>
      <View>
        <Text style={styles.goalsText}>Income for next large expenditure</Text>   
      </View>
      <Switch
        style={{ transform: [{ scaleX: .9 }, { scaleY: .9 }] }}
        trackColor={{ false: "#C5C5C5", true: "#2436e7" }}
        thumbColor={income ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#C5C5C5"
        onValueChange={toggleSwitchIncome}
        value={income} 
      />
    </View>
    
    <View style={styles.goalsContainer}>
      <View>
        <Text style={styles.goalsText}>Outpace Inflation</Text>   
      </View>
      <Switch
        style={{ transform: [{ scaleX: .9 }, { scaleY: .9 }] }}
        trackColor={{ false: "#C5C5C5", true: "#2436e7" }}
        thumbColor={outpace ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#C5C5C5"
        onValueChange={toggleSwitchOutpace}
        value={outpace} 
      />
    </View>

    <View style={styles.goalsContainer}>
      <View>
        <Text style={styles.goalsText}>Earn higher returns on your money</Text>   
      </View>
      <Switch
        style={{ transform: [{ scaleX: .9 }, { scaleY: .9 }] }}
        trackColor={{ false: "#C5C5C5", true: "#2436e7" }}
        thumbColor={earn ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#C5C5C5"
        onValueChange={toggleSwitchEarn}
        value={earn} 
      />
    </View>

    <Text style={{fontFamily: "Medium", fontSize: 18, color: '#2436E7',textAlign: 'left', paddingBottom: 20}}>
        Mainly Interested In
    </Text> 


  
<View style={styles.interestContainer}>
    {crypto?
    <Pressable style={styles.interestButton2}>
      <Text  onPress={() => setCrypto(false)}  style={styles.interestButtonText2}>Crypto</Text>
    </Pressable>
    :
    <Pressable style={styles.interestButton1}>
      <Text  onPress={() => setCrypto(true)}  style={styles.interestButtonText1}>Crypto</Text>
    </Pressable>
    }

    {blueChip?
    <Pressable style={styles.interestButton2}>
      <Text  onPress={() => setBlueChip(false)}  style={styles.interestButtonText2}>Blue Chip</Text>
    </Pressable>
    :
    <Pressable style={styles.interestButton1}>
      <Text  onPress={() => setBlueChip(true)}  style={styles.interestButtonText1}>Blue Chip</Text>
    </Pressable>
    }
        
    {utilities?
    <Pressable style={styles.interestButton2}>
      <Text  onPress={() => setUtilities(false)}  style={styles.interestButtonText2}>Utilities</Text>
    </Pressable>
    :
    <Pressable style={styles.interestButton1}>
      <Text  onPress={() => setUtilities(true)}  style={styles.interestButtonText1}>Utilities</Text>
    </Pressable>
    }
</View>

<View style={styles.interestContainer} >
    {tech?
    <Pressable style={styles.interestButton2}>
      <Text  onPress={() => setTech(false)}  style={styles.interestButtonText2}>Tech</Text>
    </Pressable>
    :
    <Pressable style={styles.interestButton1}>
      <Text  onPress={() => setTech(true)}  style={styles.interestButtonText1}>Tech</Text>
    </Pressable>
    }

    {biotech?
    <Pressable style={styles.interestButton2}>
      <Text  onPress={() => setBiotech(false)}  style={styles.interestButtonText2}>Biotech</Text>
    </Pressable>
    :
    <Pressable style={styles.interestButton1}>
      <Text  onPress={() => setBiotech(true)}  style={styles.interestButtonText1}>Biotech</Text>
    </Pressable>
    }

    {realEstate?
    <Pressable style={styles.interestButton2}>
      <Text  onPress={() => setRealEstate(false)}  style={styles.interestButtonText2}>Real Estate</Text>
    </Pressable>
    :
    <Pressable style={styles.interestButton1}>
      <Text  onPress={() => setRealEstate(true)}  style={styles.interestButtonText1}>Real Estate</Text>
    </Pressable>
    }
</View>
<View style={{marginBottom: 20, backgroundColor: 'blue', height: 200}}>
<Controller
        control={control}
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (        
  <TextInput
    label="Promo Code"
    // left={<TextInput.Icon name="email" />}
    onBlur={onBlur}
    onChangeText={onChange}
    value={value}
    style={{ margin: 0, backgroundColor: 'white', width: 350  }}
    activeUnderlineColor="#8DC63F"
    underlineColor="#C5C5C5"
    
  />
  )}
  name="promoCode"
/>
</View>
<View style={styles.dropdownContainer}>
        <DropDownPicker
          open={openHow}
          value={value}
          items={items}
          setOpen={setOpenHow}
          setValue={setValue}
          setItems={setItems}
          textStyle={{
            fontFamily: "Medium"
          }}
          placeholder="How Did You Hear About Us"
          style={{borderRadius: 30, borderWidth: 1, borderColor: '#C4C4C4' }}
          dropDownContainerStyle={{
            borderRadius:30,
           
           }}
        />  
      </View>


<Pressable style={styles.button}>
  <Text  onPress={() => console.log('presss')}  style={styles.text}>Finish Account Setup</Text>
</Pressable>
    </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    marginVertical: 10
  },
  goalsText: {
    fontSize: 14,
    fontFamily: 'Regular',
    color: '#898B8D'
    
  },
  buttonIcon: {
    marginTop: 5,
    marginBottom: 'auto',
    marginRight: 'auto',
    marginLeft: 15,
  },
  interestButton1: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: 'white',
    width: 96,
    height: 31,
    // padding: 20,
    borderWidth: 1,
    borderColor:  '#2436E7' 
  }, 
  interestButton2: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    elevation: 3,
    backgroundColor: '#2436E7',
    borderWidth: 1,
    borderColor:  '#2436E7',
    width: 96,
    height: 31,  
  }, 
  interestButtonText1: {
    // flex: 1,
    fontSize: 13,
    lineHeight: 21,
    fontFamily: 'Medium',
    letterSpacing: 0.25,
    color: '#2436E7',
  },
  interestButtonText2: {
    // flex: 1,
    fontSize: 13,
    lineHeight: 21,
    fontFamily: 'Medium',
    letterSpacing: 0.25,
    color: 'white',
  },
  interestContainer: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-between",
    marginBottom: 10
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
  }, 
  logo: {
    marginTop: 100
  }, 
  text: {
    fontSize: 16,
    lineHeight: 21,
    // fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    fontFamily: 'Medium'
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
    zIndex: 100,
    marginBottom: 30
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

export default SignUp2