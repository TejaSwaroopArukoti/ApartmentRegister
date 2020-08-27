
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {

  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { Button,
          Input,Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { deleteEntry } from './actions/entry';

function ViewEntries({navigation,route}) {

 const dispatch = useDispatch();

  const viewEntries = useSelector(state => state.entry.entries);

  const handleEdit = (key) => {

    navigation.navigate("AddEntry",{mode:"EDIT", index: key, entry: viewEntries[key]});

  }

  const handleDelete = (key) => {

    dispatch(deleteEntry(key));

  }

    return (
    <View>
        {
          viewEntries.map((entry,index)=>{
            return (
              <View key={index} style={styles.item}>
                <Text>{entry.guestName}</Text>
                <Text>Logged in Time: {entry.entryDate}</Text>
                <Text>Vehicle Num   : {entry.vehicleNum}</Text>
                <Button title="Edit" onPress={()=>{handleEdit(index)}}/>
                <Button title="Delete" onPress={()=>{handleDelete(index)}}/>
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
