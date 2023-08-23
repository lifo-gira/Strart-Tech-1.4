import React from 'react';
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis} from 'recharts';

//todo: add ResponsiveContainer and fix the page reload ResponsiveContainer width issue

const onlineSignups = [
    {month: 'Jun', count: 3200},
    {month: 'May', count: 1900},
    {month: 'Apr', count: 2600},
    {month: 'Mar', count: 1100},
    {month: 'Feb', count: 1600},
    {month: 'Jan', count: 800},
];

const ActiveUsersChart = ({height}) => {
    return (
        <ResponsiveContainer height={height ? height : 230}>
            <LineChart data={onlineSignups} className={"mx-auto"}>
                <CartesianGrid strokeDasharray="6 1 2" horizontal={false} strokeOpacity={0.5}/>
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
                <XAxis dataKey="month" hide/>
                <Line dataKey="count" type="monotone" dot={null} strokeWidth={3} stackId="2"
                      stroke="yellow"/>

            </LineChart>
        </ResponsiveContainer>
    );
};
/* Todo height prop define */
export default ActiveUsersChart;
