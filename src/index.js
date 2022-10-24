import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/index.css';
import './Styles/buttons.css';

import reportWebVitals from './reportWebVitals';
import AppRoutes from './Routes/AppRoutes';

import { Provider } from 'react-redux';
import store from './Redux/store';

//  NOTIFICATIONS
// TOAST
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';
import Loader from './Components/Loader';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer />

    <Provider store={store}>
      {/* {} */}
      <Loader />
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Reservá zonas comunes de tu edificio"
        />
        <meta name="keywords" content="Reservar,Edificios,Zoom, Area común" />
        <meta name="martin" content="123" />
      </Helmet>
      <AppRoutes />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
