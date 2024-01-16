import { View, Text, StyleSheet, Pressable, Image, ScrollView} from 'react-native'
import React, { useRef, useState } from 'react'
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { VictoryPie } from 'victory-native';
import chroma from 'chroma-js'




const IndustryBreakdown = ({currentInvestor}: any) => {


  const viewRef = useRef();
  
  interface industryTypes {
    showmore: number | null;
  }
  const [showMore, setShowMore] = useState<number | null>(null);
  const [currentIndustry, setCurrentIndustry ] = useState('')
  const [chartColor, setChartColor] = useState('red')
 
  //Data for breakdown
  const donutData = currentInvestor.map((investor: any) => investor.stocks.map((stock: any) => (
    { property: stock.industry, value: stock.percentage, company: stock.company }
    )));

  const industryData = Array.from(donutData[0].reduce(
    (m: any, {property, value}: any) => m.set(property, (m.get(property) || 0) + value), new Map
  ), ([property, value]) => ({property, value}));


  //Data for charts
  const donutData1 = currentInvestor.map((investor: any) => investor.stocks.map((stock: any) => (
    { property: stock.industry, y: stock.percentage, x: stock.company }
    )));

  const donutData2 = currentInvestor.map((investor:any) => investor.stocks.map((stock: any) => (
    { x: stock.industry, y: stock.percentage }
    )));
  const filteredData = donutData1[0].filter(((stock: any) => stock.property === `${currentIndustry}`))
  const chartData = Array.from(filteredData.reduce(
    (m: any, {x, y}: any) => m.set(x, (m.get(x) || 0) + y), new Map
  ), ([x, y]) => ({x, y}));


  const investorStocks = currentInvestor.map((investor: any) => investor.stocks.map((stock: any) => stock));  
  const sortedIndustryData = industryData.sort((a, b) => a.value - b.value).reverse();




const [loadedFonts] = useFonts({
  Regular: require("../../assets/fonts/Graphik-Regular-Web.ttf"),
  Bold: require("../../assets/fonts/Graphik-Bold-Web.ttf"),
  Medium: require('../../assets/fonts/Graphik-Medium-Web.ttf')
});


if (!loadedFonts) {
  return <AppLoading />;
}

  return (
  
 
    <View style={{ display: 'flex',justifyContent:'center', alignItems:'center', marginBottom: 200}}>

        {sortedIndustryData.map((stock, index) => {
      const industry = `${stock.property}`;
      const colorName = industry.replace(/\s/g, '')
      var elementColor = 'grey';
      if (colorName == 'ConsumerStaples') {
        elementColor = '#00994c'
      } if (colorName == 'ETF') {
        elementColor ='#2e3192'
      } if (colorName == 'InformationTechnology') {
        elementColor = '#7184f4'
      } if (colorName == 'Financials') {
        elementColor = '#7cf473'
      } if (colorName == 'Energy') {
        elementColor = '#9e7eff'
      } if (colorName == 'Crypto') {
        elementColor = '#b3aecc'
      } if (colorName == 'Healthcare') {
        elementColor = '#a7d6a3'
      } if (colorName == 'ConsumerDiscresionary') {
        elementColor = '#da1c5c'
      } if (colorName == 'Materials') {
        elementColor = '#ed8700'
      } if (colorName == 'Utilities') {
        elementColor = '#f9ed32'
      } if (colorName == 'RealEstate') {
        elementColor = '#ef84ad'
      } if (colorName == 'REIT') {
        elementColor = '#bce0ed'
      } if (colorName == 'CommunicationServices') {
        elementColor = '#27aae1'
      } if (colorName == 'Industrials') {
        elementColor = '#6a8482'
      } 
      let industryLength = investorStocks[0].filter(((stocks:any )=> stocks.industry === `${industry}`)).sort((a:any, b:any) => a.percentage - b.percentage).length
      const colorScale = chroma.scale([elementColor,'black'])
      .mode('lch').colors(industryLength + 4)
      // const donutData1 = currentInvestor.map((investor:any) => investor.stocks.map((stock: any) => (
      //   { x: stock.industry, y: stock.percentage }
      //   )));
      // const filteredData = donutData1[0].filter(((stock: any) => stock.x === `${currentIndustry}`))
      // const chartData = Array.from(filteredData.reduce(
      //   (m: any, {x, y}: any) => m.set(x, (m.get(x) || 0) + y), new Map
      // ), ([x, y]) => ({x, y}));
      
      return (
        
        <Pressable onPress={() => {setCurrentIndustry(industry); 
          setShowMore(showMore => showMore === index ? null : index); 
          setChartColor(elementColor)}}
          >
<View>
        <View key={index} style={styles.industryContainer} >
          <View style={[styles.colorCircle, {backgroundColor: elementColor}]}>

          </View>
          <View>
            <View style={styles.industryTextContainer}>
              <Text style={styles.industryText}>{stock.property}</Text>
              <Text style={styles.industryPercent}>{Math.round((stock.value + Number.EPSILON) * 100) / 100}%</Text>
            </View>
            
            <View style={styles.industryPercentageTrack}>
              <View style={[styles.industryPercentageBar, {backgroundColor: elementColor, width: `${stock.value}%`}]}></View>
            </View>
          </View>
        </View>
        {showMore == index && (
          <View  key={index} style={styles.industryMainSelected}>
            <View style={styles.industryContainerSelected}>
              <View style={styles.upperIndustryRow}>
                <View style={[styles.colorCircle, {backgroundColor: elementColor}]}/>
                <Text style={styles.industryText}>{stock.property}</Text>
                <Text style={[styles.industryPercent, {marginRight: 20}]}>{Math.round((stock.value + Number.EPSILON) * 100) / 100}%</Text>
              </View>

              <View style={styles.pieView}>
              <VictoryPie
      labels={() => null}
  data={filteredData}
  // colorScale={`${elementColor}`}
  colorScale={colorScale}
  style={{
    
    
  }}
  innerRadius={70}
  width={300}

/> 
              </View>

              <View>
              {investorStocks[0].filter(((stocks:any )=> stocks.industry === `${industry}`)).sort((a:any, b:any) => a.percentage - b.percentage).reverse().map((stock:any, index: number) => {
                return (
                  <View style={styles.lowerIndustryRow}>
                       {/* {(`${stock.icon}`.length > 10)
                        ?
                        <Image source={stock.icon} style={styles.colorCircle} /> 
                        :
                          <View style={[styles.colorCircle, {backgroundColor: elementColor}]} />
                        }  */}
                    <View style={{display: 'flex', flexDirection: 'column', marginLeft: 20}}>
                      <View style={{display: 'flex', flexDirection: 'row'}}>
                      <Text style={{fontFamily: 'Regular', fontSize: 14, marginBottom: 4, paddingRight: 20}}>{stock.company}</Text>
                          
                      </View>
                        
                        <Text style={{fontFamily: 'Regular', fontSize: 12}}>{stock.ticker}</Text>
                    </View> 
                    <Text style={styles.lowerIndustryRowPercent}>{Math.round((stock.percentage + Number.EPSILON) * 100) / 100}%</Text> 
                  </View>
                )})}
              </View>

            </View>
          </View>
         )}


</View>    
        </Pressable>
       
      )
      })}

    </View>

  )
}

const styles = StyleSheet.create({
  pieView: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: -50,
    marginBottom: -50
  },
  lowerIndustryRowPercent:{
    marginLeft: 'auto',
    marginRight: 20,
    fontFamily: 'Medium',
    fontSize: 14
  },
  lowerIndustryRow: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
    // alignItems: 'center'
  },
  upperIndustryRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    marginTop: 20
  },
  industryContainerSelected: {
    width: 350,
    // height: 120%;
    backgroundColor: 'white',
    borderRadius: 20,
    minHeight: 200,
   
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center'
    // alignItems: 'center'
  },

  industryMainSelected : {
    width: 380,
    
    backgroundColor: '#EEEEEE',
    
  
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 20
    // margin-bottom: 20px;
    // margin-right: auto;
    // margin-left: auto;
  },
  industryContainer: {
    width: 350,
    height: 80,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 12,
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 30,
    marginLeft: 20,
    marginRight: 20
    
  },
  industryTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10
  },
  industryText: {
    fontFamily: 'Medium',
    fontSize: 16
  },
  industryPercent:{
    fontFamily: 'Medium',
    fontSize: 14,
    marginLeft: 'auto',
    color: '#CCCCCC'
  },
  industryPercentageTrack : {
    width: 250,
    height: 10,
    backgroundColor: '#EAEAEA',
    opacity: 1,
    borderRadius: 10
    /* UI Properties */
    // background: #EAEAEA 0% 0% no-repeat padding-box,
    // box-shadow: 0px 1px 0px #FFFFFF0B,
    // border-radius: 18px,
    // opacity: 1,
  },
  industryPercentageBar: {
    height: 10,
    borderRadius: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    
  },
  investorPhoto: {
    width: 57,
    height: 57,
    borderRadius: 30,
    backgroundColor: 'blue',
    marginTop: 12,
    marginLeft: 12,
    marginRight: 12,
  },
  investorName: {
    fontFamily: 'Medium',
    fontSize: 18
  },
  investorStats: {
    fontFamily: 'Medium',
    fontSize: 14
  },
  investorBio: {
    fontFamily: 'Regular',
    fontSize: 14
  },
  investorTextContainer: {
  height: 150,
   width: 250,
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'space-evenly',

  },
  investorCardContainer: {
    width: 350,
    height: 150,
    display: 'flex',
    flexDirection: 'row',
    // alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 12,
    marginBottom: 20
  //   background: #FFFFFF 0% 0% no-repeat padding-box,
  // box-shadow: 0px 3px 6px #0000003B,
  }
  
});

export default IndustryBreakdown