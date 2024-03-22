import React from 'react';
import { NavBar,Footer} from '../components/componentsindex';  // Check the path to NavBar component
import '../styles/globals.css';
import { NFTMarketplaceProvider } from '../Context/NFTMarketplaceContext';
const MyApp = ({ Component, pageProps }) => (
  <div>
    <NFTMarketplaceProvider>
    <NavBar />  {/* Ensure NavBar is correctly imported and used */}
    <Component {...pageProps} />
    <Footer/>
    </NFTMarketplaceProvider>
  </div>
);

export default MyApp;