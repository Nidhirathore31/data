import { useState } from 'react'
import './App.css'
import Routing from './routes/Routing'
import { BrowserRouter } from 'react-router-dom'




function App() {
 

  return (
    <>

      <BrowserRouter>

        <Routing />

      </BrowserRouter>
    </>
  )
}

export default App
