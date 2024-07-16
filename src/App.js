import React  from 'react';
import {Offline } from 'react-detect-offline';
import { RouterProvider,createHashRouter } from 'react-router-dom';
import Home from './components/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle'

import '@fortawesome/fontawesome-free/css/all.css';


import './index.scss';


let routers = createHashRouter([
  {
    path: '/',
    element: <Home />
  }
  ])


function App() {
  return ( 
    <>
    <div>
  <Offline><div className='offline'>You are offline</div></Offline>
</div>
    <RouterProvider router={routers} />







    </>
  );
}

export default App;
