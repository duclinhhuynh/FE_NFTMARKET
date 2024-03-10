import React from 'react';
import { NavBar,Footer} from '../components/componentsindex';  // Check the path to NavBar component
import '../styles/globals.css';
const MyApp = ({ Component, pageProps }) => (
  <div>
    <NavBar />  {/* Ensure NavBar is correctly imported and used */}
    <Component {...pageProps} />
    <Footer/>
  </div>
);

export default MyApp;