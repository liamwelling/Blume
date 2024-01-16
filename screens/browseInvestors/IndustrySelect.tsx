 import { View, Text, StyleSheet, ScrollView, Pressable, Modal} from 'react-native'
import React, { useState } from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import Checkbox from 'expo-checkbox';
import CheckBox from '@react-native-community/checkbox';

const IndustrySelect = ({ModalToggle,setIndustryList, industryList, setCrypto, crypto, energy, setEnergy, materials, setMaterials, industrials, setIndustrials, discretionary, setDiscretionary, staples, setStaples, health, setHealth, financials, setFinancials, technology, setTechnology, telecommunication, setTelecommunication, utilities, setUtilities, realEstate, setRealEstate}:any) => {
  // const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [isChecked, setChecked] = useState(false);
  const addIndustry = (industry: string) => {
    if (industryList.includes(industry)) {
      const newIndustryList = [...industryList];
      const newList = newIndustryList.filter((industry) => industry !== industry);
      setIndustryList(newList);
    } else {
      setIndustryList((prevState: any) => [...prevState, industry])
    }
  }

  const [toggleCheckBox, setToggleCheckBox] = useState(false)

 const ButtonModal = () => {
  return (
    <View style={{height: 100, backgroundColor: 'grey', bottom: 0, position: 'absolute', width: '100%'}}>
      <Text>Button</Text>
    </View>
  )
 }

  const [loadedFonts] = useFonts({
    Regular: require("../../assets/fonts/Graphik-Regular-Web.ttf"),
    Bold: require("../../assets/fonts/Graphik-Bold-Web.ttf"),
    Medium: require('../../assets/fonts/Graphik-Medium-Web.ttf')
  });
  if (!loadedFonts) {
    return <AppLoading />;
  }
  return (
    
    <View style={styles.main}>
      <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
      
      <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Filter Categories</Text>
      
      <Pressable onPress={() =>ModalToggle()}>
        <Text >X</Text>
      </Pressable>
      
      </View>

      <View style={styles.selectContainer}>
     
          <Pressable style={styles.categoryRow}     onPress={()=>{
        setCrypto(!crypto); 
        addIndustry('Crypto')}}>
            <Text style={[{color: crypto? 'black': '#CCCCCC'},styles.categoryText]}>Crypto</Text>
       
            <Checkbox
              style={[{borderWidth: crypto? 4: 1},{borderRadius: 50,  borderColor: '#D8D8D8', }]}
              value={crypto}
              onValueChange={()=>{
                setCrypto(!crypto); 
                addIndustry('Crypto')
                // setIndustryList((prevState: any) => [...prevState, 'Crypto'])
              }}
              
              color={crypto ? '#2436E7' : undefined}
            />
          </Pressable>
          {/* <View style={{flexDirection: 'row', alignItems: 'center', }}>
            <View style={{flex: 1, height: 1, backgroundColor: '#CCCCCC',}} />
          </View> */}
         

          <Pressable style={styles.categoryRow}
            onPress={()=>{setEnergy(!energy); 
            addIndustry('Energy')}}
            >
            <Text style={[{color: energy? 'black': '#CCCCCC'},styles.categoryText]}>Energy</Text>
            <Checkbox
              style={[{borderWidth: energy? 4: 1},{borderRadius: 50, borderColor: '#D8D8D8'}]}
              value={energy}
              onValueChange={()=>{setEnergy(!energy); 
                addIndustry('Energy')
                // setIndustryList((prevState: any) => [...prevState, 'Energy'])
              }}
              color={energy ? '#2436E7' : undefined}
            />
          </Pressable>
       

          <Pressable style={styles.categoryRow}
           onPress={()=>{setMaterials(!materials); 
            addIndustry('Materials');
          }}
          >
            <Text style={[{color: materials? 'black': '#CCCCCC'},styles.categoryText]}>Materials</Text>
            <Checkbox
              style={[{borderWidth: materials? 4: 1},{borderRadius: 50, borderColor: '#D8D8D8'}]}
              value={materials}
              onValueChange={()=>{
                setMaterials(!materials); 
                addIndustry('Materials');
              }}
              color={materials ? '#2436E7' : undefined}
            />
          </Pressable>
          {/* <Pressable style={{flexDirection: 'row', alignItems: 'center', }}>
            <Pressable style={{flex: 1, height: 1, backgroundColor: '#CCCCCC',}} />
          </Pressable> */}

          <Pressable style={styles.categoryRow}
              onPress={()=>{
                setIndustrials(!industrials); 
                addIndustry('Industrials')}}
          >
            <Text style={[{color: industrials? 'black': '#CCCCCC'},styles.categoryText]}>Industrials</Text>
            <Checkbox
              style={[{borderWidth: industrials? 4: 1},{borderRadius: 50, borderColor: '#D8D8D8'}]}
              value={industrials}
              onValueChange={()=>{setIndustrials(!industrials); setIndustryList((prevState: any) => [...prevState, 'Industrials'])}}
              color={industrials ? '#2436E7' : undefined}
            />
          </Pressable>
          {/* <Pressable style={{flexDirection: 'row', alignItems: 'center', }}>
            <Pressable style={{flex: 1, height: 1, backgroundColor: '#CCCCCC',}} />
          </Pressable> */}

          <Pressable style={styles.categoryRow}
              onPress={()=>{setDiscretionary(!discretionary); addIndustry('ConsumerDiscretionary')}}

          >
            <Text style={[{color: discretionary? 'black': '#CCCCCC'},styles.categoryText]}>Consumer Discretionary</Text>
            <Checkbox
              style={[{borderWidth: discretionary? 4: 1},{borderRadius: 50, borderColor: '#D8D8D8'}]}
              value={discretionary}
              onValueChange={()=>{setDiscretionary(!discretionary); setIndustryList((prevState: any) => [...prevState, 'ConsumerDiscretionary'])}}
              color={discretionary ? '#2436E7' : undefined}
            />
          </Pressable>
          {/* <Pressable style={{flexDirection: 'row', alignItems: 'center', }}>
            <Pressable style={{flex: 1, height: 1, backgroundColor: '#CCCCCC',}} />
          </Pressable> */}

          <Pressable style={styles.categoryRow}
              onPress={()=>{
                setStaples(!staples); 
                addIndustry('ConsumerStaples')}}
          >
            <Text style={[{color: staples? 'black': '#CCCCCC'},styles.categoryText]}>Consumer Staples</Text>
            <Checkbox
              style={[{borderWidth: staples? 4: 1},{borderRadius: 50,  borderColor: '#D8D8D8'}]}
              value={staples}
              onValueChange={()=>{setStaples(!staples); setIndustryList((prevState: any) => [...prevState, 'ConsumerStaples'])}}
              color={staples ? '#2436E7' : undefined}
            />
          </Pressable>
          {/* <Pressable style={{flexDirection: 'row', alignItems: 'center', }}>
            <Pressable style={{flex: 1, height: 1, backgroundColor: '#CCCCCC',}} />
          </Pressable> */}

          <Pressable style={styles.categoryRow}
            onPress={()=>{
              setHealth(!health); 
              addIndustry('HealthCare')}}
          >
            <Text style={[{color: health? 'black': '#CCCCCC'},styles.categoryText]}>Health Care</Text>
            <Checkbox
              style={[{borderWidth: health? 4: 1},{borderRadius: 50, borderColor: '#D8D8D8'}]}
              value={health}
              onValueChange={()=>{setHealth(!health); setIndustryList((prevState: any) => [...prevState, 'HealthCare'])}}
              color={health ? '#2436E7' : undefined}
            />
          </Pressable>
          {/* <Pressable style={{flexDirection: 'row', alignItems: 'center', }}>
            <Pressable style={{flex: 1, height: 1, backgroundColor: '#CCCCCC',}} />
          </Pressable> */}

          <Pressable style={styles.categoryRow} 
            onPress={()=>{setFinancials(!financials); addIndustry('Financials')}}

          >
            <Text style={[{color: financials? 'black': '#CCCCCC'},styles.categoryText]}>Financials</Text>
            <Checkbox
              style={[{borderWidth: financials? 4: 1},{borderRadius: 50, borderColor: '#D8D8D8'}]}
              value={financials}
              onValueChange={()=>{setFinancials(!financials); setIndustryList((prevState: any) => [...prevState, 'Financials'])}}
              color={financials ? '#2436E7' : undefined}
            />
          </Pressable>
          {/* <Pressable style={{flexDirection: 'row', alignItems: 'center', }}>
            <Pressable style={{flex: 1, height: 1, backgroundColor: '#CCCCCC',}} />
          </Pressable> */}

          <Pressable style={styles.categoryRow}
              onPress={()=>{setTechnology(!technology); addIndustry('InformationTechnology')}}
          
          >
            <Text style={[{color: technology? 'black': '#CCCCCC'},styles.categoryText]}>Information Technology</Text>
            <Checkbox
              style={[{borderWidth: technology? 4: 1},{borderRadius: 50, borderColor: '#D8D8D8'}]}
              value={technology}
              onValueChange={()=>{setTechnology(!technology); setIndustryList((prevState: any) => [...prevState, 'InformationTechnology'])}}
              color={technology ? '#2436E7' : undefined}
            />
          </Pressable>
          {/* <Pressable style={{flexDirection: 'row', alignItems: 'center', }}>
            <Pressable style={{flex: 1, height: 1, backgroundColor: '#CCCCCC',}} />
          </Pressable> */}

          <Pressable style={styles.categoryRow}
            onPress={()=>{setTelecommunication(!telecommunication); addIndustry('TelecommunicationServices')}}
          >
            <Text style={[{color: telecommunication? 'black': '#CCCCCC'},styles.categoryText]}>Telecommunication Services</Text>
            <Checkbox
              style={[{borderWidth: telecommunication? 4: 1},{borderRadius: 50, borderColor: '#D8D8D8'}]}
              value={telecommunication}
              onValueChange={()=>{setTelecommunication(!telecommunication); setIndustryList((prevState: any) => [...prevState, 'TelecommunicationServices'])}}
              color={telecommunication ? '#2436E7' : undefined}
            />
          </Pressable>
          {/* <Pressable style={{flexDirection: 'row', alignItems: 'center', }}>
            <Pressable style={{flex: 1, height: 1, backgroundColor: '#CCCCCC',}} />
          </Pressable> */}

          <Pressable style={styles.categoryRow}
          onPress={()=>{setUtilities(!utilities); addIndustry('Utilities')}}

          >
            <Text style={[{color: utilities? 'black': '#CCCCCC'},styles.categoryText]}>Utilities</Text>
            <Checkbox
              style={[{borderWidth: utilities? 4: 1},{borderRadius: 50, borderColor: '#D8D8D8'}]}
              value={utilities}
              onValueChange={()=>{setUtilities(!utilities); setIndustryList((prevState: any) => [...prevState, 'Utilities'])}}
              color={utilities ? '#2436E7' : undefined}
            />
          </Pressable>
          {/* <Pressable style={{flexDirection: 'row', alignItems: 'center', }}>
            <Pressable style={{flex: 1, height: 1, backgroundColor: '#CCCCCC',}} />
          </Pressable> */}

          <Pressable style={styles.categoryRow}               
            onPress={()=>{setRealEstate(!realEstate); addIndustry('RealEstate')}}
          >
            <Text style={[{color: realEstate? 'black': '#CCCCCC'},styles.categoryText]}>Real Estate</Text>
            <Checkbox
              style={[{borderWidth: realEstate? 4: 1},{borderRadius: 50, borderColor: '#D8D8D8'}]}
              value={realEstate}
              onValueChange={()=>{setRealEstate(!realEstate); setIndustryList((prevState: any) => [...prevState, 'RealEstate'])}}
              color={realEstate ? '#2436E7' : undefined}
            />
          </Pressable>
   
        

      </View>
      
      <View style={styles.bottomContainer}>
        {/* <Text style={styles.largeText}>Hashtags</Text>
        <View style={styles.hashtagContainer}>
          <Text style={styles.hashtagText}>
          #crypto #tech #growth #biotech #crypto
          </Text>
        </View> */}

        {/* <Pressable style={styles.button}>
    <Text  onPress={() =>ModalToggle()} style={styles.buttonText}>Apply Filters</Text>
  </Pressable>
  <Text style={styles.smallText}>Rest Filters</Text> */}


  {/* <Modal     animationType="slide"
      transparent={true}
      >
    <ButtonModal />
  </Modal> */}
      </View>


    </View>
    </ScrollView>
    <View style={styles.bottomButtonContainer}>
    <Pressable style={styles.button}>
    <Text  onPress={() =>ModalToggle()} style={styles.buttonText}>Apply Filters</Text>
  </Pressable>
  <Text style={styles.smallText}>Rest Filters</Text>
    </View>
    </View>
 
  )
}

const styles = StyleSheet.create({
  bottomButtonContainer:{
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: -3},
    shadowRadius: 3,
    shadowColor: '#171717',
    elevation: 4,
    height: 150,
    backgroundColor: 'white',
    bottom: 0, 
    position: 'absolute', 
    width: '100%', 
    display: 'flex',
    justifyContent: 'center'
  },
  main: {
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '100%'
  },
  container: {
    
    flex: 1,
    backgroundColor: '#fff',
   marginBottom: 50
   

  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'left',
    
    marginTop: 70,
    marginBottom: 20
  },
  headerText: {
    fontFamily: 'Medium',
    fontSize: 22,
   
    marginRight: 'auto'
  },
  selectContainer: {
    flexDirection: 'column',
    width: 350
  } ,
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    alignItems: 'center',
    marginTop: 5
  },
  categoryText: {
    fontFamily: 'Regular',
    fontSize: 16,
    // marginLeft: 10
  }, 
  bottomContainer: {
    marginBottom: 100,
    marginTop: 20
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: '#2436E7',
    width: 325,
    marginLeft: 'auto',
    marginRight: 'auto'

  }, 

  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    fontFamily: 'Regular'
  },
  largeText: {
    fontFamily: 'Medium',
    fontSize: 18,
  },
  hashtagContainer: {
    marginTop: 50,
    marginBottom: 50
  },
  hashtagText: {
    fontFamily: 'Regular',
    fontSize: 17
  },
  smallText: {
    fontFamily: 'Regular',
    fontSize: 15,
    color: '#2436E7',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10
  }
  
});

export default IndustrySelect