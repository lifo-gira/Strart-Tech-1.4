import { useState, useEffect } from "react";
import { Routes, useNavigate } from "react-router-dom";
import UserTable from "./UserTable";
import CreateUser from "./CreateUser";
import Dashboard from "./Dashboard";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Profile from './assets/profile.jpg'
import Logo from './assets/logo.png'
import Herobg from './assets/herobg.jpg'
import Diagnostics from './assets/diagnostics.png'
import Live from './assets/cloud.png'
import Diagnostic from './Componenets/Diagnostics'
import Livedata from './Componenets/Live'

const Home = () => {
    const [status, setStatus] = useState(localStorage.getItem("isLoggedIn"));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const navigate = useNavigate();
    const [menuItem, setMenuItem] = useState("users")
    const [userId, setuserId] = useState("")
    const flag = 0;
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [active, setActive] = useState("");

    const toggleDropdown = () => {
        setDropdownVisible(prevVisible => !prevVisible);
    };


    const showToastMessage = () => {
        toast.error('Please select the Patient name', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500
        });
    };

    useEffect(() => {
        if (status) {
            console.log(user);

        }
    }, [status]);

    if (status) {
        return (
            <div>
                <header class="fixed w-full">
                    <nav class="bg-gray-100 border-gray-500 py-1 dark:bg-gray-200">
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
                                                <div>{user.name}</div>
                                                <div className="font-medium truncate">{user.name}@gmail.com</div>
                                            </div>
                                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                                                <li onClick={() => setDropdownVisible(!isDropdownVisible)}>
                                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                                                </li>
                                            </ul>
                                            <div className="py-1">
                                                <a onClick={() => {
                                                    setDropdownVisible(!isDropdownVisible)
                                                    navigate("/");
                                                }}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                                            </div>
                                        </div>)}
                                </div>

                            </div>
                        </div>
                    </nav>
                </header>
                <section class="bg-white dark:bg-white">
                    <div class="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
                        <div class="mr-auto place-self-center lg:col-span-7">
                            <h1 class="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-black">Hello! <br />{user.name}</h1>
                            <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-600">Hope you are feeling good. We appreciate your efforts in keeping yourself healthy by choosing our product.<br /><span className='font-semibold'>Click on the below options</span></p>
                            <div class="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                                <button onClick={() => setActive("diagnostics")} class="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-gray-900 border border-gray-400 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 dark:text-black hover:text-blue-700">
                                    <img src={Diagnostics} className='w-6 h-5 mr-2' /> Diagnostics
                                    {/* <!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --> */}
                                </button>
                                <button onClick={() => setActive("live")} class="inline-flex items-center justify-center w-full px-5 py-3 mb-2 mr-2 text-sm font-medium text-gray-900 bg-white border border-gray-400 rounded-lg sm:w-auto focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-300 ">
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
            //       <div className="bg-gray-900">

            //         <aside
            //           id="default-sidebar"
            //           className="fixed top-0 left-0 z-40 w-44 h-screen"
            //           aria-label="Sidebar"
            //         >
            //           <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800 flex flex-col justify-between">
            //             <ul className="space-y-2 font-medium">
            //               <li>
            //                 <a
            //                 //nClick={()=>setMenuItem("dashboard")}
            //                 onClick={showToastMessage}
            //                   className={`flex items-center p-2 rounded-lg text-white  hover:bg-gray-700 ${menuItem == "dashboard" ? "bg-slate-700" : "bg-slate-800"}`}

            //                 >
            //                   <ToastContainer />
            //                   <svg
            //                     aria-hidden="true"
            //                     className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400  group-hover:text-white"
            //                     fill="currentColor"
            //                     viewBox="0 0 20 20"
            //                     xmlns="http://www.w3.org/2000/svg"
            //                   >
            //                     <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
            //                     <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
            //                   </svg>
            //                   <span className="ml-3">Dashboard</span>
            //                 </a>
            //               </li>

            //               <li></li>
            //               <li>
            //               <a
            //                 onClick={()=>setMenuItem("users")}
            //                   className={`flex items-center p-2 rounded-lg text-white  hover:bg-gray-700 ${menuItem == "users" ? "bg-slate-700" : "bg-slate-800"}`}
            //                 >
            //                   <svg
            //                     aria-hidden="true"
            //                     className="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white"
            //                     fill="currentColor"
            //                     viewBox="0 0 20 20"
            //                     xmlns="http://www.w3.org/2000/svg"
            //                   >
            //                     <path
            //                       fillRule="evenodd"
            //                       d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            //                       clipRule="evenodd"
            //                     ></path>
            //                   </svg>
            //                   <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
            //                 </a>
            //               </li>

            // z
            //               <li>

            //               </li>
            //             </ul>
            //             <div>
            //             <a
            //                   onClick={() => {
            //                     localStorage.setItem("isLoggedIn", false);
            //                     localStorage.setItem("user", null);
            //                     navigate("/");
            //                   }}
            //                   className="flex items-center p-2  rounded-lg text-white hover:bg-gray-700"
            //                 >
            //                   <svg
            //                     aria-hidden="true"
            //                     className="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white"
            //                     fill="currentColor"
            //                     viewBox="0 0 20 20"
            //                     xmlns="http://www.w3.org/2000/svg"
            //                   >
            //                     <path
            //                       fillRule="evenodd"
            //                       d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
            //                       clipRule="evenodd"
            //                     ></path>
            //                   </svg>
            //                   <span className="flex-1 ml-3 whitespace-nowrap">
            //                     Sign Out
            //                   </span>
            //                 </a>
            //             </div>
            //           </div>
            //         </aside>

            //         <div className="p-4 ml-44 h-screen">
            //           <div className="p-4 border-2 h-full border-dashed rounded-lg border-gray-700">
            //            {menuItem === "users" && (
            //             <UserTable switchToDash={setMenuItem} setUserId={setuserId} />
            //            )}
            //            {menuItem === "createUser" && (
            //             <CreateUser />
            //            )}
            //            {menuItem === "dashboard" && (
            //             <Dashboard userId={userId} />
            //            )}
            //           </div>
            //         </div>
            //       </div>
            //     );
        )
    } else {
        return <div>You do not have permission to access this page</div>;
    }
};

export default Home;
