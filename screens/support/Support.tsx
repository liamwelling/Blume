import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Linking,
  Alert,
  ScrollView,
  Button,
} from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import SvgXml from "../../assets/SVG/MainLogo";
import { useNavigation, NavigationProp } from "@react-navigation/native";

const Support = () => {
  const navigation = useNavigation<any>();
  const [fontsLoaded] = useFonts({
    Regular: require("../../assets/fonts/Graphik-Regular-Web.ttf"),
    Bold: require("../../assets/fonts/Graphik-Bold-Web.ttf"),
    Medium: require("../../assets/fonts/Graphik-Medium-Web.ttf"),
    Semibold: require("../../assets/fonts/Graphik-Semibold-Web.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          "#47C1F1",
          "#FFFFFF",
          "#FFFFFF",
          "#FFFFFF",
          "#FFFFFF",
          "#FFFFFF",
        ]}
        style={styles.background}
      />
      <SvgXml height={300} width={600} style={{ marginTop: 0 }} />
      <Text
        style={{
          fontFamily: "Medium",
          fontSize: 70,
          marginTop: -120,
          letterSpacing: -6,
        }}
      >
        BLUME
      </Text>

      <Text
        style={{
          color: "#2436E7",
          fontFamily: "Medium",
          fontSize: 25,
          marginTop: 10,
        }}
      >
        Support
      </Text>

      <View style={{ width: 325, marginTop: 50 }}>
        <Pressable
          onPress={() => Linking.openURL("mailto:chris@blume-invest.com")}
        >
          <Text style={styles.smallText}>E-Mail Support</Text>
        </Pressable>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: "#CCCCCC",
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 30,
              marginTop: 0,
            }}
          />
        </View>
        <Pressable
          onPress={() => {
            navigation.navigate("PrivacyPolicy");
          }}
        >
          <Text style={styles.smallText}>Privacy Policy</Text>
        </Pressable>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: "#CCCCCC",
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 30,
              marginTop: 0,
            }}
          />
        </View>

        <Pressable onPress={() => navigation.navigate("TOS")}>
          <Text style={styles.smallText}>Terms of Service</Text>
        </Pressable>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: "#CCCCCC",
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 30,
              marginTop: 0,
            }}
          />
        </View>
        <Pressable onPress={() => navigation.navigate("DataMinimization")}>
          <Text style={styles.smallText}>Data Minimization</Text>
        </Pressable>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: "#CCCCCC",
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 30,
              marginTop: 0,
            }}
          />
        </View>
        <Pressable onPress={() => navigation.navigate("Subscriptions")}>
          <Text style={styles.smallText}>Subscriptions</Text>
        </Pressable>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: "#CCCCCC",
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 30,
              marginTop: 0,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Support;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    height: "100%",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  smallText: {
    fontSize: 18,
    fontFamily: "Regular",
    paddingLeft: 20,
    lineHeight: 20,
    paddingBottom: 10,
  },
});
