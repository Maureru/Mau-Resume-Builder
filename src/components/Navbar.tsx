import React from 'react'
import { MdDarkMode } from 'react-icons/md';
import { IoMdSunny } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { toggleTheme } from '../reducers/themeSlice';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const {theme} = useAppSelector(state => state)
    const dispatch = useAppDispatch()

  return (
    <div className='h-16 px-8 flex justify-between items-center'>
        <a className='' href='/'>
        <div id='logo' className='select-none'>
            <img className='h-[2.5rem] lg:h-[3.5rem]' src='../src/assets/logo.png' alt=''/>
        </div>
        </a>
        <div>
            {/* ================ theme mode toggle ============= */}
            <div onClick={() => {
                dispatch(toggleTheme())
            }} id='toogle' className='p-2 hover:bg-slate-500 rounded-md'>
                {theme.darkMode ? <IoMdSunny className='text-white'/> : <MdDarkMode/>}
            </div>
            {/* ================================================== */}
        </div>
    </div>
  )
}

export default Navbar