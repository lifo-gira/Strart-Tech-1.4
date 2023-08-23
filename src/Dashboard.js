import { useState, useEffect, useRef } from "react";
import Spinner from "./assets/Spinner";
import Detail from "./Detail";
import Videos from "./Videos";
import Industrypie from "./charts/Industrypie";
import { Carousel } from "bootstrap";
import ReactPlayer from "react-bootstrap";
import Statuschart from "./charts/Statuschart";
import Industrychart from "./charts/Industrychart";
import Sourcechart from "./charts/Sourcechart";
import ActiveUsersChart from "./charts/ActiveUsersChart";
import { json } from "react-router-dom";
import ScrollToBottom, { useAtStart } from "react-scroll-to-bottom";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import RealTimeChart from "./charts/RealTimeChart";
import Profile from './assets/profile.jpg'
import Logo from './assets/logo.png'
import Herobg from './assets/herobg.jpg'
import Diagnostics from './assets/diagnostics.png'
import Live from './assets/cloud.png'
import Diagnostic from './Componenets/Diagnostics'
import Livedata from './Componenets/Live'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Dashboard = ({ height, userId }) => {
  const [status, setStatus] = useState(localStorage.getItem("isLoggedIn"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [patient, setPatient] = useState();
  const [metrics, setMetrics] = useState([]);
  const [datametrics, setdatametrics] = useState([]);
  const [seriesmetrics, setseriesmetrics] = useState([]);
  const messagesEndRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState(false);
  const [checkPrevArray, setcheckPrevArray] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [metricArray, setmetricArray] = useState([]);
  const [seriesCount, setseriesCount] = useState([]);
  const tempArray = []
  var flag = 0

  const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [active,setActive]=useState("");

  const toggleDropdown = () => {
    setDropdownVisible(prevVisible => !prevVisible);
  };

  useEffect(() => {
    if (status) {
      console.log(user);

    }
  }, [status]);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  async function sereiesMetrics(data) {
    const response = await fetch("https://api-h5zs.onrender.com/metrics", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async function fetchMetrics(data) {
    const response = await fetch("https://api-h5zs.onrender.com/metrics", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }


  useEffect(() => {
    if (autoScroll) {
      scrollToBottom();
    }
  }, [metrics]);

  useEffect(() => {
    fetch(`https://api-h5zs.onrender.com/get-user/patient/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setPatient(data);
        sereiesMetrics(data.data).then((metrics) => {
          setMetrics(metrics);
        });
        fetchMetrics(data.data).then((metrics) => {
          setMetrics(metrics);
          seriesCount.push(metrics.length)
          // console.log(flag,"flag")
          for (var i = 0; i < metrics.length; i++) {
            if (metrics[i].series != "")
              for (var j = 0; j < metrics[i].series.length; j++) {
                seriesmetrics.push(parseInt(metrics[i].series[j]))
              }
          }
          setseriesmetrics(seriesmetrics)
          setdatametrics(metrics.map((item) => item.data_id))
        });
        setInterval(() => {
          fetchMetrics(data.data).then((metrics) => {
            setMetrics(metrics);
            setFilteredData(() => {
              let temp = metrics.map((item) => {
                const series = item.series;
                // console.log(series,"ASDAS")
                if (flag < seriesCount[0]) {
                  for (let i = 0; i < series.length; i += 10) {
                    const slice = series.slice(i, i + 10);
                    const mappedSlice = slice.map((val, index) => ({ index: i + index, val: parseInt(val) }));
                    console.log(slice, "mapped")
                    metricArray.push(...mappedSlice);
                    // console.log(metricArray,"metric")
                  }
                  flag = flag + 1
                }
                return tempArray;
              });
              return temp
            });
          });
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      clearInterval();
    };
  }, []);

  const chartRef = useRef(null);
  const downloadAsPdf = async () => {
    try {
      const chartContainer = chartRef.current;

      const canvas = await html2canvas(chartContainer, {
        scale: 2,
      });

      const imgData = canvas.toDataURL('image/jpeg');

      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('chart.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };
  if (status) {
    return (
      // <div className="h-full">
      //   {patient != null && userId != "" && (
      //     <div className="overflow-auto h-full">
      //       <div className="grid grid-cols-1 gap-4 mb-4">
      //         <div className="flex flex-col items-center justify-start pb-1 pr-5 rounded h-[600px] bg-gray-800" ref={chartRef}>
      //           <div>
      //             {/* <select value={selectedOption} onChange={handleSelect}>
      //             {metrics.map((item) => (
      //               <option value={item.data_id}>
      //                 {JSON.stringify(item.data_id).slice(1, -1)}
      //               </option>
      //             ))}
      //           </select> */}
      //           </div>
      //           <RealTimeChart info={metricArray} />
      //           <button onClick={downloadAsPdf} style={{ color: 'white' }}>Download Chart as PDF</button>
      //           {/* <ResponsiveContainer width="100%" height="100%">
      //           <LineChart data={filteredData[0]} className={"mx-auto"}>
      //             <CartesianGrid strokeDasharray="6 1 2" horizontal={false} strokeOpacity={0.5} />
      //             <Tooltip
      //               cursor={false}
      //               wrapperStyle={{
      //                 backgroundColor: 'rgba(0,0,0,.8)',
      //                 padding: '5px 8px',
      //                 borderRadius: 4,
      //                 overflow: 'hidden',
      //                 boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
      //               }}
      //             />
      //             <XAxis dataKey="index" />
      //             <YAxis />
      //             <Line dataKey="val" type="monotone" dot={null} strokeWidth={3} stackId="2"
      //               stroke="green" />

      //           </LineChart>
      //         </ResponsiveContainer> */}
      //         </div>
      //       </div>

      //       <div className="flex w-full justify-between">
      //         <h2 className="text-gray-200 font-bold text-lg mb-3">Raw Logs</h2>
      //         <button
      //           className="text-white bg-gray-800 hover:bg-gray-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
      //           onClick={() => {
      //             setAutoScroll(() => {
      //               return !autoScroll;
      //             });
      //           }}
      //         >
      //           {autoScroll ? "Auto Scroll Enabled" : "Auto Scroll Disabled"}
      //         </button>
      //       </div>
      //       <div className="flex items-center justify-center h-[280px] mb-4 p-3 rounded bg-gray-800">
      //         <div
      //           className="w-full h-full bg-black text-white rounded p-3 overflow-scroll font-mono"
      //           key={userId}
      //         >
      //           <ul>
      //             {metrics.map((val, i) => (
      //               <li>
      //                 ${i}: {val.data_id}
      //                 <ul className="indent-10">
      //                   <li>{val.device_id}</li>
      //                   <li>{JSON.stringify(val.series)}</li>
      //                 </ul>
      //               </li>
      //             ))}
      //             <div ref={messagesEndRef} />
      //           </ul>
      //         </div>
      //       </div>
      //     </div>
      //   )}
      //   {patient == null && userId != "" && <Spinner />}
      // </div>
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
                        onClick={()=>setDropdownVisible(!isDropdownVisible)}
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
                        <div>Bonnie Green</div>
                        <div className="font-medium truncate">bonnie@gmail.com</div>
                    </div>
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                        <li onClick={()=>setDropdownVisible(!isDropdownVisible)}>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                        </li>
                    </ul>
                    <div className="py-1">
                        <a onClick={()=>setDropdownVisible(!isDropdownVisible)} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
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
                <h1 class="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">Hello! <br/>Bonnie Green</h1>
                <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Hope you are feeling good. We appreciate your efforts in keeping yourself healthy by choosing our product.<br/><span className='font-semibold'>Click on the below options</span></p>
                <div class="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                    <button onClick={()=>setActive("diagnostics")} class="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white hover:text-blue-700 dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                        <img src={Diagnostics} className='w-6 h-5 mr-2' /> Diagnostics 
                        {/* <!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --> */}
                    </button> 
                    <button onClick={()=>setActive("live")} class="inline-flex items-center justify-center w-full px-5 py-3 mb-2 mr-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:w-auto focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        <img src={Live} className='w-5 h-5 mr-2' /> Live Data
                    </button>
                </div>
            </div>
            <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
                <img src={Herobg} className='object-cover w-[50rem] h-[25rem]' alt="hero image"/>
            </div>                
        </div>
    </section>
    <section>
        {active==="diagnostics"&&<Diagnostic/>}
        {active==="live"&&<Livedata/>}
    </section>
    </div>
    );
  } else {
    return <div>You do not have permission to access this page</div>;
  }
};

export default Dashboard;
