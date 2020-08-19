
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar
} from 'react-native';

import {

  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { Button,
          Input,Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

function ViewEntries({navigation,route}) {

  const [viewEntries, setViewEntries] = useState([]);

  React.useEffect(() => {
    if (route.params?.entries) {
      setViewEntries(route.params.entries);
    }
  }, [route.params?.entries]);

    return (
    <View>
        {
          viewEntries.map((entry,index)=>{
            return (
              <View key={index} style={styles.item}>
                <Text>{entry.guestName}</Text>
                <Text>Logged in Time: {entry.time}</Text>
                <Text>Logged in Time: {entry.vehicleNum}</Text>
              </View>
            )
          })
        }
    </View>
    )
}


const styles = StyleSheet.create({
  item: {
    marginTop: 24,
    padding:30,
    backgroundColor:'pink'
  },

});


export default ViewEntries
