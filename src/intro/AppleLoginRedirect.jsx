import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AppleLoginRedirect = () => {
  const location = useLocation();

  useEffect(() => {
    // Extract the code and id_token from the URL parameters
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const id_token = params.get('id_token');

    if (code && id_token) {
      // Prepare the data to send to the backend
      const formData = new FormData();
      formData.append('code', code);
      formData.append('id_token', id_token);

      // Send the code and id_token to the backend
      fetch('/api/v1/auth/login/apple', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log('Backend response:', data);
          // Handle successful response, e.g., redirect to a dashboard or show a message
        })
        .catch(error => {
          console.error('Error:', error);
          // Handle errors here
        });
    }
  }, [location.search]);

  return (
    <div>
      <h1>Processing Apple Login...</h1>
      {/* You can display a loader or some message here */}
    </div>
  );
};

export default AppleLoginRedirect;
