import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Image,
  Pressable,
  Modal,
  ScrollView
} from "react-native";
import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import axios from "axios";
import { Swipeable } from "react-native-gesture-handler";
import useUserStore from "../stateManagement/UserContext";
import useInvestorStore from "../stateManagement/InvestorContext";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
} from "react-native-paper";
import InvestorPageTest from "./investorPage/InvestorPageTest";
import { EXPO_PUBLIC_SERVER_URL } from "@env";

interface Investor {
  length: number;
  id: number;
  name: string;
}

const MyInvestors = () => {
  const navigation: any = useNavigation();

  function capitalizeFirstLetter(string: string) {
    return string[0].toUpperCase() + string.slice(1);
  }
  ///context
  const userStore = useUserStore();
  const subbedInvestors = userStore.MyInvestors;
  const investorStore = useInvestorStore();
  // get investors

  const [investors, setInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const getMyInvestors = async () => {
    console.log("My investors: ", userStore.MyInvestors);
    axios
      .get(EXPO_PUBLIC_SERVER_URL + `/investors/myinvestors/`, {
        method: "GET",
        headers: {
          tickers: subbedInvestors.toString(),
        },
      })
      .then((response: any) => {
        if (response == "No Subscribed Investors") {
          console.log("response: ", response);
        } else {
          setInvestors(response.data.map((i: any) => i));
          console.log(
            "My investors: ",
            response.data,
            response.data.map((i: any) => i)[0].length
          );
        }
      });
    setLoading(false);
  };
  useEffect(() => {
    getMyInvestors();
  }, [userStore.MyInvestors]);

  ///data filtering
  // const myArrayFiltered = FakeInvestorData.filter((el) => {
  //   return subbedInvestors.some((f) => {
  //      return f === el.id ;
  //   });
  // });
  const [listData, setListData] = useState([]);
  /// delete
  const deleteInvestor = (investorID: any) => {
    // console.log(investorID);
    userStore.deleteMyInvestors(investorID);

    hideDialog();
    axios
      .delete(
        `${EXPO_PUBLIC_SERVER_URL}/myinvestors/${userStore.userID}/${investorID}`
      )
      .then((res) => {
        // console.log(res.data);
      });
  };

  /// modals
  const [modalVisible, setModalVisible] = useState(false);
  const ModalToggle = () => {
    setModalVisible(!modalVisible);
  };
  const [investorModalVisible, setInvestorModalVisible] = useState(false);
  const investorModalToggle = () => {
    setInvestorModalVisible(!investorModalVisible);
  };

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  /// Row

  ///Swipe
  const rightSwipeActions = (name: string, ID: number) => {
    return (
      <View
        style={{
          backgroundColor: "#D50F0F",
          justifyContent: "center",
          alignItems: "flex-end",
          borderBottomLeftRadius: 10,
          borderTopLeftRadius: 10,
          height: 130,
          marginTop: "auto",
          marginBottom: "auto",
          width: 70,
        }}
      >
        <Text
          style={{
            color: "white",
            paddingHorizontal: 10,
            fontWeight: "600",

            paddingVertical: 20,
          }}
          onPress={() => {
            investorStore.setInvestorName(`${name}`);
            investorStore.setInvestorID(ID);
            showDialog();
          }}
        >
          Delete
        </Text>
      </View>
    );
  };

  const closeRow = (rowMap: any, rowKey: any) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap: any, rowKey: any) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item: any) => item.name === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const [loadedFonts] = useFonts({
    Regular: require("../assets/fonts/Graphik-Regular-Web.ttf"),
    Bold: require("../assets/fonts/Graphik-Bold-Web.ttf"),
    Medium: require("../assets/fonts/Graphik-Medium-Web.ttf"),
  });
  if (!loadedFonts) {
    return <AppLoading />;
  }
  return (
    <Provider>
      <ScrollView style={styles.container}>
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
                Are you sure you want to remove {investorStore.investorName}?
              </Text>
              <Text
                onPress={() => deleteInvestor(investorStore.investorID)}
                style={{
                  color: "white",
                  fontFamily: "Regular",
                  fontSize: 14,
                  textDecorationLine: "underline",
                  marginTop: 30,
                }}
              >
                Yes please remove
              </Text>
            </Dialog.Content>
          </Dialog>
        </Portal>

        <Modal
          animationType="slide"
          transparent={true}
          statusBarTranslucent={true}
          visible={modalVisible}
        >
          {/* <VerifiedInvestor 
          // ModalToggle={ModalToggle} 
          // selectedTicker={selectedTicker}
          /> */}
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          statusBarTranslucent={true}
          visible={investorModalVisible}
        >
          <InvestorPageTest investorModalToggle={investorModalToggle} />
        </Modal>

        <View style={styles.headerContainer}>
          <Text
            style={styles.headerText}
        
          >
            My Investors
          </Text>
        </View>
        <View style={styles.cardContainer}></View>
        <View style={styles.container}>
          {loading ? null : (
            <>
              { subbedInvestors.length > 0 ? (
                investors.map((investor: any, index) => (
                  <Pressable 
                  key={index}
                    onPress={() => {
                      // console.log(investor[0].idverified_investors);
                      investorStore.setInvestorID(
                        investor[0].idverified_investors
                      );
                      investorModalToggle();
                    }}
                  >
                    {/* <Swipeable
                      renderRightActions={() =>
                        rightSwipeActions(investor.name, investor.id)
                      }
                    > */}
                      <View
                        style={{
                          paddingHorizontal: 20,
                          marginVertical: 10,
                          height: 130,
                          backgroundColor: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {/* {investors.length >= 1?  */}
                        <InvestorRow
                          key={index}
                          investor={investor[0]}
                          // name={investor.name}
                        />
                        {/* :
                null

                } */}
                      </View>
                    {/* </Swipeable> */}
                  </Pressable>
                ))
              ) : (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    marginHorizontal: 20,
                  }}
                >
                  <Text
                    // onPress={() => console.log(subbedInvestors)}
                    style={{
                      fontFamily: "Regular",
                      fontSize: 15,
                      marginBottom: 10,
                    }}
                  >
                    You haven't subscribed to any investors yet.
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Regular",
                      marginBottom: 10,
                      fontSize: 15,
                    }}
                  >
                    Looking to connect with potential investors?
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("BrowseInvestors")}
                  >
                    <Text
                      style={{
                        fontFamily: "Regular",
                        color: "#007BFF",
                        fontSize: 20,
                      }}
                    >
                      {" "}
                      {/* Choose your link color */}
                      Browse Investors
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </Provider>
  );
};
const InvestorRow = ({ investor }: any) => {
  function capitalizeFirstLetter(string: string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  return (
    <View  style={styles.investorCardContainer}>
      <View>
      <Image style={styles.investorPhoto} source={{ uri: `${investor.image_url}`}} />
        
      </View>
      
      <View style={styles.investorTextContainer}>
       <Text  style={styles.investorName}>
       
          {capitalizeFirstLetter(investor.first_name)} {capitalizeFirstLetter(investor.last_name)}
        </Text>
       <Text style={styles.investorStats}>ROI: {Number(investor.ROI).toFixed(2)}% Risk {investor.risk != null && capitalizeFirstLetter(investor.risk)}</Text>
       <View>
       <Text numberOfLines={3} ellipsizeMode='tail' style={styles.investorBio}>{investor.bio?.length > 25 ?
    `${investor.bio.substring(0, 110)}...` : investor.bio}
    </Text>
       </View>
       
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',

  // },
  headerContainer: {
    marginTop: 100,
    marginLeft: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  headerText: {
    fontFamily: "Medium",
    fontSize: 22,
  },
  addLogo: {
    marginRight: 30,
  },
  cardContainer: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  container: {
    backgroundColor: "white",
    flex: 1,
    showsVerticalScrollIndicator: false,
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "white",

    justifyContent: "center",
    height: 100,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
    height: 100,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  backRightBtnLeft: {
    backgroundColor: "blue",
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
    height: 80,
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
    fontSize: 16,
    marginTop: 20
  },
  investorStats: {
    fontFamily: 'Medium',
    fontSize: 14,
    marginTop: 10
  },
  investorBio: {
    fontFamily: 'Regular',
    fontSize: 14,
    marginTop: 10,
    flexShrink: 1

  },
  investorTextContainer: {
    height: 150,
    width: 250,
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 10
  },
  investorCardContainer: {
    width: 360,
    height: 130,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 10,
    marginBottom: 20
  },
  investorStatsContainer: {
    display: "flex",
    flexDirection: "row",
  },
});

export default MyInvestors;
