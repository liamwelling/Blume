import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { VictoryPie } from "victory-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import IndustryBreakdown from "./IndustryBreakdown";
import useInvestorStore from "../../stateManagement/InvestorContext";
import { LinearGradient } from "expo-linear-gradient";
import { EvilIcons } from "@expo/vector-icons";
import {
  VictoryLine,
  VictoryLabel,
} from "victory-native";
import { EXPO_PUBLIC_SERVER_URL } from "@env";
import SplashScreenBlume1 from "../SplashScreenBlume1";

import {
  wrapScrollView,
} from "react-native-scroll-into-view";

const CustomScrollView = wrapScrollView(ScrollView);

type InvestorModalToggleProp = {
  investorModalToggle: () => void;
};

interface DonutDataItem {
  x: string;
  y: number;
  name: string;
}

interface ResponseDataItem {
  industry: string;
  institution_value: number;
  name: string;
}

interface HistoricalDataItem {
  x: string;
  y: number;
}

const InvestorPageTest = ({ investorModalToggle }: InvestorModalToggleProp) => {
  const store = useInvestorStore();
  // const EXPO_PUBLIC_SERVER_URL = 'http://localhost:8080'
  const [responseData, setResponseData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [totalAvailable, setTotalAvailable] = useState<number>(0);
  const [currentInvestor, setCurrentInvestor] = useState<any[]>([]);

  function capitalizeFirstLetter(string: string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  const getInvestorData = (investorID: number) => {
    setIsLoading(true);
    axios
      .get(EXPO_PUBLIC_SERVER_URL + `/investors/${store.investorID}`)
      .then((response) => {
        setCurrentInvestor(response.data);
      });
  };

  const [historicalData, setHistoricalData] = useState<any[]>([1, 1]);

  const getHistoricalInvestorData = async (investorID: number) => {
    axios
      .get(EXPO_PUBLIC_SERVER_URL + `/investorHistory/${store.investorID}`)
      .then((response) => {
        setHistoricalData(
          response.data.map((i: any) => ({ x: i.date, y: i.ROI }))
        );
      });
  };
  const getData = (investorID: number) => {
    axios
      .get(EXPO_PUBLIC_SERVER_URL + `/api/holdings/`, {
        method: "GET",
        headers: {
          investorID: investorID,
        },
      })
      .then((response) => {
        // console.log(response.data.holdings)
        setResponseData(response.data.holdings);
        setTotalBalance(response.data.balance.accounts[0].balances.current);
        setTotalAvailable(response.data.balance.accounts[0].balances.available);
        setIsLoading(false);
      });
  };


  const donutData: DonutDataItem[] = responseData.map((i: ResponseDataItem) => {
    let percentage =
      (Math.round(i.institution_value) / (totalBalance - totalAvailable)) * 100;
    let roundedPercentage = Math.round(percentage);

    // If rounded value is 0, original percentage is less than 1, and not exactly 0, set to minimum value
    if (roundedPercentage === 0 && percentage > 0 && percentage < 1) {
      roundedPercentage = 1;
    }

    return {
      x: i.industry,
      y: roundedPercentage,
      name: i.name,
    };
  });


  const chartData = Array.from(
    donutData.reduce(
      (m: Map<string, number>, { x, y }: { x: string; y: number }) =>
        m.set(x, (m.get(x) || 0) + y),
      new Map()
    ),
    ([x, y]) => ({ x, y })
  );

  const uniqHistory: HistoricalDataItem[] = historicalData.filter(
    (value: HistoricalDataItem, index, self) =>
      index ===
      self.findIndex(
        (t: HistoricalDataItem) => t.x === value.x && t.y === value.y
      )
  );

  const historicalChartData = Array.from(
    uniqHistory.reduce(
      (m: Map<string, number>, { x, y }: { x: string; y: number }) =>
        m.set(x, (m.get(x) || 0) + y),
      new Map()
    ),
    ([x, y]) => ({ x, y })
  );

  const chartWidth = Dimensions.get("window").width;

  useEffect(() => {
    getInvestorData(11);
    getHistoricalInvestorData(11);
    getData(store.investorID);
  }, []);

  const [loadedFonts] = useFonts({
    Regular: require("../../assets/fonts/Graphik-Regular-Web.ttf"),
    Bold: require("../../assets/fonts/Graphik-Bold-Web.ttf"),
    Medium: require("../../assets/fonts/Graphik-Medium-Web.ttf"),
    Semibold: require("../../assets/fonts/Graphik-Semibold-Web.ttf"),
  });

  if (isLoading) {
    return <SplashScreenBlume1 />;
  }
  return (
    <CustomScrollView showsVerticalScrollIndicator={false}>
   
      {currentInvestor?.map((investor: any, index) => {
        return (
          <View key={index} style={styles.container}>
            <LinearGradient
              // Background Linear Gradient
              colors={["#42C0F04D", "transparent"]}
              style={styles.background}
            />

            <View
              style={{
                zIndex: 1000,
                flexDirection: "row",
                marginBottom: -100,
                paddingTop: 60,
                width: "100%",
                paddingRight: 20,
                justifyContent: "flex-end",
              }}
            >
              <Pressable onPress={() => investorModalToggle()}>
                <EvilIcons name="close" size={34} color="#2436E7" />
              </Pressable>
            </View>
            <View style={styles.upperContainer}>
              <Image
                style={styles.userPhoto}
                source={{ uri: `${investor.image_url}` }}
              />
              <Text allowFontScaling={false} style={styles.nameText}>
                {capitalizeFirstLetter(investor.first_name)}{" "}
                {capitalizeFirstLetter(investor.last_name)}
              </Text>
       
              <Text allowFontScaling={false} style={styles.bioText}>
                {investor.bio}
              </Text>
            </View>
            <View style={[styles.dotContainer, { marginTop: 20 }]}>
              <View style={styles.blueDot}></View>
              <Text allowFontScaling={false} style={styles.smallText}>
                User's Investments
              </Text>
            </View>
            {/* <Text onPress={() => {console.log(historicalChartData)}}>test</Text> */}

            <View style={styles.dotContainer}>
              <View style={styles.greenDot}></View>
              <Text allowFontScaling={false} style={styles.smallText}>
                S&P 500
              </Text>
            </View>

            {!isLoading && (
              <>
                <VictoryLine
                  height={260}
                  width={chartWidth}
                  // labels={({ datum }) => datum.y}
                  labelComponent={<VictoryLabel renderInPortal dy={-20} />}
                  padding={0}
                  domainPadding={{ x: [0, 0], y: 5 }}
                  style={{
                    data: { stroke: "#8DC63FEB" },
                    parent: { border: "1px solid #ccc", boxShadow: 1 },
                  }}
                  data={historicalChartData}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                    marginBottom: 20,
                    zIndex: -1,
                  }}
                >
                  <View
                    style={{ flex: 1, height: 3, backgroundColor: "#CCCCCC" }}
                  />
                </View>
              </>
            )}

            <View style={styles.strategyContainer}>
              <Text allowFontScaling={false} style={styles.strategyBigText}>
                Strategy
              </Text>
              <Text allowFontScaling={false} style={styles.strategyLittleText}>
                {investor.strategy}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
              }}
            >
              <View
                style={{
                  flex: 1,
                  height: 0.75,
                  backgroundColor: "black",
                  marginLeft: 130,
                  marginRight: 130,
                }}
              />
            </View>

            {isLoading ? (
              <Text>LOADING</Text>
            ) : (
              <>
                {chartData.length > 0 && (
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 0,
                      position: "relative",
                    }}
                  >
                    <IndustryPieChartVI chartData={chartData} />
                    <View style={styles.innerContainer}>
                      <Text
                        allowFontScaling={false}
                        style={styles.riskLittleText}
                      >
                        Risk
                      </Text>
                      <Text allowFontScaling={false} style={styles.riskBigText}>
                        {investor.risk.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                )}

                {chartData && (
                  <>
                    <View style={{ marginTop: 70 }}>
                      <IndustryBreakdown donutData={donutData} />
                    </View>
                  </>
                )}
              </>
            )}
          </View>
        );
      })}
    </CustomScrollView>
  );
};

export default InvestorPageTest;

const IndustryPieChartVI = ({ chartData }: any) => {
  const [loadedFonts] = useFonts({
    Regular: require("../../assets/fonts/Graphik-Regular-Web.ttf"),
    Bold: require("../../assets/fonts/Graphik-Bold-Web.ttf"),
    Medium: require("../../assets/fonts/Graphik-Medium-Web.ttf"),
    Semibold: require("../../assets/fonts/Graphik-Semibold-Web.ttf"),
  });
  if (!loadedFonts) {
    return <AppLoading />;
  }
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 0,
        position: "relative",
      }}
    >
      <VictoryPie
        labels={() => null}
        data={chartData}
        style={{
          data: {
            fill: ({ datum }) =>
              datum.x == "Consumer Staples"
                ? "#00994c"
                : datum.x == "ETF"
                ? "#2e3192"
                : datum.x == "Technology"
                ? "#7184f4"
                : datum.x == "Financials"
                ? "#7cf473"
                : datum.x == "Energy"
                ? "#9e7eff"
                : datum.x == "crypto"
                ? "#b3aecc"
                : datum.x == "Healthcare"
                ? "#a7d6a3"
                : datum.x == "Consumer Discresionary"
                ? "#da1c5c"
                : datum.x == "Materials"
                ? "#ed8700"
                : datum.x == "Utilities"
                ? "#f9ed32"
                : datum.x == "Real Estate"
                ? "#ef84ad"
                : datum.x == "REIT"
                ? "#bce0ed"
                : datum.x == "Communication Services"
                ? "#27aae1"
                : datum.x == "Industrials"
                ? "#6a8482"
                : "grey",
          },
        }}
        innerRadius={125}
        width={400}
      />

      {/* <View style={styles.innerContainer}>
    <Text style={styles.riskLittleText}>Risk</Text>
    <Text style={styles.riskBigText}>A</Text>
  </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    position: "absolute",
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    width: 230,
    height: 230,
    borderColor: "#E3E3E3",
    borderRadius: 230,
    borderWidth: 1.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  riskLittleText: {
    fontFamily: "Medium",
    fontSize: 18,
  },
  riskBigText: {
    fontFamily: "Semibold",
    fontSize: 100,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  userPhoto: {
    marginTop: 100,
    width: 150,
    height: 150,
    // backgroundColor: '#2436E7',
    borderRadius: 100,
    marginBottom: 20,
  },
  upperContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 350,
  },
  nameText: {
    fontFamily: "Medium",
    fontSize: 28,
    color: "#2436E7",
    marginBottom: 20,
  },
  bioText: {
    fontFamily: "Regular",
    fontSize: 14,
    lineHeight: 25,
  },
  smallText: {
    color: "black",
    fontSize: 14,
  },
  greenDot: {
    height: 15,
    width: 15,
    backgroundColor: "#8DC63F",
    borderRadius: 50,
    marginRight: 7,
  },
  blueDot: {
    height: 15,
    width: 15,
    backgroundColor: "#2436E7",
    borderRadius: 50,
    marginRight: 7,
  },
  dotContainer: {
    display: "flex",
    flexDirection: "row",
    marginRight: "auto",
    marginLeft: 20,
  },
  strategyContainer: {
    display: "flex",
    // alignItems: 'center',
    justifyContent: "center",
    width: 350,
    marginTop: 40,
    // marginBottom: 100
  },
  strategyBigText: {
    textAlign: "left",
    fontFamily: "Medium",
    fontSize: 22,
  },
  strategyLittleText: {
    fontFamily: "Regular",
    fontSize: 14,
    marginTop: 30,
    lineHeight: 25,
  },
});
