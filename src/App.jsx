import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Cart from './pages/Cart/Cart'
import Footer from './Components/Footer/Footer'
import LoginPopup from './Components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
import Chatting from './pages/Chatting/Chatting'
import Profile from './pages/Profile/Profile'
const ZENDESK_KEY = "cc894698-9e45-40b1-89da-fe036719e123";
import Zendesk, { ZendeskAPI } from "./ZendexConfig";

const App = () => {

  const handleLoaded = () => {
    ZendeskAPI("messenger", "open");
  };


  const [showLogin,setShowLogin] = useState(false)


  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className="app">
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
         <Route path='/' element={<Home/>} />
         <Route path='/cart' element={<Cart/>} />
         <Route path='/order' element={<PlaceOrder/>} />
         <Route path='/verify' element={<Verify/>} />
         <Route path='/myorders' element={<MyOrders/>} />
         <Route path='/chatting' element={<Chatting/>} />
         <Route path='/profile' elemnet={<Profile/>} />
      </Routes>
      <Zendesk defer zendeskKey={ZENDESK_KEY} onLoaded={handleLoaded} />
    </div>
    <Footer/>
    </>
  )
}

export default App
