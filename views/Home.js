
import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {  Button, Icon } from 'react-native-elements';
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

    let entry = viewEntriesData.filter((entry)=>entry.id === key);
    navigation.navigate("AddEntry",{mode:"EDIT", entry: entry});

  }

  const handleDelete = async (key) => {
    console.log('key is ',key)
    await dispatch(deleteEntry(key));
    dispatch(viewEntries());
  }

    return (
        <View style={styles.container}>
          <ScrollView>
           <View>
            {
              viewEntriesData.map((entry,index)=>{
                return (
                  <View key={entry.id} style={styles.item}>
                    <Text style={styles.itemName}>{entry.guestName.toUpperCase()}</Text>
                    <Icon
                      raised
                      name='edit'
                      type='material'
                      color='#517fa4'
                      onPress={()=>{handleEdit(entry.id)}}
                    />
                     <Icon
                      raised
                      name='delete'
                      type='material'
                      color='#517fa4'
                      onPress={()=>{handleDelete(entry.id)}}
                    />
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
    backgroundColor:'#BBB8B2'
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
    backgroundColor:'#BC5D2E',
    flexDirection:'row',
    alignItems: 'center'
  },
  itemName: {
    fontSize:30,
    fontWeight:'500',
    color:'#FFFBFA',
    flexGrow:1
  }
});

export default Home
