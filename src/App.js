import React from 'react';
import ActionComponent from './components/ActionComponent';
import NewsletterComponent from './components/Newsletter';
import Header from './components/Header';

const App = () => {
  return (
    <div>
      <Header/>
      <ActionComponent />
      {/* <NewsletterComponent /> */}
    </div>
  );
};

export default App;
