import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const MyInvestorCard = () => {
  return (
    <View style={styles.investorCardContainer}>
      <Image style={styles.investorPhoto} source={{ uri: `${imageURL}`}} />
      <View style={styles.investorTextContainer}>
        <Text style={styles.investorName}>investor name</Text>
        <View style={styles.investorStatsContainer}>
          <Text style={[styles.investorStats, {marginRight: 10}]}>Roi</Text>
          <Text style={styles.investorStats}>RISK</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    
  },
  investorPhoto: {
    width: 57,
    height: 57,
    borderRadius: 30,
    // backgroundColor: 'blue',
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
  height: 80,
   width: 250,
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'space-evenly',

  },
  investorCardContainer: {
    width: 350,
    height: 80,
    display: 'flex',
    flexDirection: 'row',
    // alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 12,
    marginBottom: 20
  //   background: #FFFFFF 0% 0% no-repeat padding-box,
  // box-shadow: 0px 3px 6px #0000003B,
  }, 
  investorStatsContainer: {
    display: 'flex',
    flexDirection: 'row'
  }
  
});

export default MyInvestorCard