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
  { month: "Hot", val: 76 },
  { month: "Warm", val: 63 },
  { month: "Cold", val: 30 },
];

const Statuschart = () => (
  <>
      <ResponsiveContainer width="90%" height={300}>
        <BarChart
          data={data1}
          margin={{ top: 0, right: 0, left: -35, bottom: 0 }}
        >
          <XAxis
            dataKey="month"
            tickLine={false}
            stroke="white"
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
          <Bar dataKey="val" barSize={26} fill={"#838BC2"} />
        </BarChart>
      </ResponsiveContainer>
  </>
);

export default Statuschart;
