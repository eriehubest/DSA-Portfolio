import React from 'react'
import Home from './pages/Home'
import Cursor from './Cursor'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

import '../styles/content.css'

gsap.registerPlugin(ScrollTrigger);

const Content = ({ currentPage, setCurrentPage, setPagesLight, pagesLight }) => {
    return (
        <>
            <Cursor />
            <Home setPagesLight={setPagesLight} currentPage={currentPage} pagesLight={pagesLight} setCurrentPage={setCurrentPage}/>
        </>
    )
}

export default Content
