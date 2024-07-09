
const generateCertificate = async (itemId, certificateData) => {
    // API của certificate nha LINH
    try {
      const response = await fetch(`???????`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId, ...certificateData }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to generate certificate');
      }
  
      const data = await response.json();
      console.log('Certificate generated:', data);
      return data;
    } catch (error) {
      console.error('Error generating certificate:', error);
    }
  };
  
  const getRequestStatus = async ({ id, status, reason, startingPrice }) => {
    // API call để update 
    try {
      const response = await fetch(`??????${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, reason, startingPrice }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update request status');
      }
  
      const data = await response.json();
      console.log('Request status updated:', data);
      return data;
    } catch (error) {
      console.error('Error updating request status:', error);
    }
  };

