import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';


import ShopContextProvider from './Context/ShopContext';

// import { Provider as AlertProvider, positions, transitions } from "react-alert";
import {Provider as AlertProvider,positions,transitions} from "react-alert"
import store from "./store"
// `import AlertTemplate from "react-alert-template-basic";`
import AlertTemplate from "react-alert-template-basic"
import {ToastContainer} from "react-toastify"
import {Provider} from 'react-redux'
const options = {
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    transition: transitions.SCALE,
  };
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 


<>
<ToastContainer/>
   <ShopContextProvider>
   <Provider store={store}>

 
      {/* <AlertProvider template={AlertTemplate} {...options}>

     
      </AlertProvider> */}


      <App />

    
    </Provider>


    </ShopContextProvider>
</>
 

 
 
);
