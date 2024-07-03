import React, { useState, useEffect } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Spin, Divider } from 'antd';
import ReportPDF from './ReportPDF'; 
import { StyleSheet } from '@react-pdf/renderer';

const ReportPage = () => {
  const [sellRequest, setSellRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchSellRequest = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/sell-request/${id}`);
        setSellRequest(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch sell request:', error);
        setLoading(false);
      }
    };

    fetchSellRequest();
  }, [id]);

  if (loading) {
    return <Spin size="large" />;
  }

  // Define inline styles using StyleSheet.create
  const styles = StyleSheet.create({
    reportContainer: {
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      minHeight: '100vh', // Ensure the container takes up at least the full viewport height
      width: '100%', // Take up full width
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f2f5', // Example background color
    },
    report: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '800px', // Example: Limiting max width to 800px
    },
    section: {
      marginBottom: '20px',
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    text: {
      fontSize: '16px',
      marginBottom: '8px',
    },
    pdfViewer: {
      width: '100%',
      height: '600px',
      border: '1px solid #ccc',
      borderRadius: '1px',
      overflow: 'hidden',
    },
    actionButton: {
      padding: '10px 20px',
      backgroundColor: '#1890ff',
      color: '#fff',
      borderRadius: '4px',
      cursor: 'pointer',
      margin: '0 10px',
      boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
      transition: 'background-color 0.3s ease',
      textDecoration: 'none',
      display: 'inline-block',
      textAlign: 'center',
    },
    actionButtonDisabled: {
      backgroundColor: '#ccc',
      cursor: 'not-allowed',
    },
  });

  // Function to handle PDF download
  const handleDownloadPDF = () => {
    // Create a Blob URL for the PDF blob
    const pdfBlobUrl = URL.createObjectURL(new Blob([<ReportPDF sellRequest={sellRequest} />], { type: 'application/pdf' }));

    // Create an anchor element to trigger the download
    const anchorElement = document.createElement('a');
    anchorElement.href = pdfBlobUrl;
    anchorElement.download = 'report.pdf';
    document.body.appendChild(anchorElement); // Append anchor to body
    anchorElement.click(); // Click on anchor to start download
    document.body.removeChild(anchorElement); // Clean up anchor element after download
  };

  return (
    <div style={styles.reportContainer}>
      <div style={styles.report}>
        <h2>Rolex Watch Appraisal Report</h2>

        <PDFViewer style={styles.pdfViewer}>
          <ReportPDF sellRequest={sellRequest} />
        </PDFViewer>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <div
            style={styles.actionButton}
            // onClick={handleDownloadPDF}
          >
            Other
          </div>

          <div
            style={styles.actionButton}
            // onClick={handleDownloadPDF}
          >
            Other
          </div>

        </div>

        <Divider />
      </div>
    </div>
  );
};

export default ReportPage;
