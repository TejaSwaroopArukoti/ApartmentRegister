
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Alert,
  ToastAndroid
} from 'react-native';
import { LogBox,Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Button,
          Input,Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Formik, Form, Field, ErrorMessage  } from 'formik';
import * as yup from 'yup';
import moment from 'moment';

const EntrySchema = yup.object({
  guestName: yup.string().required().min(4),
  vehicleNum: yup.string().required().min(4),
  flatNum: yup.string().required().min(1),
  mobileNum: yup.number().required(),
  purposeOfVisit: yup.string().required().min(5),
  entryDate: yup.date(),
  exitDate: yup.date()
})

const handleSubmitBtn = (values, navigation) => { 
  let entryDate = moment()
  .utcOffset('+05:30')
  .format('YYYY-MM-DD hh:mm:ss a');
  let formObj = {...values, entryDate:entryDate } 
  navigation.navigate('Home',{entry: formObj});
}


function AddEntry({navigation}) {

    return (
    <View style={styles.container}>
   <Formik
     initialValues={{ guestName:'', vehicleNum:'', flatNum:'', mobileNum:'',purposeOfVisit:''}}
     validationSchema={EntrySchema}
     onSubmit={values => handleSubmitBtn(values, navigation)}
   >
     {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
       <View>
 
          <Input 
            placeholder="Guest name"
            value={values.guestName}
            onChangeText={handleChange('guestName')}
            onBlur={handleBlur('guestName')}
            />

          <Text style={styles.errorText}> {touched.guestName && errors.guestName} </Text>

          <Input 
            placeholder="Mobile number"
            value={values.mobileNum}
            onChangeText={handleChange('mobileNum')}
            onBlur={handleBlur('mobileNum')}
            />

          <Text style={styles.errorText}> {touched.mobileNum && errors.mobileNum} </Text>

          <Input 
            placeholder="Flat num"
            value={values.flatNum}
            onChangeText={handleChange('flatNum')}
            onBlur={handleBlur('flatNum')}
              />

          <Text style={styles.errorText}> {touched.flatNum && errors.flatNum} </Text>

          <Input 
            placeholder="Vehicle number "
            value={values.vehicleNum}
            onChangeText={handleChange('vehicleNum')}
            onBlur={handleBlur('vehicleNum')}
            />

          <Text style={styles.errorText}> {touched.vehicleNum && errors.vehicleNum} </Text>


          <Input 
            placeholder="Purpose of visit "
            value={values.purposeOfVisit}
            onChangeText={handleChange('purposeOfVisit')}
            onBlur={handleBlur('purposeOfVisit')}
            />

          <Text style={styles.errorText}> {touched.purposeOfVisit && errors.purposeOfVisit} </Text>

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
