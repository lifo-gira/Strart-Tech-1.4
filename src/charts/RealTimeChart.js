import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, CartesianGrid, Tooltip, XAxis, YAxis, Line } from 'recharts';

const RealTimeChart = ({ info }) => {
    const [data, setData] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    let counter =0;
    const generateNewDataPoint = () => {
        return counter === undefined ? undefined : info[counter];
    };

    const updateChart = () => {
        const newDataPoint = generateNewDataPoint();
        counter=counter+1;
        setData(prevData => [...prevData, newDataPoint]);
        
    };

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
        setIsRunning(prevIsRunning => !prevIsRunning);
        if (!isRunning) {
            counter = 0;
            updateChart();
        }
    };

    return (
        <>
        <button onClick={toggleChart} style={{color:'white'}}>
                {isRunning ? 'Stop' : 'Start'}
            </button>
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} className={"mx-auto"}>

                <Tooltip
                    cursor={false}
                    wrapperStyle={{
                        backgroundColor: 'transparent',
                        padding: '5px 8px',
                        borderRadius: 4,
                        overflow: 'hidden',
                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                    }}
                    />
                <XAxis dataKey="index" />
                <YAxis />
                <Line dataKey="val" type="monotone" dot={null} strokeWidth={3} stackId="2" stroke="green" />
            </LineChart>
        </ResponsiveContainer>
</>
    );
};

export default RealTimeChart;
