import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './App.css'
import Home from './pages/Home'
import ComputersPage from './pages/ComputersPage';
import SmartWatchesPage from './pages/SmartWatchesPage';
import HeadPhonesPage from './pages/HeadPhonesPage';
import PhonePage from './pages/PhonePage';
import GamingPage from './pages/GamingPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import CheckoutPage from './pages/CheckoutPage';
import ProfilePage from './pages/ProfilePage';
import PageNotFound from './pages/PageNotFound';

import Login from './components/forms/Login';
import CreateAccount from './components/forms/CreateAccount';

import { Analytics } from "@vercel/analytics/react"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(true); // For testing purposes, set to true to bypass login
    }
  })

  return (
    <>
      <Routes>
        {isLoggedIn && <Route path="/computers" element={<ComputersPage />} />}
        {isLoggedIn && <Route path='/:category/:id' element={<ProductPage />} />}
        {isLoggedIn && <Route path="/phone" element={<PhonePage />} />}
        {isLoggedIn && <Route path="/smartwatch" element={<SmartWatchesPage />} />}
        {isLoggedIn && <Route path="/gaming" element={<GamingPage />} />}
        {isLoggedIn && <Route path="/head-phones" element={<HeadPhonesPage />} />}
        {isLoggedIn && <Route path="/cart" element={<CartPage />} />}
        {isLoggedIn && <Route path="/checkout" element={<CheckoutPage />} />}
        {isLoggedIn && <Route path="/favorite" element={<WishlistPage />} />}
        {isLoggedIn && <Route path="/profile" element={<ProfilePage userName='Samba Siva Reddy' emailAddress='sambachinta.24@gmail.com' phoneNumber='7337375243' password='samba@123' address={null}/>} />}
        {isLoggedIn && <Route index element={<Home />} />}
        {!isLoggedIn && <Route index element={<Login setIsLoggedIn={() => { setIsLoggedIn(true) }} />} />}
        {!isLoggedIn && <Route path="/create-account" element={<CreateAccount setIsLoggedIn={() => { setIsLoggedIn(true) }} />} />}
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
      <Analytics />
    </>
  )
}

export default App
