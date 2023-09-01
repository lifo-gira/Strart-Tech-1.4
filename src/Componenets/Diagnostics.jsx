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
  var flag = 0
  localStorage.setItem("lastCount", metricArray.length)
  const [data, setData] = useState([]);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  var [counter, setCounter] = useState(-2);
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
    console.log(metricArray, "metricArraygraph");
    console.log(metricArray.length, "no of elements");
    return metricArray.length > 0 ? metricArray : [];
  };

  const updateChart = () => {
    if (!isRunning) {
      setIsRunning(true);
      setIsTimerRunning(true);
      const newDataPoints = generateNewDataPoint();
      setData(newDataPoints);
      localStorage.setItem("lastCount", newDataPoints.length);
    }
  };

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
    }
  }, [isRunning]);

  const toggleChart = () => {
    if (isRunning) {
      setIsRunning(false);
      setIsTimerRunning(true);
      localStorage.setItem("lastCount", data.length - 2);
    } else {
      setIsRunning(true);
      setIsTimerRunning(true);
      updateChart();

      setTimeout(() => {
        setIsRunning(true);
        setIsTimerRunning(false);
        localStorage.setItem("lastCount", data.length - 2);
      }, 60000); // 60 seconds
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

  // async function sereiesMetrics(data) {
  //   const response = await fetch("https://api-h5zs.onrender.com/metrics", {
  //     method: "POST",
  //     cache: "no-cache",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });
  //   console.log(JSON.stringify(data),"response DATA")
  //   return response.json();
  // }

  function sereiesMetrics(data) {
    const socket = new WebSocket("wss://api-h5zs.onrender.com/ws/metrics");
    // console.log("socket input",data);
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

  useEffect(() => {
    // console.log(user.user_id,"Fetch");
    fetch(`https://api-h5zs.onrender.com/get-user/patient/${userid}`)
      .then((res) => res.json())
      .then((data) => {
        setPatient(data);
        // console.log(data)
        const socket = new WebSocket(`wss://api-h5zs.onrender.com/ws-get-user/patient/${userid}`);
        socket.onmessage = (event) => {
          // console.log("Socket")
          const newData = JSON.parse(event.data);
          // console.log(newData.data,"newData")
          sereiesMetrics(newData.data).then((metrics) => {
            setMetrics(metrics);
            // console.log(metrics,"data")
          });
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
            // setdatametrics(metrics.map((item) => item.data_id))
          });
          setInterval(() => {
            sereiesMetrics(newData.data).then((metrics) => {
              setMetrics(metrics);
              // console.log(metrics)
              setFilteredData(() => {
                let temp = metrics.map((item) => {
                  const series = item.series;
                  // console.log(series)
                  seriesCount = metrics.length
                  // console.log("seriesCount",seriesCount)
                  // console.log("flag",flag)
                  //   // console.log("live",item)
                  //   // console.log("flag",flag,seriesCount)
                  //   if(flag===seriesCount-1){
                  //   for (let i = 0; i < series.length; i += 20) {
                  //     // dataCount = dataCount + series.length
                  //     const slice = series.slice(i, i + 10);
                  //     const mappedSlice = slice.map((val, index) => ({ index: i + index, val: parseFloat(val) }));
                  //     // console.log("mappedSlice",mappedSlice)
                  //     setmetricArray(mappedSlice)
                  //     // console.log("flag",flag,seriesCount)
                  //     // if (flag < seriesCount) {
                  //     // metricArray.push(...mappedSlice)
                  //     console.log("metrics",metricArray)
                  //   //   flag = flag + 1
                  //   // }
                  // }
                  const mappedData = series.map((val, index) => ({ index, val: parseFloat(val) }));
                  setmetricArray(mappedData)
                  // metricArray.push(...mappedData);

                  return tempArray;
                });
                return temp
              });
            });
          }, 1000);
        };
        return () => {
          socket.close();
        };
        // sereiesMetrics(data.data).then((metrics) => {
        //   setMetrics(metrics);
        //   console.log(metrics,"data")
        // });
        // fetchMetrics(data.data).then((metrics) => {
        //   setMetrics(metrics);
        //   seriesCount.push(metrics.length)
        //   // console.log(flag,"flag")
        //   for (var i = 0; i < metrics.length; i++) {
        //     if (metrics[i].series != "")
        //       for (var j = 0; j < metrics[i].series.length; j++) {
        //         seriesmetrics.push(parseFloat(metrics[i].series[j]))
        //       }
        //   }
        //   setseriesmetrics(seriesmetrics)
        //   setdatametrics(metrics.map((item) => item.data_id))
        // });
        // setInterval(() => {
        //   fetchMetrics(data.data).then((metrics) => {
        //     setMetrics(metrics);
        //     setFilteredData(() => {
        //       let temp = metrics.map((item) => {
        //         const series = item.series;
        //         // console.log(series,"ASDAS")
        //         if (flag < seriesCount[seriesCount.length - 1]) {
        //           for (let i = 0; i < series.length; i += 10) {
        //             dataCount = dataCount + series.length
        //             const slice = series.slice(i, i + 10);
        //             const mappedSlice = slice.map((val, index) => ({ index: i + index, val: parseFloat(val) }));
        //             console.log(slice, "mapped")
        //             metricArray.push(...mappedSlice)
        //             // setmetricArray(mappedSlice)
        //             // metricArray.push(...mappedSlice);
        //             // console.log(metricArray,"metric")
        //           }
        //           flag = flag + 1
        //         }
        //         // console.log(dataCount,"metrics")
        //         return tempArray;
        //       });
        //       return temp
        //     });
        //   });
        // }, 5000);
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

                LabelStyle={{ color: 'black' }}
                itemStyle={{ color: 'black' }}
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
