import React from 'react';
import { NavBar } from '../components/componentsindex';  // Check the path to NavBar component
import '../styles/globals.css';
const MyApp = ({ Component, pageProps }) => (
  <div>
    <NavBar />  {/* Ensure NavBar is correctly imported and used */}
    <Component {...pageProps} />
  </div>
);

export default MyApp;