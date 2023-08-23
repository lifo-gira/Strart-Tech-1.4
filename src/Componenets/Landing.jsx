import React, { useEffect, useState } from 'react'
import Profile from '../assets/profile.jpg'
import Logo from '../assets/logo.png'
import Herobg from '../assets/herobg.jpg'
import Diagnostics from '../assets/diagnostics.png'
import Live from '../assets/cloud.png'
import Diagnostic from './Diagnostics'
import Livedata from './Live'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
    const [status, setStatus] = useState(localStorage.getItem("isLoggedIn"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [active, setActive] = useState("");
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownVisible(prevVisible => !prevVisible);
    };

    useEffect(() => {
        if (status) {
          console.log(user);
          
        }
      }, [status]);
    return (
        <div>
            <header class="fixed w-full">
                <nav class="bg-gray-100 border-gray-500 py-1 dark:bg-gray-900">
                    <div class="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
                        <a href="#" class="flex items-center">
                            <img src={Logo} class="h-6 mr-3 sm:h-9" alt="Landwind Logo" />
                        </a>
                        <div class="flex items-center lg:order-2">
                            <div className='relative'>
                                <button
                                    id="avatarButton"
                                    type="button"
                                    onClick={() => setDropdownVisible(!isDropdownVisible)}
                                    className="w-10 h-10 rounded-full cursor-pointer"
                                >
                                    <img
                                        src={Profile}
                                        alt="User dropdown"
                                        className="object-cover w-full h-full rounded-full"
                                    />
                                </button>
                                {isDropdownVisible && (
                                    <div id="userDropdown" className="absolute top-12 right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                                        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                            <div>{}</div>
                                            <div className="font-medium truncate">bonnie@gmail.com</div>
                                        </div>
                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                                            <li onClick={() => setDropdownVisible(!isDropdownVisible)}>
                                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                                            </li>
                                        </ul>
                                        <div className="py-1">
                                            <a
                                                onClick={() => {
                                                    setDropdownVisible(!isDropdownVisible)
                                                    localStorage.setItem("isLoggedIn", false);
                                                    localStorage.setItem("user", null);
                                                    navigate("/");
                                                }}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                            >
                                                Sign out</a>
                                        </div>
                                    </div>)}
                            </div>
                            
                           
                        </div>
                    </div>
                </nav>
            </header>
            <section class="bg-white dark:bg-gray-900">
                <div class="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
                    <div class="mr-auto place-self-center lg:col-span-7">
                        <h1 class="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">Hello! <br />Bonnie Green</h1>
                        <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Hope you are feeling good. We appreciate your efforts in keeping yourself healthy by choosing our product.<br /><span className='font-semibold'>Click on the below options</span></p>
                        <div class="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                            <button onClick={() => setActive("diagnostics")} class="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white hover:text-blue-700 dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                                <img src={Diagnostics} className='w-6 h-5 mr-2' /> Diagnostics
                                {/* <!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --> */}
                            </button>
                            <button onClick={() => setActive("live")} class="inline-flex items-center justify-center w-full px-5 py-3 mb-2 mr-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:w-auto focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                <img src={Live} className='w-5 h-5 mr-2' /> Live Data
                            </button>
                        </div>
                    </div>
                    <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
                        <img src={Herobg} className='object-cover w-[50rem] h-[25rem]' alt="hero image" />
                    </div>
                </div>
            </section>
            <section>
                {active === "diagnostics" && <Diagnostic />}
                {active === "live" && <Livedata />}
            </section>
        </div>
    )
}

export default Landing
