
import React, { useState } from 'react';
import {  Button,
          Input,
          Header } from 'react-native-elements';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar
} from 'react-native';

import AddEntry from './AddEntry';
import ViewEntries from './ViewEntries';
function Home({navigation}) {
    return (
        <View style={styles.container}>
            <Button
              title="Add Entry"
              onPress={() => navigation.navigate('AddEntry')}
              buttonStyle={styles.btnUI}
            />
             <Button
              title="View Entries"
              onPress={() => navigation.navigate('ViewEntries')}
              buttonStyle={styles.btnUI}
            />
          
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
  }
});

export default Home
