import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { HashRouter } from 'react-router-dom'

import './App.css'
import Navbar from './components/Navbar'
import Apps from './pages/Apps'
import Final from './pages/Final'
import Home from './pages/Home'

import { toggleTheme } from './reducers/themeSlice'
import { RootState } from './store'
import { useAppDispatch, useAppSelector } from './store/hooks'

function App() {

  const {theme} = useAppSelector((state: RootState) => state)



  useEffect(() => {
    if (theme.darkMode) {
      document.documentElement.classList.add("dark")
      
      
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme.darkMode])
  
  
  return (
    <div className="App">
      <Navbar/>
      <HashRouter>
        <AnimatePresence exitBeforeEnter>
          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/app' element={<Apps/>}/>
              <Route path='/app/final' element={<Final/>}/>
            </Routes>
        </AnimatePresence>
      </HashRouter>
      
    </div>
  )
}

export default App
