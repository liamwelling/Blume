import { View, Text, StyleSheet, Modal, Pressable, Platform} from 'react-native'
import React, { useEffect } from 'react'
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
 import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react'
import InvestorCard from '../../components/InvestorCard';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import VerifiedInvestor from '../verifiedInvestors/VerifiedInvestor';
import VISubscribe from '../verifiedInvestors/VISubscribe/VISubscribe';
import useUserStore from '../../stateManagement/UserContext';
import { RootStackParamList } from '../../Navigation';
import useInvestorStore from '../../stateManagement/InvestorContext';
import axios from 'axios'
import { EXPO_PUBLIC_SERVER_URL } from '@env';
import { white } from 'react-native-paper/lib/typescript/styles/colors';


type Props = NativeStackScreenProps<RootStackParamList, 'VerifiedInvestor'>;

type Investor = {
  id: number;
  risk: string;
  industry_array: string[];
  first_name: string;
  last_name: string;
  city: string;
  country: string;
  linkedin: string;
  website: string;
  company: string;
  job_title: string;
};

type Risk = {
  label: string;
  value: string;
};

type Industry = {
  label: string;
  value: string;
};

const Leaderboard = ({conditionalInvestorToggle}: any) => {

  function capitalizeFirstLetter(string: string) {
    return string[0].toUpperCase() + string.slice(1);
  }
  
  const [loading, setLoading] = useState(false)
  const investorStore = useInvestorStore();
  const store = useUserStore();
  const navigation: any = useNavigation(); 
  const [openHow, setOpenHow] = useState(false);

  // const [investors, setInvestors] = useState([]);

  const [investors, setInvestors] = useState<Investor[]>([]);
  const [riskValue, setRiskValue] = useState<string >('');
  const [risk, setRisk] = useState<Risk[]>([
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' },
    { label: 'D', value: 'D' },
    { label: 'Select All', value: '' },
  ]);
  const [industryValue, setIndustryValue] = useState<string>('');
  const [industry, setIndustry] = useState<Industry[]>([
    { label: 'Crypto', value: 'Crypto' },
    { label: 'Blue Chip', value: 'Blue Chip' },
    { label: 'Utilities', value: 'Utilities' },
    { label: 'Tech', value: 'Tech' },
    { label: 'Biotech', value: 'Biotech' },
    { label: 'Real Estate', value: 'Real Estate' },
    { label: 'Select All', value: '' },
  ]);

  const getAllInvestors = async () => {
    axios.get<Investor[]>(EXPO_PUBLIC_SERVER_URL + `/investors/getall/`).then((response) => {
      setInvestors(response.data);
      setLoading(true);
    });
  };


  useEffect(() => {
    getAllInvestors();
  },[]);

 



  const [openRisk, setOpenRisk] = useState(false);
 
  

  const [openIndustry, setOpenIndustry] = useState(false);



  /// filters
  let filteredInvestors = investors

  if (industryValue != '') {
    // filteredInvestors = investors
    // console.log('filtered', industryValue)

    filteredInvestors = investors.filter((i: any) => i.industry_array.includes(`${industryValue}`))
  }
   if (riskValue != '' ){
    filteredInvestors = filteredInvestors.filter((i: any) => capitalizeFirstLetter(i.risk).includes(`${riskValue}`) )
  }
 
  let topThree = filteredInvestors.filter((investor, index) => index < 3);

  const [loadedFonts] = useFonts({
    Regular: require("../../assets/fonts/Graphik-Regular-Web.ttf"),
    Bold: require("../../assets/fonts/Graphik-Bold-Web.ttf"),
    Medium: require('../../assets/fonts/Graphik-Medium-Web.ttf')
});
if (!loadedFonts) {
    return <AppLoading />;
}
  return (
   <View>
    <View  style={[styles.innerContainer, {zIndex: openRisk || openIndustry ? 1000: 0 }]}>
      <Text style={{fontFamily: "Medium", fontSize: 20, color: '#2436E7',textAlign: 'left',marginLeft: 5, marginBottom: 20}}
      // onPress={()=> console.log(topThree[0])}
      >
       Leaderboard
       
      </Text>
  
     { Platform.OS === 'ios' ? 
     <View style={[styles.dropdownContainer, {zIndex: openRisk ? 1: 0}]}>
    
     <DropDownPicker
     
     open={openRisk}
     value={riskValue}
     items={risk}
     setOpen={setOpenRisk}
     setValue={setRiskValue}
     setItems={setRisk}
       textStyle={{
         fontFamily: "Regular",
         fontSize: 14
       }}
       placeholder="Risk"
      
     
       style={{borderRadius: 5, borderWidth: 0, width: 160, borderColor: '#C4C4C4',  shadowColor: '#171717',
       shadowOffset: {width: 0, height: 2},
       shadowOpacity: 0.1,
       shadowRadius: 3, 
       
     }}
       dropDownContainerStyle={{
         borderRadius: 5,
         width: 160,
         borderWidth: 0,
         maxHeight: 150,
         shadowOpacity: 0.1,
         shadowOffset: {width: 0, height: 2},
         shadowRadius: 3,
         shadowColor: '#171717',
         elevation: 15,

         // borderColor: 'rgba(22,20,10,0.1)',
         overflow: 'visible'
       }}
       // dropDownContainerStyle={{
       //   borderRadius:10,
       //   width: 200,
       //   borderWidth: 0,
       //   shadowColor: '#171717',
       //   shadowOffset: {width: -2, height: 4},
       //   shadowOpacity: 0.2,
       //   shadowRadius: 3, 
        
       //  }}
     />  
     <DropDownPicker
     
     open={openIndustry}
     value={industryValue}
     items={industry}
     setOpen={setOpenIndustry}
     setValue={setIndustryValue}
     setItems={setIndustry}
     textStyle={{
       fontFamily: "Regular",
       fontSize: 14
     }}
     placeholder="Industry"
    
   
     style={{borderRadius: 5, borderWidth: 0, width: 160,  borderColor: '#C4C4C4',  shadowColor: '#171717',
     shadowOffset: {width: 0, height: 2},
     shadowOpacity: 0.1,
     shadowRadius: 3, 
   }}
     dropDownContainerStyle={{
       borderRadius: 5,
       width: 160,
       borderWidth: 0,
       maxHeight: 150,
       shadowOpacity: 0.1,
       shadowOffset: {width: 0, height: 2},
       shadowRadius: 3,
       shadowColor: '#171717',
       elevation: 100,
       // zIndex: 3000,

       // borderColor: 'rgba(22,20,10,0.1)',
       overflow: 'visible'
     }}

   />  
   </View>
     : 
     //android
     <View style={styles.dropdownContainer}>
      <View style={{zIndex: openRisk ? 1: 0 }}>
        <DropDownPicker
        
        open={openRisk}
        value={riskValue}
        items={risk}
        setOpen={setOpenRisk}
        setValue={setRiskValue}
        setItems={setRisk}
          textStyle={{
            fontFamily: "Regular",
            fontSize: 14
          }}
          placeholder="Risk"
         
        
          style={{borderRadius: 5, borderWidth: 0, width: 160,  borderColor: '#C4C4C4',  shadowColor: '#171717',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.1,
          shadowRadius: 3, 
          elevation: 12
        }}
        dropDownContainerStyle={{
          borderRadius: 5,
          width: 160,
          borderWidth: 0,
          maxHeight: 150,
          shadowOpacity: 0.1,
          shadowOffset: {width: 0, height: 2},
          shadowRadius: 3,
          shadowColor: '#171717',
          elevation: 100,
         
          overflow: 'visible'
        }}
    
        />  
        </View>
        <View style={{zIndex: openIndustry ? 1: 0 }}>
        <DropDownPicker
        
        open={openIndustry}
        value={industryValue}
        items={industry}
        setOpen={setOpenIndustry}
        setValue={setIndustryValue}
        setItems={setIndustry}
        textStyle={{
          fontFamily: "Regular",
          fontSize: 14
        }}
        placeholder="Industry"
       
      
        style={{borderRadius: 5, borderWidth: 0, width: 160,  borderColor: '#C4C4C4',  shadowColor: '#171717',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 3, 
        elevation: 12
      }}
        dropDownContainerStyle={{
          borderRadius: 5,
          width: 160,
          borderWidth: 0,
          maxHeight: 150,
          shadowOpacity: 0.1,
          shadowOffset: {width: 0, height: 2},
          shadowRadius: 3,
          shadowColor: '#171717',
          elevation: 100,
         
          overflow: 'visible'
        }}

      />  
      </View>
      </View>
     }
      



      </View>
      <View     
      // style={{zIndex: openRisk ? 0: 1 }}
      >

    {investors && topThree.map((investor: any, index: number) => {
      return (
        <Pressable  
        key={index}
          onPress={() => {
          investorStore.setInvestorID(investor.idverified_investors); 
          conditionalInvestorToggle(investor.idverified_investors);
        }}>
              <InvestorCard 
                            key={index} 
                            firstName={investor.first_name} 
                            lastName={investor.last_name} 
                            risk={investor.risk} 
                            bio={investor.bio}
                            roi={investor.ROI}
                            imageURL={investor.image_url}
                            // photo={investor.photo}
           
                          />       
                           </Pressable>
      )    
    })}
    
    {loading && (topThree[0] == undefined)?
      <Text style={{textAlign: 'center', marginTop: 40, marginBottom: 40}}>No investors found.</Text>
    :
      null   
    }
     </View>
    </View>
  )
}
const styles = StyleSheet.create({
  innerContainer: {
    width: 360,
    marginLeft: 'auto',
    marginTop: 30,
    // zIndex: 2000
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    width: 200,
    // zIndex: 300,
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

export default Leaderboard