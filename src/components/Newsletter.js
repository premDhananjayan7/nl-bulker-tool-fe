import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Newsletter = () => {
  const [newsletters, setNewsletters] = useState([]);

  useEffect(() => {
    // Fetch newsletters
    axios.get('http://localhost:3600/api/newsletters')
      .then(response => {
        const data = response.data || [];
        setNewsletters(data);
      })
      .catch(error => console.error('Error fetching newsletters:', error));
  }, []);

  return (
    <div>
      <h2>Newsletters Data:</h2>
      <div style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', overflow: 'auto', maxHeight: '300px' }}>
        <pre>{JSON.stringify(newsletters, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Newsletter;
