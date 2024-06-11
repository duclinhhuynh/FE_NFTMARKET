import React from 'react';
import { NavBar, Footer } from '../components/componentsindex'; 
import '../styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { NFTMarketplaceProvider } from '../Context/NFTMarketplaceContext';

const MyApp = ({ Component, pageProps }) => (
  <NextUIProvider>
    <NextThemesProvider
      attribute='class'
      defaultTheme='light'
      themes={['light', 'dark', 'modern']}
    >
      <NFTMarketplaceProvider>
          <NavBar />  
          <Component {...pageProps} />
          <Footer />
      </NFTMarketplaceProvider>
    </NextThemesProvider>
  </NextUIProvider>
);

export default MyApp;
