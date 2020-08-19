
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar
} from 'react-native';
import { LogBox } from 'react-native';

import { Button,
          Input,Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

function AddEntry({navigation}) {

    const [form, setForm] = useState({"guestname":"", "vehiclenumber":"", "flatnumber":""});
    const [name,setName] = useState("");
    const [vehicleNum, setVehicleNum] = useState("");
    const [flatNum, setFlatnum] = useState("");
    const submitHandler = ()=>{
      let obj = {...form};
      obj.guestname = name;
      obj.vehiclenumber = vehicleNum;
      obj.flatnumber = flatNum;
      setForm(obj);
      navigation.navigate('Home')
    }
  

    return (
    <View>
        <Input 
        placeholder="Enter guest name"
        value={name}
        onChange={(text)=>setName(text)}
        name="guestname"
        />

        <Input 
        placeholder="Enter vehicle number"
        value={vehicleNum}
        onChange={(text)=>setVehicleNum(text)}
        />

      <Input 
        placeholder="Enter flat number"
        value={flatNum}
        onChange={(text)=>setFlatnum(text)}
        />

        <Button
              title="Submit"
              style={styles.button}
              onPress={submitHandler}
            />
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"center",
    alignItems:'center',
  },
  button: {
    width:'50%',
  }
});

export default AddEntry
