import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, CartesianGrid, Tooltip, XAxis, YAxis, Line, Label } from 'recharts';
import Timer from '../additionals/Timer';
import { useRef } from 'react';

const RealTimeChart = ({ info }) => {
    const [data, setData] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    var [counter, setCounter] = useState(-1);
    const timerRef = useRef();
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    let datacounter = 120,count=2

    // console.log(seriesLength,"length")
    // let counter = 0;
    console.log(info,"check")
    const generateNewDataPoint = () => {
        return counter < info.length ? info[counter] : null;
    };

    const updateChart = () => {
        if(counter===info.length){
            setIsRunning(true);
            setIsTimerRunning(true);
            setCounter(counter);
            clearInterval(timerRef.current);
            setIsButtonEnabled(true)
            return;
        }

        if (counter >= datacounter) {
           
            setIsRunning(true);
            setIsTimerRunning(true);
            setCounter(counter);
            clearInterval(timerRef.current);
            setIsButtonEnabled(true)
            datacounter = 120 * count
            count= count +1
            return;
        }

        counter = counter + 1
        const newDataPoint = generateNewDataPoint();
        setCounter(prevCounter => prevCounter + 1);
        setData(prevData => [...prevData, newDataPoint]);
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
            setCounter(counter);
            clearInterval(timerRef.current);
            timerRef.current = undefined;
        } else {
            setIsRunning(true);
            setIsTimerRunning(true);
            updateChart();
            if (!timerRef.current) {
                timerRef.current = setInterval(updateChart, 1000);
            }

            setTimeout(() => {
                setIsRunning(false);
                setIsTimerRunning(false);
                setCounter(counter);
                clearInterval(timerRef.current);
                timerRef.current = undefined;
                setData([]);
            }, 120000); // 120000 milliseconds = 2 minutes
        }
    };
    

    return (
        <section className='w-full h-full'>
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
                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                    }}
                    labelStyle={{ color: "black" }}
                    />
                <XAxis type="category" dataKey="Temperature">
                <Label dy={5 } value='Time' position='insideBottom' style={{textAnchor: 'middle'}} />
                </XAxis>
                <YAxis>
                <Label angle={-90} value='Tempertaure' position='insideLeft' style={{textAnchor: 'middle'}} />
                </YAxis>
                <Line dataKey="val" fill='black' type="monotone" dot={null} strokeWidth={3} stackId="2" stroke="cyan" />
            </LineChart>
        </ResponsiveContainer>
        {isButtonEnabled ? (
                <button onClick={toggleChart} style={{ color: 'white' }}>
                    {isRunning ? 'Stop' : 'Start'}
                </button>
            ) : (
                <p style={{color:'white'}}>Waiting for 5 seconds...</p>
            )}
</section>
    );
};

export default RealTimeChart;