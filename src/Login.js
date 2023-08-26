import { useState, useEffect } from "react";
import { json, useNavigate } from "react-router-dom";
import Spinner from "./assets/Spinner";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'
import Cover from './assets/cover.jpg'
import Google from './assets/googlelogo.png'

const Login = () => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState();
  const navigate = useNavigate();

  async function login() {
    setStatus(<Spinner />);
    const data = new URLSearchParams();
    data.append("user_id", userName);
    data.append("password", password);
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    await fetch("https://api-h5zs.onrender.com/login?" + data, options)
      .then((res) => res.json())
      .then((data) => {
        if (data == null) {
          setStatus(<h3 className="text-[#bf2f2f]">Invalid Credentials</h3>);
        } else {
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("user", JSON.stringify(data));
          console.log(JSON.stringify(data));
          localStorage.getItem("user");
          navigate("/home");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div class="w-full min-h-screen flex items-start' bg-gray-100">
      <div
        class="w-full relative flex flex-col bg-gradient-to-r from-transparent to-cyan-500  md:flex-row md:space-y-0"
      >

        <div class="flex flex-col justify-center p-8 md:p-14">
          <span class="mb-3 text-4xl font-bold">Welcome back</span>
          <span class="font-regular text-gray-600 mb-8">
            Welcome back! Please enter your details
          </span>
          <form>
            <div class="py-4">
              <span class="mb-2 text-md">Username</span>
              <input
                type="text"
                id="userName"
                class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="uname"
                onChange={(e) => {
                  setuserName(e.target.value);
                  setStatus(null);
                }}
                required
              />
            </div>
            <div class="py-4">
              <span class="mb-2 text-md">Password</span>
              <input
                type="password"
                id="password"
                name="pass"
                // id="pass"
                class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setStatus(null);
                }}
                required
              />
            </div>
            <div class="flex justify-between w-full py-4">
              <div class="mr-24">
                <input type="checkbox" name="ch" id="ch" class="mr-2" />
                <span class="text-md">Remember Me</span>
              </div>
              <span class="font-bold text-md cursor-pointer">Forgot password</span>
            </div>
            <button
              type="button"
              class="w-full font-bold bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-blue-300"
              onClick={() => {
                if (password != "" && userName != "") {
                  login();
                } else {
                  setStatus(
                    <h3 className="text-white">
                      Type your password and user name
                    </h3>
                  );
                }
              }}
            >
              Sign in
            </button>
            <GoogleOAuthProvider clientId="34802025607-cvh6a07ognvq5u5rms0ff9iak254b90k.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={credentialResponse => {
                  const details = jwt_decode(credentialResponse.credential);
                  console.log(details)
                  console.log(credentialResponse);
                  navigate("/home");
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </GoogleOAuthProvider>
            <div class=" font-regular text-center text-gray-900">
              Dont'have an account?
              <span class="font-bold text-black cursor-pointer">Sign up for free</span>
            </div>
          </form>
          <div className="flex flex-row justify-center w-full h-10 p-2">
            {status}
          </div>
        </div>

        <div class="relative">
          <img
            src={Cover}
            alt="img"
            class="bg-cover h-screen rounded-l-lg md:block object-cover"
          />


        </div>
      </div>
    </div>
  );
};

export default Login;
