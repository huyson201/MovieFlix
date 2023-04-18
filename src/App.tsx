import React from 'react'
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-loading-skeleton/dist/skeleton.css'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'

function App() {

  return (
    <div className="App">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
