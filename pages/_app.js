import React from 'react';
import { NavBar, Footer } from '../components/componentsindex'; 
import '../styles/globals.css';
import { NFTMarketplaceProvider } from '../Context/NFTMarketplaceContext';
import Providers from './(Provider)/providers'
const MyApp = ({ Component, pageProps }) => (
  <Providers>
      <NFTMarketplaceProvider>
          <NavBar />  
          <Component {...pageProps} />
          <Footer />
      </NFTMarketplaceProvider>
  </Providers>
);

export default MyApp;
