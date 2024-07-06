import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import axios from 'axios';

const ReportPDF = ({ sellRequest }) => {
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
    },
    image: {
      width: 200,
      height: 200,
    },
  });

  // Function to fetch image as Blob
  const imageUrl = sellRequest.watchForm.image;

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Rolex Watch Appraisal Report</Text>

          <View style={styles.section}>
            <Text>Watch Information:</Text>
            <Text>Watch Name: {sellRequest.watchForm.name}</Text>
            <Text>Model Number: {sellRequest.watchForm.modelNumber}</Text>
            <Text>Serial Number: {sellRequest.watchForm.serialNumber}</Text>
            <Text>Year of Manufacture: {sellRequest.watchForm.year}</Text>
            <Text>Type: {sellRequest.watchForm.type}</Text>
            <Text>Case Color: {sellRequest.watchForm.caseColor}</Text>
            <Text>Case Size: {sellRequest.watchForm.caseSize}</Text>
            <Text>Dial Color: {sellRequest.watchForm.dialColor}</Text>
            <Text>Strap Material: {sellRequest.watchForm.strapMaterial}</Text>
            <Text>Brand: {sellRequest.watchForm.brand}</Text>
            <Text>Description: {sellRequest.watchForm.description}</Text>
            <Text>Market Value: {sellRequest.watchForm.marketValue}</Text>
            <Text>Production Limit: {sellRequest.watchForm.productionLimit}</Text>
          </View>

          <View style={styles.section}>
            <Text>Seller Information:</Text>
            <Text>Name: {sellRequest.sellForm.firstName} {} {sellRequest.sellForm.lastName}</Text>

            
            <Text>Phone Number: {sellRequest.sellForm.phoneNumber}</Text>
            <Text>Email: {sellRequest.sellForm.email}</Text>
          </View>

          <View style={styles.section}>
            <Text>Quote Information:</Text>
            <Text>Initial Price: {sellRequest.sellForm.initialPrice}</Text>
            <Text>Minimum Maintenance Fee: {sellRequest.sellForm.maintenanceFee}</Text>
            <Text>Total Price: {sellRequest.sellForm.totalPrice}</Text>
          </View>

          <View style={styles.section}>
            <Text>Attachments:</Text>
            <Text>Original Contract: {sellRequest.sellForm.originalContract ? 'Yes' : 'No'}</Text>
            <Text>User Manual: {sellRequest.sellForm.userManual ? 'Yes' : 'No'}</Text>
            <Text>Factory Label: {sellRequest.sellForm.factoryLabel ? 'Yes' : 'No'}</Text>
          </View>

          <View style={styles.section}>
            <Text>Watch Image:</Text>
            {imageUrl ? (
              <Image style={styles.image} src={imageUrl} />
            ) : (
              <Text>No Image Available</Text>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ReportPDF;
