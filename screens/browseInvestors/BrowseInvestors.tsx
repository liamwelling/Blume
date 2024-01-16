import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, Dimensions, Platform } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import IndustrySelect from './IndustrySelect';
import FakeInvestorData from '../../assets/FakeInvestorData';
import InvestorCard from '../../components/InvestorCard';
import CheckBox from '../../components/Checkbox';
import { Biotech } from '@mui/icons-material';
import Checkbox from 'expo-checkbox';
import { ScrollView } from 'react-native-gesture-handler';
import useInvestorStore from '../../stateManagement/InvestorContext';
import VerifiedInvestor from '../verifiedInvestors/VerifiedInvestor';
import VISubscribe from '../verifiedInvestors/VISubscribe/VISubscribe';
import useUserStore from '../../stateManagement/UserContext';
import axios from 'axios'
import { EXPO_PUBLIC_SERVER_URL } from '@env';


import InvestorPageTest from '../investorPage/InvestorPageTest';
import Purchases from 'react-native-purchases';
import { ScreenWidth } from '@rneui/base';

interface Investor {
  idverified_investors: string;
  risk: string;
  industry_array: string[];
}


const BrowseInvestors = () => {

  const navigation: any = useNavigation();
  const screenWidth = Dimensions.get("window").width;

  function capitalizeFirstLetter(string: string) {
    return string[0].toUpperCase() + string.slice(1);
  } 

  function removeSymbols  (string: string) {
    let stringified = JSON.stringify(string)
    return string.replace(/[]/g, '');
  }

  /// get investors 
  const [investors, setInvestors] = useState<Investor[]>([]);
  const getAllInvestors = async () => {
    axios.get(EXPO_PUBLIC_SERVER_URL + `/investors/getall/`).then(
      (response) => {
        console.log('RES:',response.data);
        setInvestors(response.data);
      }
    )
  }
  useEffect(() => {
    getAllInvestors();
  },[]);

  /// context
  const investorStore = useInvestorStore();
  const store = useUserStore();
  /// data filtering
  const [industryList, setIndustryList] = useState<string[]>([])
  const clearIndustryList = () => {
    setIndustryList([])
  }
  let topThree = FakeInvestorData.filter((investor: any, index: any) => index < 10);

  let industryFilter = FakeInvestorData.filter((i: any) => i.stocks.some((s: any) => industryList.includes(s.industry)));
  
  /// modals
  const conditionalInvestorToggle = (ID: any) => {
    if (store.MyInvestors.includes(ID)){
      investorModalToggle()
    } else {
      subInvestorModalToggle()
    }
  }

  const [investorModalVisible, setInvestorModalVisible] = useState(false);
  const investorModalToggle = () => {
       setInvestorModalVisible(!investorModalVisible)
  }

  const [subInvestorModalVisible, setSubInvestorModalVisible] = useState(false);
  const subInvestorModalToggle = () => {
       setSubInvestorModalVisible(!subInvestorModalVisible)
  }
  const [modalVisible, setModalVisible] = useState(false);
  const ModalToggle = () => {
       setModalVisible(!modalVisible)
    }
  /// form states
  const [crypto, setCrypto] = useState(false)
  const [energy, setEnergy] = useState(false)
  const [materials, setMaterials] = useState(false)
  const [industrials, setIndustrials] = useState(false)
  const [discretionary, setDiscretionary] = useState(false)
  const [staples, setStaples] = useState(false)
  const [health, setHealth] = useState(false)
  const [financials, setFinancials] = useState(false)
  const [technology, setTechnology] = useState(false)
  const [telecommunication, setTelecommunication] = useState(false)
  const [utilities, setUtilities] = useState(false)
  const [realEstate, setRealEstate] = useState(false)

 ///dropdowns
  const [openRisk, setOpenRisk] = useState(false);
  const [openYear, setOpenYear] = useState(false);
  const [riskValue, setRiskValue] = useState(null);
  const [yearValue, setYearValue] = useState(null);
 
  const [risk, setRisk ]= useState([
    {label: 'A', value: 'A'},
    {label: 'B', value: 'B'},
    {label: 'C', value: 'C'},
    {label: 'D', value: 'D'},
    {label: 'Select All', value: ''},
  ]);
  const [year, setYear] = useState([
    {label: 'All', value: 'All'},
    {label: '5 Year', value: '5 Year'},
    {label: '1 Year', value: '1 Year'},
    {label: 'Month', value: 'Month'},
    {label: 'Week', value: 'Week'},
    {label: 'Day', value: 'Day'},
  ]);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);

  /// filtered data
  const [finalInvestorList, setFinalInvestorList] = useState(FakeInvestorData)
  // let filteredInvestors = FakeInvestorData
  let filteredInvestors = investors
  // .map((i:any) => {return{...i, test: removeSymbols(i.industries)}})

  

  if (industryList.length != 0) {
   
    console.log('filtered ::', industryList)
  
      filteredInvestors = investors.filter(obj => {
        return industryList.every(industry => obj.industry_array.includes(industry));
      });

  }
  const clearFilters = () => {
    setIndustryList([])
  }

  if (riskValue != null ){
    filteredInvestors = filteredInvestors.filter((i: any) => capitalizeFirstLetter(i.risk).includes(`${riskValue}`) )
  }


// Delete industry filter using industry button
  const HandleIndustryDelete = (industryName: string) => {
    const newIndustryList = [...industryList];
    const newList = newIndustryList.filter((industry) => industry !== industryName);
    setIndustryList(newList);
    
  }
  // const [displayedList, setDisplayedList] = useState(FakeInvestorData)
  // if (industryList.length > 0){
  //   setDisplayedList(industryFilter)
  // }
  const makePurchase = async () => {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      console.log(customerInfo)
      // access latest customerInfo
    } catch (e) {
     // Error fetching customer info
    }
  }
  

  const [isChecked, setChecked] = useState(false);
  const [loadedFonts] = useFonts({
    Regular: require("../../assets/fonts/Graphik-Regular-Web.ttf"),
    Bold: require("../../assets/fonts/Graphik-Bold-Web.ttf"),
    Medium: require('../../assets/fonts/Graphik-Medium-Web.ttf')
  });
  if (!loadedFonts) {
    return <AppLoading />;
  }
  return (
    <ScrollView >
    <View 
      style={styles.container}
    >
      
      
      
      

      <Modal
      animationType="slide"
      presentationStyle="fullScreen"
      transparent={true}
      statusBarTranslucent={true}
      visible={modalVisible}>
        <IndustrySelect ModalToggle={ModalToggle} setIndustryList={setIndustryList} industryList={industryList} setCrypto={setCrypto} crypto={crypto}  energy={energy} setEnergy={setEnergy} materials={materials} setMaterials={setMaterials} industrials={industrials} setIndustrials={setIndustrials} discretionary={discretionary} setDiscretionary={setDiscretionary} staples={staples} setStaples={setStaples} health={health} setHealth={setHealth} financials={financials} setFinancials={setFinancials} technology={technology} setTechnology={setTechnology} telecommunication={telecommunication} setTelecommunication={setTelecommunication} utilities={utilities} setUtilities={setUtilities} realEstate={realEstate} setRealEstate />

      </Modal>
      <Modal
      presentationStyle="fullScreen"
        statusBarTranslucent={true}
        animationType="slide"
        transparent={true}
        visible={investorModalVisible}>
          <InvestorPageTest investorModalToggle={investorModalToggle} />
          {/* <VerifiedInvestor investorModalToggle={investorModalToggle} /> */}
      </Modal>
      <Modal
      presentationStyle="fullScreen"
        animationType="slide"
        transparent={true}  
        statusBarTranslucent={true}
        visible={subInvestorModalVisible}>
          <VISubscribe investorModalToggle={subInvestorModalToggle}/>
      </Modal>

      <View style={styles.innerContainer}>

      <Text style={styles.headerText}
      // onPress={() => console.log(filteredInvestors)}
      >Browse Investors</Text>   

    { Platform.OS === 'ios' ? 
      <View style={styles.dropdownContainer}>
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
            elevation: 12,

            // borderColor: 'rgba(22,20,10,0.1)',
            overflow: 'visible'
          }}
      /> 

      
    <TouchableOpacity>
      <Pressable 
       onPress={() => ModalToggle()} >
        <View style={styles.industryContainer} >
      <Text style={styles.industryContainerText}> Industry</Text>
      </View>
      </Pressable>
    </TouchableOpacity>
      </View>
    :
      <View style={styles.dropdownContainer}>
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
            // shadowColor: '#171717',
            elevation: 12,
           
            overflow: 'visible'
          }}
      /> 


      <TouchableOpacity>
      <Pressable 
      onPress={() => ModalToggle()} >
        <View style={styles.industryContainer} >
      <Text style={styles.industryContainerText}> Industry</Text>
      </View>
      </Pressable>
      </TouchableOpacity>
      </View>
    }





      <View style={{ width: 350, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignContent: 'space-between',}}>
 


      {crypto && 
      <Pressable  style={[styles.industryButton, {marginRight: 10, marginBottom: 10}]}
      onPress={() => {HandleIndustryDelete('Crypto'); setCrypto(false)}}
      >
        <Text style={styles.industryButtonText}>Crypto</Text>
        <Text style={styles.industryButtonX}
        > X</Text>
      </Pressable>
       }
      {energy &&   
            <Pressable  style={[styles.industryButton, {marginRight: 10, marginBottom: 10}]}
            onPress={() => {HandleIndustryDelete('Energy'); setEnergy(false)}}
            >
            <Text style={styles.industryButtonText}>Energy</Text>
            <Text style={styles.industryButtonX}
            > X</Text>
          </Pressable>
      }
       {materials &&   
  
            <Pressable  style={[styles.industryButton, {marginRight: 10, marginBottom: 10}]}
            onPress={() => {HandleIndustryDelete('Materials'); setMaterials(false)}}
            >
            <Text style={styles.industryButtonText}>Materials</Text>
            <Text style={styles.industryButtonX}
            > X</Text>
          </Pressable>
      }
       {industrials &&   
            <Pressable  style={[styles.industryButton, {marginRight: 10, marginBottom: 10}]}
            onPress={() => {HandleIndustryDelete('Industrials'); setIndustrials(false)}}
            >
            <Text style={styles.industryButtonText}>Industrials</Text>
            <Text style={styles.industryButtonX}
            > X</Text>
          </Pressable>
      }
      {discretionary &&   
            <Pressable  style={[styles.industryButton, {marginRight: 10, marginBottom: 10}]}
            onPress={() => {HandleIndustryDelete('ConsumerDiscretionary'); setDiscretionary(false)}}
            >
            <Text style={styles.industryButtonText}>Consumer Discretionary</Text>
            <Text style={styles.industryButtonX}
            > X</Text>
          </Pressable>
      }
       {staples &&   
   
            <Pressable  style={[styles.industryButton, {marginRight: 10, marginBottom: 10}]}
            onPress={() => {HandleIndustryDelete('ConsumerStaples'); setStaples(false)}}
            >
            <Text style={styles.industryButtonText}>Consumer Staples</Text>
            <Text style={styles.industryButtonX}
            > X</Text>
          </Pressable>
      }
       {health &&   
            <Pressable style={[styles.industryButton, {marginRight: 10, marginBottom: 10}]}
            onPress={() => {HandleIndustryDelete('HealthCare'); setHealth(false)}}
            >
            <Text style={styles.industryButtonText}>Health Care</Text>
            <Text style={styles.industryButtonX}
            > X</Text>
          </Pressable>
      }
       {financials &&  
           <Pressable  style={[styles.industryButton, {marginRight: 10, marginBottom: 10}]}
           onPress={() => {HandleIndustryDelete('Financials'); setFinancials(false)}}
           >
           <Text style={styles.industryButtonText}>Financials</Text>
           <Text style={styles.industryButtonX}
           > X</Text>
         </Pressable> 

      }
       {technology && 
           <Pressable style={[styles.industryButton, {marginRight: 10, marginBottom: 10}]}
           onPress={() => {HandleIndustryDelete('InformationTechnology'); setTechnology(false)}}
           >
           <Text style={styles.industryButtonText}>Information Technology</Text>
           <Text style={styles.industryButtonX}
           > X</Text>
         </Pressable>  

      }
       {telecommunication && 
           <Pressable  style={[styles.industryButton, {marginRight: 10, marginBottom: 10}]}
           onPress={() => {HandleIndustryDelete('TelecommunicationServices'); setTelecommunication(false)}}
           >
           <Text style={styles.industryButtonText}>Telecommunication Services</Text>
           <Text style={styles.industryButtonX}
           > X</Text>
         </Pressable>  

      }
       {utilities &&   
           <Pressable  style={[styles.industryButton, {marginRight: 10, marginBottom: 10}]}
           onPress={() => {HandleIndustryDelete('Utilities'); setUtilities(false)}}
           >
           <Text style={styles.industryButtonText}>Utilities</Text>
           <Text style={styles.industryButtonX}
           > X</Text>
         </Pressable>
      }
       {realEstate &&  
           <Pressable  style={[styles.industryButton, {marginRight: 10, marginBottom: 10}]}
           onPress={() => {HandleIndustryDelete('RealEstate'); setRealEstate(false)}}
           >
           <Text style={styles.industryButtonText}>Real Estate</Text>
           <Text style={styles.industryButtonX}
           > X</Text>
         </Pressable> 

      }

    </View>      
    </View>

    <View style={{marginLeft: 'auto' ,marginRight: 'auto', zIndex: -100}}>
    {investors && filteredInvestors.map((investor:any, index: number) => {
                      return ( 
                        <Pressable  
                          key={index}
                          onPress={() => {
                            // console.log(investor.industry_array)
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
                  </View>
    </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
  
  },
  headerText: {
    fontFamily: 'Medium',
    fontSize: 22,
    marginTop: 100,
    marginBottom: 20
    // marginLeft: 30
  },
  dropdownContainer: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent:'space-evenly',
    width: 200,
    zIndex: 2000,
    marginBottom: 30
  },
  industryContainer: {
    width: 160,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20

  },
  industryContainerText: {
    fontFamily: 'Regular',
    fontSize: 16,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  innerContainer: {
    width: 360,
    marginLeft: 'auto',
    marginTop: 30,
    zIndex: 2000,
    marginRight: 'auto'
   
  },
  industryButton: {
    borderColor: '#C5C5C5',
    height: 30,
    borderWidth: 1,
    minWidth: 100,
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: "center",
    borderRadius: 30
  },
  industryButtonText: {
    paddingLeft: 10,
    marginBottom: 'auto',
    marginTop: 'auto',
    // margin: 'auto',
    fontFamily: 'Medium',
    fontSize: 13,
    color: '#C5C5C5',
    // marginLeft: 10
  },
  industryButtonX: {
    // marginBottom: 'auto',
    // marginTop: 'auto',
    fontFamily: 'Medium',
    fontSize: 13,
    color: '#C5C5C5',
    marginRight: 10
  }



});

export default BrowseInvestors