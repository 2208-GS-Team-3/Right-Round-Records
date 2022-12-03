import React from 'react';
import App from './components/App';
import store from './store';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

const container = document.querySelector('#root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <BrowserRouter>
        <CssBaseline>
            <App />
        </CssBaseline>
        </BrowserRouter>
    </Provider>
);
