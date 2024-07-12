import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const ReportPDF = ({ productData }) => {
  // Define styles using StyleSheet
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
      padding: 10,
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    title: {
      fontSize: 24,
      textAlign: 'center',
      marginBottom: 20,
    },
    subtitle: {
      fontSize: 18,
      margin: 12,
    },
    text: {
      fontSize: 14,
      margin: 5,
      padding: 5,
      color: "red",
    },
    image: {
      width: 200,
      height: 200,
    },
  });

  // Extract data from productData
  const {
    name,
    brand,
    price,
    description,
    type,
    dialColor,
    box,
    papers,
    waterResistance,
    caseMaterial,
    caseSize,
    pastUsageTime,
    yearOfProduction,
    remainingInsurance,
    image,
  } = productData;

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Rolex Watch Appraisal Report</Text>

          <View style={styles.section}>
            <Text>Watch Information:</Text>
            <Text>Watch Name: {name}</Text>
            <Text>Brand: {brand}</Text>
            <Text>Price: {price}</Text>
            <Text>Description: {description}</Text>
            <Text>Type: {type}</Text>
            <Text>Dial Color: {dialColor}</Text>
            <Text>Box: {box ? 'Yes' : 'No'}</Text>
            <Text>Papers: {papers ? 'Yes' : 'No'}</Text>
            <Text>Water Resistance: {waterResistance}</Text>
            <Text>Case Material: {caseMaterial}</Text>
            <Text>Case Size: {caseSize}</Text>
            <Text>Past Usage Time: {pastUsageTime}</Text>
            <Text>Year of Production: {yearOfProduction}</Text>
            <Text>Remaining Insurance: {remainingInsurance}</Text>
          </View>

          {/* <View style={styles.section}>
            <Text>Watch Image:</Text>
            {image ? (
              <Image style={styles.image} src={image} />
            ) : (
              <Text>No Image Available</Text>
            )}
          </View> */}
        </View>
      </Page>
    </Document>
  );
};

export default ReportPDF;
