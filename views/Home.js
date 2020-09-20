import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Button, Icon} from 'react-native-elements';
import {FAB} from 'react-native-paper';
import {viewEntries, deleteEntry} from './actions/entry';
import backgroundimg from '../image.jpg';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableHighlight,
} from 'react-native';

import Share from 'react-native-share';
import PDFLib, {PDFDocument, PDFPage} from 'react-native-pdf-lib';

function Home({navigation, route}) {
  let viewEntriesData = useSelector((state) => state.entry.entries);

  useEffect(() => {
    dispatch(viewEntries());
  }, []);

  const dispatch = useDispatch();

  const handleEdit = (key) => {
    let entry = viewEntriesData.filter((entry) => entry.id === key);
    navigation.navigate('AddEntry', {mode: 'EDIT', entry: entry});
  };

  const generatePDF = async () => {
    // Create a PDF page with text and rectangles
    const page1 = PDFPage.create()
      .setMediaBox(500, 500)
      .drawText(
        'You can add text and rectangles to dflkdsfljsdjlfksdjlfsdjfljlsdfjdsf    dsfjdsfjdsfjdsfhsdfhsdhfhdsfhsdhfhdsf      jhdsfhsdhfhsdfhdshfhsdfhsdhfhsdhfhsdfhsd      sdfhsdfhhsdfhsdhfhsdhfhdsrftrtrajfad',
        {
          x: 5,
          y: 5,
          color: '#007386',
        },
      )
      .drawRectangle({
        x: 25,
        y: 25,
        width: 150,
        height: 150,
        color: '#FF99CC',
      })
      .drawRectangle({
        x: 75,
        y: 75,
        width: 50,
        height: 50,
        color: '#99FFCC',
      });

    // Create a PDF page with text and images
    const jpgPath = backgroundimg;
    const pngPath = backgroundimg;
    // const page2 = PDFPage
    // .create()
    // .setMediaBox(250, 250)
    // .drawText('You can add JPG images too!')
    // .drawImage(jpgPath, 'jpg', {
    //   x: 5,
    //   y: 125,
    //   width: 200,
    //   height: 100,
    // })
    // .drawImage(pngPath, 'png', {
    //   x: 5,
    //   y: 25,
    //   width: 200,
    //   height: 100,
    // });

    // Create a new PDF in your app's private Documents directory
    const docsDir = await PDFLib.getDocumentsDirectory();
    const pdfPath = `${docsDir}/sample.pdf`;
    PDFDocument.create(pdfPath)
      .addPages(page1)
      .write() // Returns a promise that resolves with the PDF's path
      .then((path) => {
        console.log('PDF created at: ' + path);

        const options = Platform.select({
          default: {
            title: 'register',
            message: `day activity`,
            type: 'application/pdf',
            filename: 'share.pdf',
            url: 'file://' + path,
          },
        });

        Share.open(options)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            err && console.log(err);
          });
        // Do stuff with your shiny new PDF!
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = async (key) => {
    console.log('key is ', key);
    await dispatch(deleteEntry(key));
    dispatch(viewEntries());
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          {viewEntriesData.map((entry, index) => {
            return (
              <View key={entry.id} style={styles.item}>
                <Text style={styles.itemName}>
                  {entry.guestName.toUpperCase()}
                </Text>
                <Icon
                  raised
                  name="edit"
                  type="material"
                  color="#517fa4"
                  onPress={() => {
                    handleEdit(entry.id);
                  }}
                />
                <Icon
                  raised
                  name="delete"
                  type="material"
                  color="#517fa4"
                  onPress={() => {
                    handleDelete(entry.id);
                  }}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
      <FAB
        style={styles.fab}
        large
        icon="plus"
        onPress={() => navigation.navigate('AddEntry', {mode: 'CREATE'})}
      />
      <FAB
        style={styles.viewFab}
        large
        icon="plus"
        onPress={() => generatePDF()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#BBB8B2',
  },
  btnUI: {
    marginTop: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#414288',
  },
  viewFab: {
    position: 'absolute',
    margin: 16,
    right: 100,
    bottom: 0,
    backgroundColor: '#414288',
  },
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: '#BC5D2E',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 30,
    fontWeight: '500',
    color: '#FFFBFA',
    flexGrow: 1,
  },
});

export default Home;
