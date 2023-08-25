import React, { useState } from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';

const Live = () => {
  const [status, setStatus] = useState(localStorage.getItem("isLoggedIn"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const userId=user.user_id;
  const messagesEndRef = useRef(null);
  const [patient, setPatient] = useState();
  const [metrics, setMetrics] = useState([]);
  const [datametrics, setdatametrics] = useState([]);
  const [seriesmetrics, setseriesmetrics] = useState([]);
  const [autoScroll, setAutoScroll] = useState(false);
  const [checkPrevArray, setcheckPrevArray] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [metricArray, setmetricArray] = useState([]);
  const [seriesCount, setseriesCount] = useState([]);
  const tempArray = []
  var flag = 0

  useEffect(() => {
    if (status) {
      console.log(user);

    }
  }, [status]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

async function fetchData(){
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
}

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
    fetchData();
    const tpr = setInterval(fetchData,1000);
    return ()=>{
      clearInterval(tpr)
    }
  }, []);


  return (
    <div className="w-full h-screen flex flex-col items-center">
      <div className="w-full max-w-3xl  bg-white mb-4 flex flex-col items-center">
      <div>
          <p class="max-w-2xl mb-6 font-regular text-black lg:mb-8 md:text-lg lg:text-xl dark:text-black">The below window contains all the data fetched from the device.</p>
        </div>
    <div className="w-full h-screen bg-black text-white p-4 rounded-lg shadow-md mb-4">
      {/* Replace with your log data content */}
      <div
                className="w-full h-full bg-black text-white rounded p-3 overflow-scroll font-mono"
                key={userId}
              >
                <ul>
                  {metrics.map((val, i) => (
                    <li>
                      ${i}: {val.data_id}
                      <ul className="indent-10">
                        <li>{val.device_id}</li>
                        <li>{JSON.stringify(val.series)}</li>
                      </ul>
                    </li>
                  ))}
                  <div ref={messagesEndRef} />
                </ul>
              </div>
    </div>
    </div>
    </div>
  )
}

export default Live
