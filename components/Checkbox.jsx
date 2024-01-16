import * as React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

// interface Props {
//   label: string;
//   status: any;
//   onPress(): void;
// }


const CheckBox = ({ label, status, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
     
        <Text style={{ fontWeight: 'bold' }}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default CheckBox;