import React,{useState} from 'react'
import logo from '../assets/logo.png'
import {styles} from '../styles';
import { Link } from 'react-router-dom';
import menu from '../assets/menu1.svg';
import close from '../assets/close.svg';
import Hero from './Hero';

const Header = () => {
  const [active,setActive]=useState('');
  const [toggle,setToggle]=useState(false);
  return (
    <div>
<nav className={`${styles.paddingX} w-full flex items-center py-3 fixed top-0 z-20 bg-gradient-to-r from-sky-50 to-sky-300`}>
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link to="/" className="flex items-center gap-2" onClick={()=>{setActive("");window.scrollTo(0,0);}}>
          <img src={logo} alt="logo" className="w-20 h-15 object-contain"/>
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-10">
        <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 font-sans font-semibold rounded hover:font-bold hover:text-lg group hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent relative">Home
          <span className="absolute inset-x-0 bottom-0 h-[3px] rounded bg-teal-600 transform scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-300"></span>
          </a>
        </li>
        <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 font-sans font-semibold rounded hover:font-bold hover:text-lg group hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent relative">About
          <span className="absolute inset-x-0 bottom-0 h-[3px] rounded bg-teal-600 transform scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-300"></span>
          </a>
        </li>
        <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 font-sans font-semibold rounded hover:font-bold hover:text-lg group hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent relative">Services
          <span className="absolute inset-x-0 bottom-0 h-[3px] rounded bg-teal-600 transform scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-300"></span>
          </a>
        </li>
        <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 font-sans font-semibold rounded hover:font-bold hover:text-lg group hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent relative">Pricing
          <span className="absolute inset-x-0 bottom-0 h-[3px] rounded bg-teal-600 transform scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-300"></span>
          </a>
        </li>
        <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 font-sans font-semibold rounded hover:font-bold hover:text-lg group hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent relative">Contact
          <span className="absolute inset-x-0 bottom-0 h-[3px] rounded bg-teal-600 transform scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-300"></span>
          </a>
        </li>
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img src={toggle ?close : menu} alt="menu" className='w-[28px] h-[28px] object-contain cursor-pointer' onClick={()=>setToggle(!toggle)} />
          <div className={`${!toggle ? 'hidden':'flex'} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
          <ul className="list-none mt-[-3.5rem] flex justify-end items-start flex-col gap-1 w-[8rem] rounded bg-white">
          <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 font-sans font-semibold rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Home</a>
        </li>
        <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 font-sans font-semibold rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
        </li>
        <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 font-sans font-semibold rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
        </li>
        <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 font-sans font-semibold rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
        </li>
        <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 font-sans font-semibold rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
        </li>
        </ul>
          </div>
        </div>
      </div>
    </nav>
    <Hero/>
    </div>

  )
}

export default Header