import { useState, useEffect } from "react";
import { Routes, useNavigate } from "react-router-dom";
import UserTable from "./UserTable";
import CreateUser from "./CreateUser";
import Dashboard from "./Dashboard";
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [status, setStatus] = useState(localStorage.getItem("isLoggedIn"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();
  const [menuItem, setMenuItem] = useState("users")
  const [userId, setuserId] = useState("")
  const flag=0;
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
      <div className="bg-gray-900">

        <aside
          id="default-sidebar"
          className="fixed top-0 left-0 z-40 w-44 h-screen"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800 flex flex-col justify-between">
            <ul className="space-y-2 font-medium">
              <li>
                <a
                //nClick={()=>setMenuItem("dashboard")}
                onClick={showToastMessage}
                  className={`flex items-center p-2 rounded-lg text-white  hover:bg-gray-700 ${menuItem == "dashboard" ? "bg-slate-700" : "bg-slate-800"}`}
                  
                >
                  <ToastContainer />
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400  group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg>
                  <span className="ml-3">Dashboard</span>
                </a>
              </li>

              <li></li>
              <li>
              <a
                onClick={()=>setMenuItem("users")}
                  className={`flex items-center p-2 rounded-lg text-white  hover:bg-gray-700 ${menuItem == "users" ? "bg-slate-700" : "bg-slate-800"}`}
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
                </a>
              </li>

              <li>
              {/* <a
                onClick={()=>setMenuItem("createUser")}
                  className={`flex items-center p-2 rounded-lg text-white  hover:bg-gray-700 ${menuItem == "createUser" ? "bg-slate-700" : "bg-slate-800"}`}
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                      clipRule="evenodd"
                    ></path>
                  </svg> */}
                  {/* <span className="flex-1 ml-3 whitespace-nowrap">
                    Create User
                  </span> */}
                {/* </a> */}
              </li>
              <li>
                
              </li>
            </ul>
            <div>
            <a
                  onClick={() => {
                    localStorage.setItem("isLoggedIn", false);
                    localStorage.setItem("user", null);
                    navigate("/");
                  }}
                  className="flex items-center p-2  rounded-lg text-white hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Sign Out
                  </span>
                </a>
            </div>
          </div>
        </aside>

        <div className="p-4 ml-44 h-screen">
          <div className="p-4 border-2 h-full border-dashed rounded-lg border-gray-700">
           {menuItem === "users" && (
            <UserTable switchToDash={setMenuItem} setUserId={setuserId} />
           )}
           {menuItem === "createUser" && (
            <CreateUser />
           )}
           {menuItem === "dashboard" && (
            <Dashboard userId={userId} />
           )}
          </div>
        </div>
      </div>
    );
  } else {
    return <div>You do not have permission to access this page</div>;
  }
};

export default Home;
