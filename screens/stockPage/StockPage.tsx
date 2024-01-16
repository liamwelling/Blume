import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import MainChartStock from "./charts/MainChartStock";
import NewsCard from "../../components/NewsCard1";
import moment from "moment";
import useStockStore from "../../stateManagement/StockContext";
import AddButton from "../../assets/SVG/AddButton";
import useUserStore from "../../stateManagement/UserContext";
import { LinearGradient } from "expo-linear-gradient";
import { EXPO_PUBLIC_SERVER_URL } from "@env";
import { EvilIcons } from "@expo/vector-icons";
import SplashScreenBlume from "../SplashScreenBlume";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import AppLoading from "expo-app-loading";
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
} from "react-native-paper";
import SplashScreenBlume1 from "../SplashScreenBlume1";

const StockPage = ({ ModalToggle }: any) => {
  const [stockInfo, setStockInfo] = useState([]);
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const userStore = useUserStore();
  const store = useStockStore();
  const selectedTicker = store.stockTicker;
  const selectedType = store.stockType;

  const removeHTML = (str: any) => {
    if (str === null || str === "") return false;
    else str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, "");
  };
  const [readMore, setReadMore] = useState(false);
  const toggleReadMore = () => setReadMore((value) => !value);

  //  const [selectedTicker, setSelectedTicker] = useState('')
  const todaysDate = moment().format("MMM Do YYYY, h:mm a");
  const monthRange = moment().subtract(30, "days").format("YYYY-MM-DD");
  const addStock = (ticker: any) => {
    axios
      .post(`${EXPO_PUBLIC_SERVER_URL}/mystocks/${userStore.userID}/${ticker}`)
      .then((res) => {
        console.log(res.data.map((u: any) => u.stockticker));
        // console.log('i fire once');
        userStore.setMyStocks(res.data.map((u: any) => u.stockticker));
        setStockInfo(res.data.map((u: any) => u.stockticker));
        showDialog();
        // ModalToggle();
      });
  };

  // stock history

  // stock info
  const [loading, setLoading] = useState(false);
  const [overviewInfo, setOverviewInfo] = useState([]);
  const [stockName, setStockName] = useState([]);
  const [stockIcon, setStockIcon] = useState([]);
  const [stockPrice, setStockPrice] = useState([]);
  const [todaysChange, setTodaysChange] = useState([]);
  const [todaysChangePerc, setTodaysChangePerc] = useState([]);
  const [news, setNews] = useState([]);
  // needs name, logo, bio
  const getInfo = async (ticker: string, type: string) => {
    setLoading(true);

    axios
      .get(EXPO_PUBLIC_SERVER_URL + `/stock/stock_overview/`, {
        method: "GET",
        headers: {
          ticker: ticker,
          tickertype: type,
        },
      })
      .then((response) => {
        // console.log(response.data.news.map((i: any) => i.story))
        console.log(response.data.news.map((i: any) => new Date(i.date)));
        setNews(response.data.news);
        setOverviewInfo(response.data);
        setStockName(response.data.overview.asset.name);
        setStockAbout(
          response.data?.overview?.generalInformation?.description ??
            "No description available"
        ); // default to "No description available" if description is not present
        setStockIcon(response.data.overview.generalInformation.logo);
        setStockPrice(response.data.snapshot[0].price);
        setTodaysChange(response.data.snapshot[0].change);
        setTodaysChangePerc(response.data.snapshot[0].changePercent);
        setLoading(false);
      });
  };
  // useEffect(() => {
  //   // console.log(selectedTicker, selectedType)
  //   getInfo(selectedTicker, selectedType);
  // }, []);

  const [stockAbout, setStockAbout] = useState<string>("");

  // news, with polygon

  const datee = moment().subtract(1, "d").format("YYYY-MM-DD");
  const [loadedFonts] = useFonts({
    Regular: require("../../assets/fonts/Graphik-Regular-Web.ttf"),
    Bold: require("../../assets/fonts/Graphik-Bold-Web.ttf"),
    Medium: require("../../assets/fonts/Graphik-Medium-Web.ttf"),
  });
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    getInfo(selectedTicker, selectedType);
  }, []);

  if (loading) {
    return <SplashScreenBlume1 />;
  }
  return (
    <Provider>
      <ScrollView>
        <View style={{ backgroundColor: "white" }}>
          <Portal>
            <Dialog
              style={{
                backgroundColor: "#2436E7",
                height: 300,
                borderRadius: 50,
              }}
              visible={visible}
              onDismiss={hideDialog}
            >
              <Dialog.Content
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Text
                  onPress={hideDialog}
                  style={{
                    color: "white",
                    marginLeft: "auto",
                    marginRight: 20,
                    fontFamily: "Medium",
                    fontSize: 28,
                  }}
                >
                  X
                </Text>
              </Dialog.Content>
              <Dialog.Content
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Medium",
                    fontSize: 28,
                    textAlign: "center",
                    lineHeight: 35,
                  }}
                >
                  {stockName} Successfully added to MyStocks.{" "}
                </Text>
                {/* <Text onPress={() => console.log('pressed')} style={{color: 'white', fontFamily: 'Regular', fontSize: 14, textDecorationLine: 'underline', marginTop: 30}}>Yes please remove</Text> */}
              </Dialog.Content>
            </Dialog>
          </Portal>
          {/* <View style={{height: 100, width: 300,marginLeft: 100, marginTop: 100}}>
        <Text>{selectedTicker}</Text>
        <Text onPress={() => ModalToggle()}>close</Text>
      </View> */}
          {loading ? (
            <View
              style={{ width: 300, height: 300, backgroundColor: "white" }}
            />
          ) : (
            <View style={styles.container}>
              <LinearGradient
                // Background Linear Gradient
                colors={["#42C0F04D", "transparent"]}
                style={styles.background}
              />
              <View style={styles.upperContainer}>
                {/* <View style={{marginRight: 'auto', marginBottom: -150, marginTop: 100, marginLeft: 20}}> */}
                {/* <Pressable onPress={() => ModalToggle()}><Text style={{fontSize: 30}}>X</Text></Pressable> */}
                {/* <AddButton onPress={() => ModalToggle()} 
    height={75} width={75} 
    style={{marginRight: 'auto', marginBottom: -150, marginTop: 100, marginLeft: 20}} 
    /> */}
<View style={{ display: "flex", flexDirection: "row", width: '100%', marginBottom: -100, marginTop: 80, alignItems: 'center' }}>
<Pressable onPress={() => ModalToggle()}>
                  <EvilIcons
                    name="close"
                    size={46}
                    color="#2436E7"
                    style={{
                      marginRight: "auto",
                  
                      marginLeft: 20,
                    }}
                  />
                </Pressable>
                {/* </View> */}

                <AddButton
                  onPress={() => addStock(selectedTicker)}
                  height={75}
                  width={75}
                  style={{
                    marginLeft: "auto",
               
                  }}
                />
</View>
               

                <View style={{ display: "flex", flexDirection: "row" }}>
                  {/* {(`${stockIcon}`.length > 30)
        ?
          <Image style={styles.userPhoto}  source={{
            uri: `${stockIcon}` + `${apiKey}`,
          }}/>
          :
          <View style={styles.userPhoto}/>
        }         */}
                  {`${stockIcon}`.length > 30 ? (
                    <Image
                      style={styles.userPhoto}
                      source={{
                        uri: `${stockIcon}`,
                      }}
                    />
                  ) : (
                    <View style={{height: 150}} />
                 
                  )}
                </View>

                {/* <Text onPress={() => console.log(news)}> test button</Text>
 <Text>sdf</Text> */}
                {/* { !loading && news[]0.map((i: any) => {
       return ( 
        <Text>name:{i.i}</Text>
       )})}   */}
                <Text style={styles.nameText}>{stockName}</Text>
                {/* <Text style={styles.changeText}>{stockPrice}</Text> */}
                <Text
                  style={[
                    styles.changeText,
                    Number(todaysChange) > 0
                      ? { color: "green" }
                      : { color: "red" },
                  ]}
                >
                  {Number(todaysChange) > 0 ? "+ " : ""}
                  {Number(todaysChange).toFixed(2)} (
                  {Number(todaysChangePerc).toFixed(2)})%
                </Text>

                <Text style={styles.dateText}>{todaysDate}</Text>
                <Text style={styles.bioText}>
                  {/* {JSON.stringify(stockAbout)} */}
                  {readMore ? (
                    <Text onPress={() => toggleReadMore()}>{stockAbout}</Text>
                  ) : (
                    <Text onPress={() => toggleReadMore()}>
                      {stockAbout.length > 200
                        ? `${stockAbout.substring(0, 200)}...`
                        : stockAbout}
                    </Text>
                  )}
                  {/* { stockAbout.length > 200  
        ?
         `${stockAbout.substring(0, 200)}...`      
         :
          stockAbout
        } */}
                </Text>
              </View>

              <MainChartStock />

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: -2,
                  marginBottom: 20,
                  zIndex: -1,
                }}
              >
                <View
                  style={{ flex: 1, height: 3, backgroundColor: "#CCCCCC" }}
                />
              </View>
              <View style={{ marginTop: 30 }}>
                {/* <Text onPress={() => console.log(news)}> test button</Text> */}
                {news &&
                  news.map((article: any, index) => {
                    return (
                      <NewsCard
                        key={index}
                        // image={article.image_url}
                        title={removeHTML(article.headline)}
                        image={article.image_url}
                        date={article.date}
                        source={article.source}
                        description={article.story}
                      />
                    );
                  })}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </Provider>
  );
};
const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  dateText: {
    fontFamily: "Regular",
    fontSize: 14,
    marginBottom: 15,
  },
  changeText: {
    fontFamily: "Medium",
    fontSize: 18,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    height: "100%",

  },
  userPhoto: {
    marginTop: 100,
    width: 150,
    height: 150,
    // backgroundColor: 'grey',
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
export default StockPage;
