
  import Share from 'react-native-share';
  import PDFLib, {PDFDocument, PDFPage} from 'react-native-pdf-lib';
  import backgroundimg from '../image.jpg';
  import RNHTMLtoPDF from 'react-native-html-to-pdf';

  export const generatePDFFromHTML = async ( entriesData ) => {
   
        let options = {
          html: '<h1>PDF TEST</h1>',
          fileName: 'test',
          directory: 'Documents',
        };
        let file;
        try{
            file = await RNHTMLtoPDF.convert(options);
            console.log( file.filePath );
            const shareoptions = Platform.select({
                default: {
                  title: 'register',
                  message: `day activity`,
                  type: 'application/pdf',
                  filename: 'share.pdf',
                  url: 'file://' + file.filePath,
                },
              });
      
              Share.open(shareoptions)
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  err && console.log(err);
                });
        }

        catch(error){
            console.log(file.filePath);
            console.log( error );
        }
        
  
      
  }
  export const generatePDF = async ( entriesData ) => {
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
