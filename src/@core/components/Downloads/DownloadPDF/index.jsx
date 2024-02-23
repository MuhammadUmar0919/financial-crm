import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ToastPromise } from '../ToastPromise';
import toast from 'react-hot-toast';

const MyDocument = ({ data }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text>{data.name}</Text>
        <Text>{data.description}</Text>
        {/* Additional data */}
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const PDFComponent = (data, title) => {
  return (
    <PDFDownloadLink document={<MyDocument data={data} />} fileName={`${title}.pdf`}>
      {({ loading, error }) => (loading ? 'Loading document...' : error ? 'Error generating PDF!' : 'Download PDF')}
    </PDFDownloadLink>
  );
};


export const DownloadPDF = async (data, title) => {
  if (data.length === 0) {
    // Show a warning toast for empty data
    toast.error("No data to download");
    return;
  }
  console.log(title)

  try {
    const pdfBlob = PDFComponent(data, title); 
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${title}.pdf`;
    link.click();
    URL.revokeObjectURL(pdfUrl);
    await ToastPromise(title, "PDF", true); 
  } catch (error) {
    console.error('Error downloading PDF:', error);
    await ToastPromise(title, "PDF", false); // Assuming ToastPromise is defined somewhere
  }
};


// PDF import
// import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// // ...

// export const DownloadPDF = async (data, title) => {
//   try {
//     if (data.length === 0) {
//       toast.error("No data to download");
//       return;
//     }

//     const loadingPromise = toast.promise(
//       new Promise(async (resolve) => {
//         await TimeSleep();

//         try {
//           // PDF generatsiya qilish
//           const pdfBuffer = await generatePDF(data);
//           const blob = new Blob([pdfBuffer], { type: 'application/pdf' });

//           // PDF faylini yuklab olish uchun link yaratish
//           const url = URL.createObjectURL(blob);
//           const a = document.createElement('a');
//           a.href = url;
//           a.download = `${title}.pdf`;

//           document.body.appendChild(a);
//           a.click();

//           // URL obyektini bekor qilish
//           URL.revokeObjectURL(url);

//           resolve();
//         } catch (error) {
//           console.error('Error downloading PDF:', error);
//           toast.error(`Error generating ${title}`);
//         }
//       }), {
//         loading: `Generating ${title}...`,
//         success: `Downloaded ${title}`,
//         error: `Error generating ${title}`,
//       }
//     );

//     await loadingPromise;
//   } catch (error) {
//     console.error('Error in Toast:', error);
//   }
// };

// // PDF generatsiya qilish uchun funksiya
// const generatePDF = async (data) => {
//   return new Promise((resolve) => {
//     const MyDoc = () => (
//       <Document>
//         <Page>
//           <View>
//             <Text>Data for PDF:</Text>
//             <View>
//               {data.map((item) => (
//                 <View key={item.id}>
//                   <Text></Text>
//                 </View>
//               ))}
//             </View>
//           </View>
//         </Page>
//       </Document>
//     );

//     const pdfBuffer = PDFRenderer.renderToBuffer(<MyDoc />);
//     resolve(pdfBuffer);
//   });
// };



