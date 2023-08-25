import React, { useEffect, useState } from 'react';

const Timer = ({ isRunning }) => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [progress, setProgress] = useState(0);
    const [timerCompleted, setTimerCompleted] = useState(false); // Add this state

    useEffect(() => {
        const timer = setInterval(() => {
            if (minutes === 1 && seconds === 0) {
                clearInterval(timer);
                setTimerCompleted(true); // Set timerCompleted to true
                return;
            }

            setSeconds(prevSeconds => {
                const newSeconds = prevSeconds + 1;
                if (newSeconds === 60) {
                    setMinutes(prevMinutes => prevMinutes + 1);
                    return 0;
                }
                return newSeconds;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [minutes, seconds]);

    useEffect(() => {
        if (timerCompleted){
           return;
         } // No need to update progress if timer is completed

        const totalSeconds = minutes * 60 + seconds;
        const totalDuration = 1 * 60; // Total duration in seconds (2 minutes)
        const calculatedProgress = (totalSeconds / totalDuration) * 100;
        setProgress(calculatedProgress);
    }, [minutes, seconds, timerCompleted]);

    if (timerCompleted) {
        return null; // Return null to hide the timer and progress bar
    }

    return (
        <div style={{ width: '80%', margin: '0 auto' }}>
            <h2 style={{ color: 'black' }}>
                {minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}
            </h2>
            <progress
                value={progress}
                max="100"
                style={{
                    width: '100%',
                    height: '20px',
                    background: 'black',
                    borderRadius: '10px',
                    overflow: 'hidden',
                }}
            ></progress>
            <style>
                {`
                    progress::-webkit-progress-value {
                        background-color: cyan;
                    }
                `}
            </style>
        </div>
    );
};

export default Timer;
