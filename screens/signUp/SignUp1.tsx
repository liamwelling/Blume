import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { TextInput } from "react-native-paper";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Switch,
  SafeAreaView,
  Dimensions,
  Modal,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Button,
  Platform,
} from "react-native";
import { useFonts } from "expo-font";
// import { Icon } from '@rneui/themed';
import AppLoading from "expo-app-loading";
import Svg, { Path } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
// const BlumeLogo = require('../../assets/SVG/BlumeLockup.svg');
import * as yup from "yup";
import { useForm, Controller, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DropDownPicker from "react-native-dropdown-picker";
import SwitchSelector from "react-native-switch-selector";
import axios from "axios";
import { EXPO_PUBLIC_SERVER_URL } from "@env";
import SvgComponent from "../../assets/SVG/MainLogo";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import YearArray from "../../assets/YearArray";
import {
  wrapScrollView,
  useScrollIntoView,
} from "react-native-scroll-into-view";
import { useNavigation } from "@react-navigation/native";
import useKeyboard from "../../components/UseKeyboard";
const screenHeight = Dimensions.get("window").height;

// const SwitchSelect = SwitchSelect as any;
// const CustomScrollView = wrapScrollView(ScrollView);

const SignUp1 = () => {
  const [page, setPage] = useState(true);
  const navigation: any = useNavigation();
  const isKeyboardOpen = useKeyboard();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const viewPositionRef = useRef<number>(0);
  const scrollViewRef = useRef<ScrollView | null>(null);

  const onLayout = (event: any) => {
    const { y } = event.nativeEvent.layout;
    viewPositionRef.current = y;
  };
  // const scrollIntoView = useScrollIntoView();
  // const viewRef = useRef<View>(null);
  const scrollRef = useRef<ScrollView | null>(null);
  const inputRef = useRef<any>(null);

  const handleFocus = () => {
    setTimeout(() => {
      inputRef.current?.measure(
        (fx: any, fy: any, width: any, height: number, px: any, py: number) => {
          scrollRef.current?.scrollTo({
            y: py - screenHeight / 2 + height / 2,
            animated: true,
          });
        }
      );
    }, 250); // Adjust delay as per your needs.
  };
  const [keyboardStatus, setKeyboardStatus] = useState(true);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(false);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(true);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const year = new Date().getFullYear();
  const years = Array.from(new Array(100), (val, index) => index - year);
  const options = [
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
  ];

  const [openHow, setOpenHow] = useState(false);
  const [openYear, setOpenYear] = useState(false);
  const [yearValue, setYearValue] = useState(null);
  const [yearItems, setYearItems] = useState(YearArray);
  const [howValue, setHowValue] = useState("how");
  const [howItems, setHowItems] = useState([
    { label: "Friend or Family", value: "friendFamily" },
    { label: "Social Media", value: "socialMedia" },
    { label: "Search Engine", value: "searchEngine" },
    { label: "App Store", value: "appStore" },
    { label: "Advertisement", value: "advertisement" },
    { label: "Website or Blog", value: "websiteBlog" },
    { label: "Event or Workshop", value: "eventWorkshop" },
    { label: "Other", value: "other" },
]);

  const [crypto, setCrypto] = useState(false);
  const [blueChip, setBlueChip] = useState(false);
  const [utilities, setUtilities] = useState(false);
  const [tech, setTech] = useState(false);
  const [biotech, setBiotech] = useState(false);
  const [realEstate, setRealEstate] = useState(false);

  const [save, setSave] = useState(false);
  const [income, setIncome] = useState(false);
  const [outpace, setOutpace] = useState(false);
  const [earn, setEarn] = useState(false);
  const toggleSwitchSave = () => setSave((previousState) => !previousState);
  const toggleSwitchIncome = () => setIncome((previousState) => !previousState);
  const toggleSwitchOutpace = () =>
    setOutpace((previousState) => !previousState);
  const toggleSwitchEarn = () => setEarn((previousState) => !previousState);

  type FormValues = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    birthyear: string;
    promoCode: string;
  };

  const schema1 = yup
    .object()
    .shape({
      username: yup.string().max(32).required("Required Field"),
      email: yup.string().email().required(),
      password: yup.string().max(32).required(),
      confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
      promoCode: yup.string(),
    })
    .required();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema1),
  });

  // const onSubmit = (data: FormValues)=> console.log(data);

  const onSubmit = (data: FormValues) => {
    console.log(data);
    registerUser(data);
  };

  const registerUser = (data: FormValues) => {
    axios
      .post(EXPO_PUBLIC_SERVER_URL + `/register/`, {
        email: data.email,
        password: data.password,
        crypto: crypto,
        username: data.username,
        promocode: data.promoCode,
        birthyear: yearValue,
        howdidyouhear: howValue,
        risk: "medium",
        save: save,
        income: income,
        outpace: outpace,
        earn: earn,
        bluechip: blueChip,
        utilities: utilities,
        tech: tech,
        biotech: biotech,
        realestate: realEstate,
      })
      .then((response) => {
        console.log(response);
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // animations
  const FadeSVG = useAnimatedStyle(() => {
    return {
      opacity: withTiming(keyboardStatus ? 1 : 0, { duration: 300 }),
    };
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(keyboardStatus ? 0 : -100, { duration: 250 }),
        },
      ],
    };
  });

  const animatedStyles2 = useAnimatedStyle(() => {
    return {
      marginTop: withTiming(keyboardStatus ? 0 : -300, { duration: 50 }),
      marginBottom: withTiming(keyboardStatus ? 0 : 300, { duration: 50 }),
      transform: [
        {
          translateY: withTiming(keyboardStatus ? 0 : -300, { duration: 150 }),
        },
      ],
    };
  });

  const [showPassword, setShowPassword] = useState(true);
  const [loadedFonts] = useFonts({
    Regular: require("../../assets/fonts/Graphik-Regular-Web.ttf"),
    Bold: require("../../assets/fonts/Graphik-Bold-Web.ttf"),
    Medium: require("../../assets/fonts/Graphik-Medium-Web.ttf"),
  });

  if (keyboardStatus) {
    const targetScrollY = viewPositionRef.current - screenHeight / 2;
    scrollViewRef.current?.scrollTo({ y: targetScrollY, animated: true });
  } else {
    // Adjust based on your needs, maybe scroll back to original position or something else.
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }

  return (
    <ScrollView>
      {page ? (
        <View style={styles.container}>
          <Animated.View style={[FadeSVG]}>
            <SvgComponent
              height={500}
              width={700}
              style={{ marginBottom: -230, marginTop: -145 }}
            />
          </Animated.View>

          {/* {isKeyboardOpen? <Text>keyboarrd</Text>: <Text>hidden</Text>} */}
          <Animated.View style={[animatedStyles]}>
            {/* <BlumeLogo height={400} width={400} style={{marginBottom: -120, marginTop: -50}}/> */}
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                fontFamily: "Regular",
                marginBottom: 15,
                marginTop: 20,
              }}
            >
              Create an account.
            </Text>

            <Text
              onPress={() => {
                navigation.navigate("Login");
              }}
              style={{
                textAlign: "center",
                fontSize: 14,
                fontFamily: "Regular",
                textDecorationLine: "underline",
                color: "#CCCCCC",
                marginBottom: 20,
              }}
            >
              Already have an account?
            </Text>
            <Text onPress={() => toggleSwitch()}>{keyboardStatus}</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Username"
                  // left={<TextInput.Icon name="email" />}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={{ margin: 0, backgroundColor: "white", width: 350 }}
                  activeUnderlineColor="#8DC63F"
                  underlineColor="#C5C5C5"
                />
              )}
              name="username"
              rules={{ required: true }}
            />

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Email"
                  // left={<TextInput.Icon name="email" />}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={{ margin: 0, backgroundColor: "white", width: 350 }}
                  activeUnderlineColor="#8DC63F"
                  underlineColor="#C5C5C5"
                />
              )}
              name="email"
            />

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Create Password"
                  // left={<TextInput.Icon name="email" />}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={showPassword}
                  right={
                    <TextInput.Icon
                      onPress={() => setShowPassword(!showPassword)}
                      name="eye"
                    />
                  }
                  style={{ margin: 0, backgroundColor: "white", width: 350 }}
                  activeUnderlineColor="#8DC63F"
                  underlineColor="#C5C5C5"
                />
              )}
              name="password"
            />

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Re-enter Password"
                  // left={<TextInput.Icon name="email" />}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={showPassword}
                  right={
                    <TextInput.Icon
                      onPress={() => setShowPassword(!showPassword)}
                      name="eye"
                    />
                  }
                  style={{
                    marginBottom: 40,
                    backgroundColor: "white",
                    width: 350,
                  }}
                  activeUnderlineColor="#8DC63F"
                  underlineColor="#C5C5C5"
                />
              )}
              name="confirmPassword"
            />

            <View style={{ marginBottom: 20 }}>
              <Pressable
                onPress={() => setPage(!page)}
                // style={styles.button}
                style={({ pressed }) => [
                  { backgroundColor: pressed ? "#1D2CB5" : "#2436E7" },
                  styles.button,
                ]}
              >
                <Text
                  // onPress={() => registerUser(data)}
                  onPress={() => setPage(!page)}
                  // onPress={handleSubmit(onSubmit)}
                  style={[styles.text]}
                >
                  Create Account
                </Text>
              </Pressable>
            </View>
            <Text
              onPress={() => {
                navigation.navigate("InvestorSignUp");
              }}
              style={{
                textAlign: "center",
                fontSize: 14,
                fontFamily: "Regular",
                textDecorationLine: "underline",
                color: "#2436E7",
                marginBottom: 200,
              }}
            >
              Are you an accredited investor? Apply here
            </Text>
          </Animated.View>
        </View>
      ) : (
        <Animated.View style={[animatedStyles2]}>
          <View style={styles.container}>
            <Pressable
              style={{ marginTop: 30, marginRight: "auto", marginLeft: 20 }}
              onPress={() => setPage(!page)}
            >
              <Ionicons name="chevron-back" size={30} color="black" />
            </Pressable>
            <View style={{ flex: 1, width: 325 }}>
              <Text
                style={{
                  fontSize: 24,
                  fontFamily: "Bold",
                  marginBottom: 10,
                  marginTop: 30,
                  lineHeight: 30,
                }}
              >
                Just a few more questions to optimize your{" "}
                <Text style={{ color: "#2436E7" }}>Blume</Text> experience.
              </Text>
              <Pressable>
                {/* <Text  
  onPress={() => setPage(!page)}
    // onPress={handleSubmit(onSubmit)}  
    >back</Text> */}
              </Pressable>

              <View style={styles.dropdownContainer}>
                <DropDownPicker
                  open={openYear}
                  value={yearValue}
                  items={yearItems}
                  setOpen={setOpenYear}
                  setValue={setYearValue}
                  setItems={setYearItems}
                  textStyle={{
                    fontFamily: "Medium",
                    marginLeft: 10,
                  }}
                  placeholder="The Year You Were Born"
                  style={{
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: "#C4C4C4",
                    height: 40,
                    marginBottom: 30,
                  }}
                  dropDownContainerStyle={{
                    borderRadius: 30,
                    elevation: 12,
                    overflow: "visible",
                    zIndex: 1000,
                    borderWidth: 1,
                    borderColor: "#C4C4C4",
                  }}
                />
              </View>

              <Text
                style={{
                  fontFamily: "Medium",
                  fontSize: 18,
                  color: "#2436E7",
                  textAlign: "left",
                  marginBottom: 20,
                }}
              >
                Risk Tolerance
              </Text>

              <View style={{ marginBottom: 20 }}>
                <SwitchSelector
      options={options}
      initial={0}
      borderColor={'#0000001F'}
      backgroundColor={'#0000001F'}
      borderWidth={1}
      buttonMargin={3}
      buttonColor={'white'}
      height={30}
      textStyle={{ fontFamily: 'Medium'}}
      selectedTextStyle={{ fontFamily: 'Medium'}}
      selectedColor={'#2436e7'}

   
    />  
              </View>

              <Text
                style={{
                  fontFamily: "Medium",
                  fontSize: 18,
                  color: "#2436E7",
                  textAlign: "left",
                }}
              >
                Investment Goals
              </Text>

              <View style={styles.goalsContainer}>
                <View>
                  <Text style={styles.goalsText}>Save for retirement</Text>
                </View>
                <Switch
                  style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
                  trackColor={{ false: "#C5C5C5", true: "#2436e7" }}
                  thumbColor={save ? "#f4f3f4" : "#f4f3f4"}
                  ios_backgroundColor="#C5C5C5"
                  onValueChange={toggleSwitchSave}
                  value={save}
                />
              </View>

              <View style={styles.goalsContainer}>
                <View>
                  <Text style={styles.goalsText}>
                    Income for next large expenditure
                  </Text>
                </View>
                <Switch
                  style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
                  trackColor={{ false: "#C5C5C5", true: "#2436e7" }}
                  thumbColor={income ? "#f4f3f4" : "#f4f3f4"}
                  ios_backgroundColor="#C5C5C5"
                  onValueChange={toggleSwitchIncome}
                  value={income}
                />
              </View>

              <View style={styles.goalsContainer}>
                <View>
                  <Text style={styles.goalsText}>Outpace Inflation</Text>
                </View>
                <Switch
                  style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
                  trackColor={{ false: "#C5C5C5", true: "#2436e7" }}
                  thumbColor={outpace ? "#f4f3f4" : "#f4f3f4"}
                  ios_backgroundColor="#C5C5C5"
                  onValueChange={toggleSwitchOutpace}
                  value={outpace}
                />
              </View>

              <View style={styles.goalsContainer}>
                <View>
                  <Text style={styles.goalsText}>
                    Earn higher returns on your money
                  </Text>
                </View>
                <Switch
                  style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
                  trackColor={{ false: "#C5C5C5", true: "#2436e7" }}
                  thumbColor={earn ? "#f4f3f4" : "#f4f3f4"}
                  ios_backgroundColor="#C5C5C5"
                  onValueChange={toggleSwitchEarn}
                  value={earn}
                />
              </View>

              <Text
                style={{
                  fontFamily: "Medium",
                  fontSize: 18,
                  color: "#2436E7",
                  textAlign: "left",
                  paddingBottom: 20,
                }}
              >
                Mainly Interested In
              </Text>

              <View style={styles.interestContainer}>
                {crypto ? (
                  <Pressable style={styles.interestButton2}>
                    <Text
                      onPress={() => setCrypto(false)}
                      style={styles.interestButtonText2}
                    >
                      Crypto
                    </Text>
                  </Pressable>
                ) : (
                  <Pressable style={styles.interestButton1}>
                    <Text
                      onPress={() => setCrypto(true)}
                      style={styles.interestButtonText1}
                    >
                      Crypto
                    </Text>
                  </Pressable>
                )}

                {blueChip ? (
                  <Pressable style={styles.interestButton2}>
                    <Text
                      onPress={() => setBlueChip(false)}
                      style={styles.interestButtonText2}
                    >
                      Blue Chip
                    </Text>
                  </Pressable>
                ) : (
                  <Pressable style={styles.interestButton1}>
                    <Text
                      onPress={() => setBlueChip(true)}
                      style={styles.interestButtonText1}
                    >
                      Blue Chip
                    </Text>
                  </Pressable>
                )}

                {utilities ? (
                  <Pressable style={styles.interestButton2}>
                    <Text
                      onPress={() => setUtilities(false)}
                      style={styles.interestButtonText2}
                    >
                      Utilities
                    </Text>
                  </Pressable>
                ) : (
                  <Pressable style={styles.interestButton1}>
                    <Text
                      onPress={() => setUtilities(true)}
                      style={styles.interestButtonText1}
                    >
                      Utilities
                    </Text>
                  </Pressable>
                )}
              </View>

              <View style={[styles.interestContainer, { marginBottom: 30 }]}>
                {tech ? (
                  <Pressable style={styles.interestButton2}>
                    <Text
                      onPress={() => setTech(false)}
                      style={styles.interestButtonText2}
                    >
                      Tech
                    </Text>
                  </Pressable>
                ) : (
                  <Pressable style={styles.interestButton1}>
                    <Text
                      onPress={() => setTech(true)}
                      style={styles.interestButtonText1}
                    >
                      Tech
                    </Text>
                  </Pressable>
                )}

                {biotech ? (
                  <Pressable style={styles.interestButton2}>
                    <Text
                      onPress={() => setBiotech(false)}
                      style={styles.interestButtonText2}
                    >
                      Biotech
                    </Text>
                  </Pressable>
                ) : (
                  <Pressable style={styles.interestButton1}>
                    <Text
                      onPress={() => setBiotech(true)}
                      style={styles.interestButtonText1}
                    >
                      Biotech
                    </Text>
                  </Pressable>
                )}

                {realEstate ? (
                  <Pressable style={styles.interestButton2}>
                    <Text
                      onPress={() => setRealEstate(false)}
                      style={styles.interestButtonText2}
                    >
                      Real Estate
                    </Text>
                  </Pressable>
                ) : (
                  <Pressable style={styles.interestButton1}>
                    <Text
                      onPress={() => setRealEstate(true)}
                      style={styles.interestButtonText1}
                    >
                      Real Estate
                    </Text>
                  </Pressable>
                )}
              </View>
              <View style={styles.dropdownContainer}>
                <DropDownPicker
                  open={openHow}
                  value={howValue}
                  items={howItems}
                  setOpen={setOpenHow}
                  setValue={setHowValue}
                  setItems={setHowItems}
                  textStyle={{
                    fontFamily: "Medium",
                    marginLeft: 10,
                  }}
                  placeholder="How Did You Hear About Us"
                  style={{
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: "#C4C4C4",
                    height: 45,
                    marginBottom: 30,
                  }}
                  dropDownContainerStyle={{
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: "#C4C4C4",
                  }}
                />
              </View>
              {/* <Pressable style={{marginTop: 20}} onPress={() => setKeyboardStatus(!keyboardStatus)}>
        <Text>Press</Text>
      </Pressable> */}

              <View style={[styles.container, { marginBottom: 50 }]}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      // ref={inputRef}
                      onFocus={handleFocus}
                      label="Promo Code"
                      // left={<TextInput.Icon name="email" />}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      style={{
                        margin: 0,
                        backgroundColor: "white",
                        width: 350,
                      }}
                      activeUnderlineColor="#8DC63F"
                      underlineColor="#C5C5C5"
                    />
                  )}
                  name="promoCode"
                />
              </View>
              <Pressable
                onPress={handleSubmit(onSubmit)}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? "#1D2CB5" : "#2436E7",
                    marginBottom: 90,
                  },
                  styles.button,
                ]}

                // style={[styles.button, {marginBottom: 90}]}
              >
                <Text style={styles.text}>Finish Account Setup</Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    height: "100%",
  },
  goalsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  goalsText: {
    fontSize: 14,
    fontFamily: "Regular",
    color: "#898B8D",
  },
  buttonIcon: {
    marginTop: 5,
    marginBottom: "auto",
    marginRight: "auto",
    marginLeft: 15,
  },
  interestButton1: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: "white",
    width: 96,
    height: 31,
    // padding: 20,
    borderWidth: 1,
    borderColor: "#2436E7",
  },
  interestButton2: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    elevation: 3,
    backgroundColor: "#2436E7",
    borderWidth: 1,
    borderColor: "#2436E7",
    width: 96,
    height: 31,
  },
  interestButtonText1: {
    // flex: 1,
    fontSize: 13,
    lineHeight: 21,
    fontFamily: "Medium",
    letterSpacing: 0.25,
    color: "#2436E7",
  },
  interestButtonText2: {
    // flex: 1,
    fontSize: 13,
    lineHeight: 21,
    fontFamily: "Medium",
    letterSpacing: 0.25,
    color: "white",
  },
  interestContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  signUpItems: {
    padding: 10,
  },
  signUpWithButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    // backgroundColor: '#2436E7',
    width: 325,
    borderWidth: 1.5,
    borderColor: "#c5c5c5",
  },
  signUpWithButtonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    marginLeft: "auto",
    marginRight: "auto",
    // backgroundColor: '#2436E7',
    width: 325,
  },
  logo: {
    marginTop: 100,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    // fontFamily: 'graphik-medium'
  },
  text2: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    // fontFamily: 'graphik-medium'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
  },
  dropdownContainer: {
    width: 325,
    zIndex: 300,
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
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },
});

export default SignUp1;

// {/* <Text style={{fontSize: 14, fontFamily: "Regular", textDecorationLine: 'underline', color: '#2436E7' }}>Are you an accredited investor? Apply here</Text>

// <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 20}}>
//   <View style={{flex: 1, height: 3, backgroundColor: '#8DC63F', marginLeft: 30}} />
// <View>
//   <Text style={{width: 50, textAlign: 'center', color: '#8DC63F'}}>OR</Text>
// </View>
//   <View style={{flex: 1, height: 3, backgroundColor: '#8DC63F', marginRight: 30}} />
// </View>

// <Pressable style={styles.signUpWithButton}>
//   <View style={styles.signUpWithButtonContainer}>
//     {/* <Icon name='facebook' /> */}
//     <Text  onPress={() => console.log('presss')}  style={styles.text2}>Sign Up Facebook</Text>
//   </View>
// </Pressable>
// <Pressable style={styles.signUpWithButton}>
//   <View style={styles.signUpWithButtonContainer}>
//     {/* <Icon style={{marginRight: 40 }} name='facebook' /> */}
//     <Text  onPress={() => console.log('presss')}  style={styles.text2}>Sign Up Apple</Text>
//   </View>
// </Pressable>
// <Pressable style={styles.signUpWithButton}>
//   <View style={styles.signUpWithButtonContainer}>
//     {/* <Icon name='facebook' /> */}
//     <Text  onPress={() => console.log('presss')}  style={styles.text2}>Sign Up Google</Text>
//   </View>
// </Pressable> */}
