import React, { useState, useEffect, useRef } from 'react'
import Graph from '../assets/graph.png'
import RealTimeChart from '../charts/RealTimeChart';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ResponsiveContainer, LineChart, CartesianGrid, Tooltip, XAxis, YAxis, Line, Label } from 'recharts';
import Timer from '../additionals/Timer';
import { ToastContainer, toast } from 'react-toastify';


const Diagnostics = (values) => {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(120); // 2 minutes in seconds
  const [downloadEnabled, setDownloadEnabled] = useState(false);
  const [status, setStatus] = useState(localStorage.getItem("isLoggedIn"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [metrics, setMetrics] = useState([]);
  const messagesEndRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState(false);
  var flag = 0

  localStorage.setItem("lastCount", values.values.length)
  const [data, setData] = useState([]);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  var [counter, setCounter] = useState(-2);
  const timerRef = useRef();
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  function showToastMessage() {
    toast.error('No more datas to be found', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1500
    });
  };
  console.log(values.values, "metricArray")
  const generateNewDataPoint = () => {

    console.log(values.values, "metricArraygraph")
    console.log(counter, "counter")
    console.log(values.values.length, "no of elemetns")
    return counter < values.values.length ? values.values[counter] : null;
  };

  const updateChart = () => {
    if (counter >= values.values.length) {
      if (flag < 2) {
        setIsTimerRunning(true);
        showToastMessage();
        flag += 1
      }
      setCounter(counter - 1)
      return
    }

    if (!isRunning) {
      setIsRunning(true);
      setIsTimerRunning(true);
      if (counter < values.values.length)
        counter = counter + 1
      const newDataPoint = generateNewDataPoint();
      setCounter(prevCounter => prevCounter + 1);
      setData(prevData => [...prevData, newDataPoint]);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsButtonEnabled(true);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (isRunning) {
      updateChart();
      const interval = setInterval(updateChart, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [isRunning]);

  const toggleChart = () => {
    if (isRunning) {
      setIsRunning(false);
      setIsTimerRunning(false);
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    } else {
      setIsRunning(true);
      setIsTimerRunning(true);
      // setCounter(counter-1)

    updateChart();
      if (!timerRef.current) {
        timerRef.current = setInterval(updateChart, 1000);
      }

      setTimeout(() => {
        setIsRunning(false);
        setIsTimerRunning(false);
        clearInterval(timerRef.current);
        timerRef.current = undefined;
        localStorage.setItem("lastCount", counter - 2);
      }, 60000); // 120000 milliseconds = 2 minutes
      flag = 0
      setData([]);
    }
  };

  const [isDropdownVisible, setDropdownVisible] = useState(false);

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

  useEffect(() => {
    if (autoScroll) {
      scrollToBottom();
    }
  }, [metrics]);


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

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setProgress((prevProgress) => prevProgress + (100 / timer));
        // console.log("Progress",progress);
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, timer]);

  useEffect(() => {
    if (timer <= 0) {
      setIsRunning(false);
      setDownloadEnabled(true);
    }
  }, [timer]);

  const startTimer = () => {
    setIsRunning(true);
    setProgress(0);
    setDownloadEnabled(false);
    setTimer(120); // Reset timer to 2 minutes
  };

  const stopTimer = () => {
    setIsRunning(false);
    setProgress(0);
    setDownloadEnabled(true);
  };

  const downloadGraph = () => {
    // Replace this with actual logic to download the graph image
    alert('Download the graph image here');
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full h-full  bg-white p-6 mb-4 flex flex-col items-center">
        <ToastContainer
          position="top-right"
          autoClose={7000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Same as */}
        <ToastContainer />
        <div>
          <p class="max-w-2xl mb-6 font-regular text-black lg:mb-8 md:text-lg lg:text-xl dark:text-black">You can start your graph by Clicking on the <span className='font-bold text-green-700'>Start button</span> below once the graph is generated you will be able to download it by clicking on <span className='font-bold text-blue-500'>Download button</span> below.<br /><span className='font-bold'>Note:</span>You can generate the graph upto 1 minute only. If multiple graphs needed you can repeat the same process.</p>
        </div>
        <div className="flex flex-col items-center justify-start pb-1 pr-5 rounded w-full h-[600px] bg-white-800" ref={chartRef}>

          {isTimerRunning && <Timer />}
          <ResponsiveContainer width="100%" height="80%">
            <LineChart data={data} className={"mx-auto"}>

              <Tooltip
                cursor={false}
                wrapperStyle={{
                  backgroundColor: 'transparent',
                  padding: '5px',
                  borderRadius: 4,
                  overflow: 'hidden',
                  fill: 'black',
                  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                }}

                LabelStyle={{ color: 'black' }}
                itemStyle={{ color: 'black' }}
              />
              <XAxis dataKey="index" type="category">
            <Label dy={5} value='Time' position='insideBottom' style={{ textAnchor: 'middle' }} tick={{ fill: 'black' }} />
          </XAxis>
              <YAxis>
                <Label angle={-90} value='Angle' position='insideLeft' style={{ textAnchor: 'middle' }} tick={{ fill: 'black' }} />
              </YAxis>
              <Line dataKey="val" fill='black' type="monotone" dot={{ fill: 'red', r: 5 }} strokeWidth={3} stackId="2" stroke="cyan" />
            </LineChart>
          </ResponsiveContainer>


        </div>
        {isButtonEnabled ? (
          <button onClick={toggleChart} style={{ color: 'black', border: "2px solid black", padding: '5px', borderRadius: "25px" }}>
            {isRunning ? 'Stop' : 'Start'}
          </button>
        ) : (
          <p style={{ color: 'black' }}>Waiting for 5 seconds...</p>
        )}
        <br></br>
        <button onClick={downloadAsPdf} style={{ color: 'black', border: "2px solid black", padding: '5px', borderRadius: "25px" }} disabled={isRunning}>Download Chart as PDF</button>
      </div>

    </div>

  )
}

export default Diagnostics