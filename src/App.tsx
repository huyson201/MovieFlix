import React, { useEffect } from 'react'
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-loading-skeleton/dist/skeleton.css'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import Form from './components/Form/Form';
import ContextProvider from './context/ContextProvider';
import Backdrop from './components/Backdrop/Backdrop';
import RotatingLoader from './components/Loader/RotatingLoader';
import { initFacebookSdk } from './utils/facebook';
import VideoModal from './components/VideoModal/VideoModal';

function App() {

  useEffect(() => {
    // start backend server
    fetch("https://kind-pink-cuttlefish-shoe.cyclic.app/api/")

    // initial facebook sdk
    initFacebookSdk();

  }, [])

  return (
    <div className="App">
      <ContextProvider>
        <NavBar />
        <Outlet />
        <Footer />
        <Form />
        <Backdrop />
        <RotatingLoader />
        <VideoModal />
      </ContextProvider>
    </div>
  )
}

export default App
