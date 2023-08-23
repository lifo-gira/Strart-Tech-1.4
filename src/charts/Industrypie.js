import React from "react";
import { ResponsiveContainer, Tooltip, Cell, Pie, PieChart } from "recharts";

const piedata = [
  { name: "Group 1", value: 20 },
  { name: "Group 2", value: 10 },
  { name: "Group 3", value: 15 },
  { name: "Group 4", value: 13 },
  { name: "Group 5", value: 7 },
  { name: "Group 6", value: 21 },
  { name: "Group 7", value: 14 },
];

const COLORS = [
  "#9013FE",
  "#007AFF",
  "#C26DBC",
  "#112A46",
  "#FB8832",
  "#E43D40",
  "#E6E5E6",
];

const Industrypie = () => {
  return (
    <>
      

        <ResponsiveContainer width="100%" height={256}>
          <PieChart>
            <Pie
              stroke="white"
              dataKey="value"
              data={piedata}
              labelLine={false}
              outerRadius={100}
              fill={"#1e88e5"}
              startAngle={90}
              endAngle={-450}
            >
              {piedata.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                  stroke={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              labelStyle={{ color: "black" }}
              itemStyle={{ color: "black" }}
              cursor={false}
            />
          </PieChart>
          
        </ResponsiveContainer>
    </>
  );
};

export default Industrypie;
