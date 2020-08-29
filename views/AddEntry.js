
import React, { useState, useEffect } from 'react';
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
import {createEntry, editEntry,viewEntries} from './actions/entry';
import { LogBox,Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import {useSelector, useDispatch} from 'react-redux';

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



function AddEntry({navigation, route}) {

  const dispatch = useDispatch();

  const handleSubmitBtn = async (values, navigation) => { 
    console.log('mode')
   console.log('button clicked');
    if( mode === "EDIT") {
       let fullObj = {...values, entryDate: otherValues.entryDate, id: otherValues.id};
      await dispatch(editEntry(fullObj));
      dispatch(viewEntries());
      navigation.navigate('Home');

    } else {

      let entryDate = moment()
      .utcOffset('+05:30')
      .format('YYYY-MM-DD hh:mm:ss a');
      let formObj = {...values, entryDate:entryDate } 
      await dispatch(createEntry(formObj));
      dispatch(viewEntries());
      navigation.navigate('Home');

    }
    
  }
  const [mode,setMode] = useState("");
  const [initialEntries, setInitialEntries] = useState({ guestName:'', vehicleNum:'', flatNum:'', mobileNum:'',purposeOfVisit:''});
  const [otherValues, setOtherValues] = useState({});
  React.useEffect(() => {
    if (route.params.mode) {
      setMode(route.params.mode);
      if(route.params.mode==="EDIT"){ 
        let newEntry = route.params.entry[0];
        let selectedEntry = {guestName: newEntry.guestName, vehicleNum: newEntry.vehicleNum, flatNum: newEntry.flatNum, 
                            mobileNum: newEntry.mobileNum, purposeOfVisit: newEntry.purposeOfVisit};
        setInitialEntries(selectedEntry);
        setOtherValues({id: newEntry.id, entryDate: newEntry.entryDate});
      }
    }
  }, [route.params.mode]);


    return (
    <View style={styles.container}>
   <Formik
     initialValues={initialEntries}
     validationSchema={EntrySchema}
     enableReinitialize={true}
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
