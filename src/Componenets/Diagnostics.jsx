import React, { useState, useEffect, useRef } from 'react'
import Graph from '../assets/graph.png'
import RealTimeChart from '../charts/RealTimeChart';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ResponsiveContainer, LineChart, CartesianGrid, Tooltip, XAxis, YAxis, Line, Label } from 'recharts';
import Timer from '../additionals/Timer';
import { toast } from 'react-toastify';


const Diagnostics = () => {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(120); // 2 minutes in seconds
  const [downloadEnabled, setDownloadEnabled] = useState(false);
  const [status, setStatus] = useState(localStorage.getItem("isLoggedIn"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const userid = user.user_id;
  // console.log(user.user_id,"user")
  const [patient, setPatient] = useState();
  const [metrics, setMetrics] = useState([]);
  const [datametrics, setdatametrics] = useState([]);
  const [seriesmetrics, setseriesmetrics] = useState([]);
  const messagesEndRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState(false);
  const [checkPrevArray, setcheckPrevArray] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [metricArray, setmetricArray] = useState([]);
  const [tempArr, settempArr] = useState([]);
  var seriesCount;
  const [counterValue, setCounterValue] = useState(0);
  const tempArray = []
  const tempCount = 0
  var dataCount = 0
  var flag =0
  var x=0
  
  localStorage.setItem("lastCount",7575)
  const [data, setData] = useState([]);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  var [counter, setCounter] = useState(parseInt(localStorage.getItem("lastCount")));
  const timerRef = useRef();
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  let datacounter = 60, count = 2
  function showToastMessage() {
    toast.error('No more datas to be found', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1500
    });
  };
  
  
  const generateNewDataPoint = () => {
    console.log("metricArraygraph",metricArray)
    console.log(counter,"counter")
    console.log(metricArray.length, "no of elemetns")
    return counter < metricArray.length ? metricArray[counter] : null;
  };
  
  const updateChart = () => {
    if (counter == metricArray.length) {
      const x= metricArray.length
      // setmetricArray([])
      // console.log(metricArray.length, "no of elemetns in end")
      localStorage.setItem("lastCount", counter*2)
      window.alert('No more datas to be found')
      setIsRunning(false);
      setIsTimerRunning(false);
      setCounter(prevCounter => prevCounter + 1);

      clearInterval(timerRef.current);
      setIsButtonEnabled(true)
      return;
    }
    if (!isRunning) {
      setIsRunning(true);
      setIsTimerRunning(true);
      counter = counter + 1
      // console.log(counter, "counter")
      // setCounter(counter)
      localStorage.setItem("lastCount", 0)
      const newDataPoint = generateNewDataPoint();
      setCounter(prevCounter => prevCounter + 1);
      setData(prevData => [...prevData, newDataPoint]);
    }
    localStorage.setItem("lastCount", 0)
  };
  
  
  //   useEffect(() => {
    //     // console.log("updateChart", flag)
    //     counter = 0;
    //     updateChart();
    //     const interval = setInterval(updateChart, 1000);
    //     return () => {
      //       counter = undefined;
      //       clearInterval(interval)
      //     };
      // }, []);
      
      useEffect(() => {
        const timer = setTimeout(() => {
          setIsButtonEnabled(true);
    }, 7000);
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
      localStorage.setItem("lastCount", 0);
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
        localStorage.setItem("lastCount", 0);
      }, 60000); // 120000 milliseconds = 2 minutes
      setData([]);
    }
  };



  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [active, setActive] = useState("");

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

  function sereiesMetrics(data) {
    const socket = new WebSocket("wss://api-h5zs.onrender.com/ws/metrics");
  // console.log("socket input",data)
    return new Promise((resolve, reject) => {
      socket.onopen = () => {
        // console.log("WebSocket connection opened");
        socket.send(JSON.stringify(data));
      };
  
      socket.onmessage = (event) => {
        const res = JSON.parse(event.data);
        // console.log("Received:", res);
        socket.close();
        resolve(res);
      };
  
      socket.onerror = (event) => {
        console.error("WebSocket error:", event);
        socket.close();
        reject(event);
      };
  
      socket.onclose = () => {
        // console.log("WebSocket connection closed");
      };
    });
  }

  // function fetchMetrics(data) {
  //   const socket = new WebSocket("wss://api-h5zs.onrender.com/ws/metrics");
  
  //   return new Promise((resolve, reject) => {
  //     socket.onopen = () => {
  //       console.log("WebSocket connection opened");
  //       socket.send(JSON.stringify(data));
  //     };
  
  //     socket.onmessage = (event) => {
  //       const res = JSON.stringify(data);
  //       // console.log("Received:", res);
  //       socket.close();
  //       resolve(res);
  //     };
  
  //     socket.onerror = (event) => {
  //       console.error("WebSocket error:", event);
  //       socket.close();
  //       reject(event);
  //     };
  
  //     socket.onclose = () => {
  //       console.log("WebSocket connection closed");
  //     };
  //   });
  // }
  


  useEffect(() => {
    if (autoScroll) {
      scrollToBottom();
    }
  }, [metrics]);

var countCtr = 0

  function GraphValue(series){
    // console.log("if out",series)
    // if (flag < seriesCount) {
      // console.log("if in",series,flag,seriesCount)
      // if(flag===seriesCount-1){
        // setmetricArray([])
        for (let i = 0; i < series.length; i += 20) {
        dataCount = dataCount + series.length
        const slice = series.slice(i, i + 10);
        const mappedSlice = slice.map((val, index) => ({ index: i + index, val: parseFloat(val) }));
        localStorage.setItem("lastCount",0)
        // console.log("counter graph",localStorage.getItem("lastCount"))
        // console.log("mappedSlice",mappedSlice)
        // setmetricArray(mappedSlice)
        metricArray.push(...mappedSlice)
        // console.log("metricarray",metricArray)
        // setmetricArray([])
      // }
    }
      // flag = flag + 1
    // }
    return metricArray

  }

var ctr=0

  useEffect(() => {
    // console.log(user.user_id,"Fetch");
    fetch(`https://api-h5zs.onrender.com/get-user/patient/${userid}`)
      .then((res) => res.json())
      .then((data) => {
        setPatient(data);
        const socket = new WebSocket(`wss://api-h5zs.onrender.com/ws-get-user/patient/${userid}`);
        const initialSeriesMetrics = [];
        socket.onmessage = (event) => {
          // console.log("Socket")
          const newData = JSON.parse(event.data);
          // console.log(newData.data,"newData")
        sereiesMetrics(newData.data).then((metrics) => {
          setMetrics(metrics);
          // console.log(metrics)
          seriesCount = metrics.length
          // console.log(metrics,"metric")
          for (var i = 0; i < metrics.length; i++) {
            if (metrics[i].series != "")
              for (var j = 0; j < metrics[i].series.length; j++) {
                seriesmetrics.push(parseFloat(metrics[i].series[j]))
              }
            }
            // console.log(seriesmetrics,"seriesmetrics")
          setseriesmetrics(seriesmetrics)
          setdatametrics(metrics.map((item) => item.data_id))
        });
        setInterval(() => {
          sereiesMetrics(newData.data).then((metrics) => {
            setMetrics(metrics);
            // console.log(metrics.length,"metrics.length")
            // console.log(ctr,"ctr")
            if(ctr<metrics.length){
              ctr=metrics.length
              // console.log("metrics",metrics)
              // console.log("ctr",ctr)
            setFilteredData(() => {
              let temp = metrics.map((item) => {
                const series = item.series;
                seriesCount = metrics.length
                // console.log(series,x+=1,"seiries")
                localStorage.setItem("lastCount",0)
                // console.log("counter fetch",localStorage.getItem("lastCount"))
                GraphValue(series);
                // console.log(dataCount,"metrics")
              });
              return temp
            });
          }
          });
        }, 1000);
        };
        return () => {
          socket.close();
        };
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
                    
                    LabelStyle= {{ color: 'black' }}
                    itemStyle= {{ color: 'black' }} 
                    />
              <XAxis type="category" dataKey="Temperature">
                <Label dy={5} value='Time' position='insideBottom' style={{ textAnchor: 'middle' }} tick={{ fill: 'black' }} />
              </XAxis>
              <YAxis>
                <Label angle={-90} value='Angle' position='insideLeft' style={{ textAnchor: 'middle' }} tick={{ fill: 'black' }} />
              </YAxis>
              <Line dataKey="val" fill='black' type="monotone" dot={{ fill: 'red', r: 5 }} strokeWidth={3} stackId="2" stroke="cyan" />
            </LineChart>
          </ResponsiveContainer>
          {isButtonEnabled ? (
            <button onClick={toggleChart} style={{ color: 'black', border: "2px solid black", padding: '5px', borderRadius: "25px" }}>
              {isRunning ? 'Stop' : 'Start'}
            </button>
          ) : (
            <p style={{ color: 'black' }}>Waiting for 7 seconds...</p>
          )}
          <br></br>
          <button onClick={downloadAsPdf} style={{ color: 'black', border: "2px solid black", padding: '5px', borderRadius: "25px" }} disabled={isRunning}>Download Chart as PDF</button>
        </div>
      </div>

    </div>

  )
}

export default Diagnostics
