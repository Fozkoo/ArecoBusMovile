import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '@fontsource-variable/onest';
import { MenuProvider } from './context/MenuContextProps';


const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <MenuProvider>
      <App />
    </MenuProvider>
  </React.StrictMode>
);