import React from 'react';
import { createRoot } from 'react-dom/client';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { Provider as ReduxProvider } from "react-redux";
import store  from "./Store/Store";

import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
  <ReduxProvider store={store}>
  <FluentProvider theme={webLightTheme}  >
    
    <App />
    
  </FluentProvider>
  </ReduxProvider>
  
);
