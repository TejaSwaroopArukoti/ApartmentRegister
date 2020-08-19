
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Alert
} from 'react-native';
import { LogBox } from 'react-native';

import { Button,
          Input,Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Formik, Form, Field, ErrorMessage  } from 'formik';
import * as yup from 'yup';
import moment from 'moment';

const EntrySchema = yup.object({
  guestName: yup.string().required().min(4),
  vehicleNum: yup.string().required().min(4),
  flatNum: yup.string().required().min(4),
})


function AddEntry({navigation}) {

  const resetForm = () => {
    let obj = {

    }
  }

    return (
    <View style={styles.container}>
   <Formik
     initialValues={{ guestName:'', vehicleNum:'', flatNum:'' }}
     validationSchema={EntrySchema}
     onSubmit={values => { let newValues = {...values, 
      time: moment()
      .utcOffset('+05:30')
      .format('YYYY-MM-DD hh:mm:ss a')}; console.log(newValues); navigation.navigate('Home',{entry: newValues})}}
   >
     {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
       <View>
 
          <Input 
            placeholder="Enter guest name"
            value={values.guestName}
            onChangeText={handleChange('guestName')}
            onBlur={handleBlur('guestName')}
            />

          <Text style={styles.errorText}> {touched.guestName && errors.guestName} </Text>

          <Input 
            placeholder="Enter vehicle number "
            value={values.vehicleNum}
            onChangeText={handleChange('vehicleNum')}
            onBlur={handleBlur('vehicleNum')}
            />

          <Text style={styles.errorText}> {touched.vehicleNum && errors.vehicleNum} </Text>

          <Input 
            placeholder="Enter flat num"
            value={values.flatNum}
            onChangeText={handleChange('flatNum')}
            onBlur={handleBlur('flatNum')}
              />

          <Text style={styles.errorText}> {touched.flatNum && errors.flatNum} </Text>

          <Button onPress={handleSubmit} title="Submit" />
       </View>
     )}
   </Formik>
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  button: {
    width:'50%',
  },
  errorText:{
    color:'crimson',
    fontWeight:'bold',
    marginTop:3,
    textAlign:'center'
  }
});

export default AddEntry
