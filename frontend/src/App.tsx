import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

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
import ResetPassword from './components/forms/ResetPassword';

import { RootState } from './store/store';

import { Analytics } from "@vercel/analytics/react"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userInfo: any = useSelector<RootState>((state) => state.user)

  useEffect(() => {
    if (userInfo.isAuthenticated) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false); // For testing purposes, set to true to bypass login
    }
  })

  return (
    <>
      <Routes>
        <Route path="/computers" element={<ComputersPage />} />
        <Route path='/:category/:id' element={<ProductPage />} />
        <Route path="/phone" element={<PhonePage />} />
        <Route path="/smartwatch" element={<SmartWatchesPage />} />
        <Route path="/gaming" element={<GamingPage />} />
        <Route path="/head-phones" element={<HeadPhonesPage />} />
        {isLoggedIn && <Route path="/cart" element={<CartPage />} />}
        {isLoggedIn && <Route path="/checkout" element={<CheckoutPage />} />}
        {isLoggedIn && <Route path="/favorite" element={<WishlistPage />} />}
        {isLoggedIn && <Route path="/profile" element={<ProfilePage user={userInfo.user} />} />}
        {!isLoggedIn && <Route path="/login" element={<Login />} />}
        {!isLoggedIn && <Route path="/create-account" element={<CreateAccount />} />}
        {!isLoggedIn && <Route path="/forget-password" element={<ResetPassword />} />}
        <Route index element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Analytics />
    </>
  )
}

export default App
