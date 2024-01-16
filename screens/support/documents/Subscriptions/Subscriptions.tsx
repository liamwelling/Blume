import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
const text = `
Subscription Description: Blume Invest Inc.
With our subscription service, you gain exclusive access to the investment portfolios of seasoned individuals, allowing you to stay informed and make data-driven decisions in the dynamic world of finance.
Key Features:
Comprehensive Portfolio Insights:
	•	Dive into detailed portfolio breakdowns, categorized by asset class and individual stock holdings.
	•	Visualize the allocation of assets, empowering you with a clear understanding of the investment strategy employed.
Strategic Overview:
	•	Uncover the thought process behind each portfolio.
	•	Gain insights into the investment strategy, risk tolerance, and long-term goals.
Biographical Profiles:
	•	Get to know the individuals behind the portfolios.
	•	Access detailed biographies and professional backgrounds
Real-Time Notifications:
	•	Enable alerts to receive instant updates on any alterations to the subscribed portfolios, ensuring you are always in the loop and ready to act.

How It Works:
Browse and Choose:
	•	Explore a selection of experienced investors.
	•	Review their portfolios, strategies, and biographies to find the right match for your interests.
Subscribe and Connect:
	•	Subscribe to your chosen individual's portfolio to unlock exclusive insights.
	•	Establish a direct connection with their investment journey.
Stay Informed:
	•	Receive real-time notifications for any changes in the subscribed portfolios.
Note: Investment involves risks, and past performance is not indicative of future results. Always conduct thorough research and, if needed, consult with a financial advisor before making investment decisions.

`
const Subscriptions = () => {
  return (
    <ScrollView >
    <Text style={{marginTop: 100, fontSize: 30, marginLeft: 'auto', marginRight: 'auto', marginBottom: 20, fontWeight: 'bold'}}>
      Subscriptions
      </Text>
    <View style={{marginBottom: 50}}>
    <Text style={styles.textContainer}>{text}</Text>

    </View>
    <View style={{height: 50}}></View>
  </ScrollView>
  )
}

export default Subscriptions

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'center'
  },
  textContainer: {
    paddingHorizontal: 20,
    
  }
})