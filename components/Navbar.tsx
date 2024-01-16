import * as React from 'react';
import { View, Text, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';


function HomeScreen( navigation: any ) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
   <Pressable onPress={() => navigation.goBack()}>
        <Text>sdfsd</Text>
      </Pressable>
    </View>
  );
}



const Drawer = createDrawerNavigator();

export default function Navbar() {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}