import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Content from './Components/Content'
import HoverAnimation from './Components/pages/HoverAnimation'
import SmoothScroll from './Components/SmoothScroll'

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [pagesLight, setPagesLight] = useState(false);

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <SmoothScroll>
        <Routes>
          <Route path='/' element={
            <div>
              <Navbar pagesLight={pagesLight} setCurrentPage={setCurrentPage} currentPage={currentPage} />
              <Content currentPage={currentPage} setCurrentPage={setCurrentPage} setPagesLight={setPagesLight} pagesLight={pagesLight} />
            </div>
          } />

          <Route path='/hover-animation' element={<HoverAnimation />}/>
        </Routes>
      </SmoothScroll>
    </BrowserRouter>
  )
}

export default App
