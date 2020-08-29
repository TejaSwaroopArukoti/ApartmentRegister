
import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {  Button } from 'react-native-elements';
import { FAB } from 'react-native-paper';

import {viewEntries, deleteEntry} from './actions/entry';

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableHighlight
} from 'react-native';

function Home({navigation,route}) {

  let viewEntriesData = useSelector(state => state.entry.entries);
  
  useEffect(() => {
    dispatch(viewEntries());
  },[])

  const dispatch = useDispatch();

  const handleEdit = (key) => {

    navigation.navigate("AddEntry",{mode:"EDIT", index: key, entry: viewEntriesData[key]});

  }

  const handleDelete = (key) => {
    console.log('key is ',key)
    dispatch(deleteEntry(key));
  }

    return (
        <View style={styles.container}>
          <ScrollView>
           <View>
            {
              viewEntriesData.map((entry,index)=>{
                return (
                  <View key={entry.id} style={styles.item}>
                    <Text>{entry.guestName}</Text>
                    <Text>Logged in Time: {entry.entryDate}</Text>
                    <Text>Vehicle Num   : {entry.vehicleNum}</Text>
                    <Button title="Edit" onPress={()=>{handleEdit(entry.id)}}/>
                    <Button title="Delete" onPress={()=>{handleDelete(entry.id)}}/>
                  </View>
                )
              })
            }
          </View>
          </ScrollView>
            <FAB
            style={styles.fab}
            large
            icon="plus"
            onPress={() => navigation.navigate('AddEntry',{mode:"CREATE"})}/>
              <FAB
            style={styles.viewFab}
            large
            icon="plus"
            onPress={() => dispatch(viewEntries())}/>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:"center",
    padding:10,
  },
  btnUI: {
    marginTop: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#414288'
  },
  viewFab:{
    position: 'absolute',
    margin: 16,
    right: 100,
    bottom: 0,
    backgroundColor: '#414288'
  },  
  item: {
    marginTop: 24,
    padding:30,
    backgroundColor:'pink'
  },
});

export default Home
