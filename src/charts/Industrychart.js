import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data1 = [
  { month: "Disease1", val: 76 },
  { month: "Disease2", val: 63 },
  { month: "Disease3", val: 30 },
  { month: "Disease4", val: 45 },
  { month: "Disease5", val: 72 },
  { month: "Disease6", val: 95 },
];

const Industrychart = () => (
  <>
      <ResponsiveContainer width="100%" height={276}>
        <BarChart
          data={data1}
          margin={{ top: 0, right: 0, left: -35, bottom: 0 }}
        >
          <XAxis
            dataKey="month"
            stroke="white"
            tickLine={false}
            style={{
              fontSize: "10.6222px",
              fontWeight: 400,
              color: "#000000",
              letterSpacing: "0.354072px",
            }}
            minTickGap={-100}
          />
          <YAxis
            tickLine={false}
            stroke="white"
            style={{
              fontSize: "10.6222px",
              fontWeight: 400,
              color: "#000000",
              letterSpacing: "0.354072px",
            }}
          />
          <CartesianGrid vertical={false} />
          <Tooltip labelStyle={{ color: "black" }} cursor={false} />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="val" barSize={26} fill={"#52D452"} />
        </BarChart>
      </ResponsiveContainer>
  </>
);

export default Industrychart;
