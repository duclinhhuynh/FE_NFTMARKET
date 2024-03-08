import React from 'react';
import { NavBar } from '../components/componentsindex';  // Check the path to NavBar component

const MyApp = ({ Component, pageProps }) => (
  <div>
    <NavBar />  {/* Ensure NavBar is correctly imported and used */}
    <Component {...pageProps} />
  </div>
);

export default MyApp;