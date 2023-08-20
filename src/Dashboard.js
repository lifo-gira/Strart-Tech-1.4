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
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Dashboard = ({ height, userId }) => {
  const [patient, setPatient] = useState();
  const [metrics, setMetrics] = useState([]);
  const [datametrics, setdatametrics] = useState([]);
  const [seriesmetrics, setseriesmetrics] = useState([]);
  const messagesEndRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [metricArray, setmetricArray] = useState([]);
  const tempArray=[]

  


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

  const handleSelect = (event) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value)
    setFilteredData(() => {
      const filteredOption = metrics.filter((item) => item.data_id === event.target.value)
      console.log("filtereedoption", filteredOption)
      let temp = filteredOption.map((item) => {
        const series = item.series;
        console.log(series,"ASDAS")

        for (let i = 0; i < series.length; i += 10) {
          const slice = series.slice(i, i + 10);
          const mappedSlice = slice.map((val, index) => ({ index: i + index, val: parseInt(val) }));
          metricArray.push(...mappedSlice);
          // dataArray.push(...mappedSlice.map(item => item.val));
          // indexVal.push(...mappedSlice.map(item => item.index));
        }
        // setmetricArray(tempArray)
        // console.log(metricArray, "HEE")
        return tempArray;
      });
      return temp
    });
  };
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

  return (
    <div className="h-full">
      {patient != null && userId != "" && (
        <div className="overflow-auto h-full">
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div className="flex flex-col items-center justify-start pb-1 pr-5 rounded h-[600px] bg-gray-800" ref={chartRef}>
              <div>
                <select value={selectedOption} onChange={handleSelect}>
                  {metrics.map((item) => (
                    <option value={item.data_id}>
                      {JSON.stringify(item.data_id).slice(1, -1)}
                    </option>
                  ))}
                </select>
              </div>
              <button onClick={downloadAsPdf} style={{color:'white'}}>Download Chart as PDF</button>
              <RealTimeChart info={metricArray} />
              {/* <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredData[0]} className={"mx-auto"}>
                  <CartesianGrid strokeDasharray="6 1 2" horizontal={false} strokeOpacity={0.5} />
                  <Tooltip
                    cursor={false}
                    wrapperStyle={{
                      backgroundColor: 'rgba(0,0,0,.8)',
                      padding: '5px 8px',
                      borderRadius: 4,
                      overflow: 'hidden',
                      boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                    }}
                  />
                  <XAxis dataKey="index" />
                  <YAxis />
                  <Line dataKey="val" type="monotone" dot={null} strokeWidth={3} stackId="2"
                    stroke="green" />

                </LineChart>
              </ResponsiveContainer> */}
            </div>
          </div>

          <div className="flex w-full justify-between">
            <h2 className="text-gray-200 font-bold text-lg mb-3">Raw Logs</h2>
            <button
              className="text-white bg-gray-800 hover:bg-gray-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
              onClick={() => {
                setAutoScroll(() => {
                  return !autoScroll;
                });
              }}
            >
              {autoScroll ? "Auto Scroll Enabled" : "Auto Scroll Disabled"}
            </button>
          </div>
          <div className="flex items-center justify-center h-[280px] mb-4 p-3 rounded bg-gray-800">
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
      )}
      {patient == null && userId != "" && <Spinner />}
    </div>
  );
};

export default Dashboard;
