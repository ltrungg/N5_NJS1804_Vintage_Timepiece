import React, { useState, useEffect } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Spin, Divider } from 'antd';
import ReportPDF from './ReportPDF'; 
import { StyleSheet } from '@react-pdf/renderer';

const ReportPage = () => {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        // const response = await axios.get(`http://localhost:3000/product/${id}`);
        const response = await axios.get(`http://localhost:3000/product/3d153d7a-b27d-45e7-988f-b610b7257c67`);
        setProductData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch product data:', error);
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  if (loading) {
    return <Spin size="large" />;
  }

  const styles = StyleSheet.create({
    reportContainer: {
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f2f5',
    },
    report: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '800px',
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

  const handleDownloadPDF = () => {
    const pdfBlobUrl = URL.createObjectURL(new Blob([<ReportPDF productData={productData} />], { type: 'application/pdf' }));

    const anchorElement = document.createElement('a');
    anchorElement.href = pdfBlobUrl;
    anchorElement.download = 'report.pdf';
    document.body.appendChild(anchorElement);
    anchorElement.click();
    document.body.removeChild(anchorElement);
  };

  return (
    <div style={styles.reportContainer}>
      <div style={styles.report}>
        <h2>Rolex Watch Appraisal Report</h2>

        <PDFViewer style={styles.pdfViewer}>
          <ReportPDF productData={productData} />
        </PDFViewer>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <div
            style={styles.actionButton}
            onClick={handleDownloadPDF}
          >
            Download PDF
          </div>

          <div
            style={styles.actionButton}
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
