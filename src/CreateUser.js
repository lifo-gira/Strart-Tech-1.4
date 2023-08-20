import { useState, useEffect } from "react";
import Spinner from "./assets/Spinner";

function CreateUser() {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState();

  const [status, setStatus] = useState();

  useEffect(() => {
    fetch("https://api-h5zs.onrender.com/get-all-user/doctor")
      .then((res) => res.json())
      .then((data) => setDoctors(data));

      setSelectedDoc(doctors[0])
  }, []);

  function createPatient() {
    const data = {
        type: "patient",
        name: name, 
        user_id: userName, 
        password: password, 
        data: [],
        videos: [],
        doctor: selectedDoc.user_id
    }
    console.log(data.user_id)
    console.log(JSON.stringify(data))
    setStatus(<Spinner />)

    let options = {
        method: "POST",
	    mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
    fetch("https://api-h5zs.onrender.com/create-patient", options)
    .then((res)=>{console.log(res)})
    .then((data)=>{
        console.log(data)
        setStatus(<h3 className="text-white">User Created successfully</h3>)
    })
    .catch((error)=> {
        console.log(error)
        setStatus(<h3 className="text-[#f25353]">Error occured while creating the user</h3>)
    })
  }
  return (
    <div className="flex flex-col h-screen justify-center text-center items-center">
      <form className="w-[500px]">
      <input
          type="text"
          id="name"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-10 "
          placeholder="Patient Name"
          onChange={(e) => {
            setName(e.target.value);
            setStatus(null);
          }}
          required
        />
        <input
          type="text"
          id="userName"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-10 "
          placeholder="User Name"
          onChange={(e) => {
            setuserName(e.target.value);
            setStatus(null);
          }}
          required
        />

        <input
          type="password"
          id="password"
          className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-10"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
            setStatus(null);
          }}
          required
        />
        <label
          for="countries"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Doctor Assigned for the patient
        </label>
        <select
        onChange={(e)=>setSelectedDoc(e.target.value)}
          id="doctors"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {doctors.map((val, i) => {
            return <option value={val.user_id}>{val.name}</option>;
          })}
        </select>
        <button
          type="button"
          class="text-gray-900 mt-4 border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-10 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          onClick={() => {
            if (password != "" && userName != "" && name!="") {
                createPatient()
            } else {
              setStatus(
                <h3 className="text-white">Please fill out all the fields</h3>
              );
            }
          }}
        >
          Submit
        </button>
      </form>
      <div className="flex flex-row justify-center w-full h-10 p-2">
        {status}
      </div>
    </div>

  );
}

export default CreateUser;
