import React,{useState,useRef} from 'react'
import { json, useNavigate } from "react-router-dom";
import knee from '../assets/knee.jpg';
import kneedoctor from '../assets/kneedoctor.jpg';
import health from '../assets/health.jpg';

const Hero = () => {
  const sectionRef = useRef(null);
  const navigate = useNavigate();

    const [isPopupOpen, setPopupOpen] = useState(false);
  const [code, setCode] = useState('');
  const [isCodeValid, setCodeValid] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setCode('');
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const verifyCode = () => {
    // Implement your code verification logic here
    // For example, check if the code is exactly 10 digits long
    if (code.length === 10 && code=="ST12345678") {
      setCodeValid(true);
      navigate("/login");
      closePopup();
      // Navigate to the next page or perform the desired action here
    } else {
      // Handle invalid code
      setCodeValid(false);
    }
  };


  const scrollToBottom = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section className="bg-gradient-to-r from-sky-50 to-sky-200 text-white py-16" >
      <div className="container mx-auto text-center">
        <h1 className="text-4xl text-black font-bold mb-4">Wearable Assistive Devices</h1>
        <p className="text-lg text-black mb-8">Assistance today, Ability tomorrow</p>
        <button onClick={scrollToBottom} className="bg-transparent font-medium hover:bg-blue-700 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full transition duration-300">
          Check Out All Our Demos
          <span className="ml-2">&#8595;</span>
        </button>
      </div>

      <div className="container mx-auto mt-16 flex flex-wrap justify-center gap-8" ref={sectionRef}>
        {/* Image Templates */}
        <div className=" w-full  sm:w-1/2 md:w-1/3 lg:w-1/4">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <img
              src={knee}
              alt="Template 1"
              className="w-full h-[20rem] object-contain rounded-lg"
            />
            <br />
            <h2 className='text-black text-center font-sans font-semibold text-[1.5rem]'>Knee Accessor</h2>
            <h3 className='text-black text-center font-sans font-semibold text-[1rem]'>Web + App + Hardware Demo</h3>
          </div>
          <div className="container mx-auto mt-8 text-center">
        <button onClick={openPopup} className="bg-blue-700 text-white font-medium py-2 px-6 rounded-full hover:bg-transparent hover:text-blue-700 border border-blue-700 hover:border-blue-700 transition duration-300">
          Visit Demo
        </button>
      </div>
        </div>
        <div className=" w-full  sm:w-1/2 md:w-1/3 lg:w-1/4">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <img
              src={health}
              alt="Template 2"
              className="w-full h-[21.5rem] object-cover rounded-lg"
            />
            <h2 className='text-black text-center font-sans font-semibold text-[1.5rem]'>Health Coach</h2>
            <h3 className='text-black text-center font-sans font-semibold text-[1rem]'>Multi-page Site + Events Calendar</h3>
          </div>
          <div className="container mx-auto mt-8 text-center">
        <button onClick={openPopup} className="bg-blue-700 text-white font-medium py-2 px-6 rounded-full hover:bg-transparent hover:text-blue-700 border border-blue-700 hover:border-blue-700 transition duration-300">
          Visit Demo
        </button>
      </div>
        </div>
        <div className="w-full  sm:w-1/2 md:w-1/3 lg:w-1/4">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <img
              src={kneedoctor}
              alt="Template 3"
              className="w-full h-[21.5rem] object-cover rounded-lg"
            />
            <h2 className='text-black text-center font-sans font-semibold text-[1.5rem]'>Knee Doctor</h2>
            <h3 className='text-black text-center font-sans font-semibold text-[1rem]'>Knee diagnosis by doctor</h3>
          </div>
          <div className="container mx-auto mt-8 text-center">
        <button onClick={openPopup} className="bg-blue-700 text-white font-medium py-2 px-6 rounded-full hover:bg-transparent hover:text-blue-700 border border-blue-700 hover:border-blue-700 transition duration-300">
          Visit Demo
        </button>
      </div>
        </div>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-600 opacity-50"></div>
          <div className="bg-white p-8 rounded-2xl shadow-lg z-50 w-96">
            <h2 className="text-black text-2xl mb-4">Enter Your Device Code</h2>
            <input
              type="text"
              placeholder="Enter code"
              value={code}
              onChange={handleCodeChange}
              className={`w-full border rounded p-2 text-black ${isCodeValid ? 'border-green-600' : 'border-red-500'}`}
            />
            <div className="mt-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
                onClick={verifyCode}
              >
                Verify
              </button>
              <button
                className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full"
                onClick={closePopup}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
    </section>
  )
}

export default Hero