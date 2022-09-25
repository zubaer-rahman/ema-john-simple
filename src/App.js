import React, { createContext } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext =  createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Router>
          <Header />
          <Routes>
            <Route path='/' exact element={<Shop />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/review' element={<Review />} />
            <Route path='/inventory' element={<PrivateRoute> <Inventory /> </PrivateRoute>} />
            <Route path='/login' element={<Login />} />
            <Route path='/shipment' element={<PrivateRoute> <Shipment /> </PrivateRoute>} />
            <Route path='/product/:product_key' element={<ProductDetail />} />
            <Route path='*'  element={<NotFound />} />

          </Routes>
        </Router>
         
    </UserContext.Provider>
  );
}

export default App;
