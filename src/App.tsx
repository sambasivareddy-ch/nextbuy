import { Route, Routes } from 'react-router-dom'

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

function App() {
  return (
    <Routes>
      <Route path="/computers" element={<ComputersPage/>}/>
      <Route path="/:category/:id" element={<ProductPage/>}/>
      <Route path="/phone" element={<PhonePage/>}/>
      <Route path="/smartwatch" element={<SmartWatchesPage/>}/>
      <Route path="/gaming" element={<GamingPage/>}/>
      <Route path="/head-phones" element={<HeadPhonesPage/>}/>
      <Route path="/cart" element={<CartPage/>}/>
      <Route path="/checkout" element={<CheckoutPage/>}/>
      <Route path="/favorite" element={<WishlistPage/>}/>
      <Route path="/profile" element={<ProfilePage/>}/>
      <Route index element={<Home/>}/>
    </Routes>
  )
}

export default App
