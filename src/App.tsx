import React from 'react'
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