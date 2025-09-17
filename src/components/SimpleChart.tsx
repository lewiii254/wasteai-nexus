import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

// Simple wrapper components to avoid the complex chart.tsx issues
export const SimpleBarChart = ({ data, dataKeys, colors }: {
  data: any[];
  dataKeys: { key: string; name: string; color: string }[];
  colors?: string[];
}) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
      <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
      <YAxis stroke="hsl(var(--muted-foreground))" />
      <Tooltip 
        contentStyle={{
          backgroundColor: 'hsl(var(--background))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '8px'
        }}
      />
      {dataKeys.map((key) => (
        <Bar 
          key={key.key}
          dataKey={key.key} 
          fill={key.color} 
          name={key.name} 
          radius={[4, 4, 0, 0]} 
        />
      ))}
    </BarChart>
  </ResponsiveContainer>
);

export const SimpleLineChart = ({ data, dataKey, color, name }: {
  data: any[];
  dataKey: string;
  color: string;
  name: string;
}) => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
      <YAxis stroke="hsl(var(--muted-foreground))" />
      <Tooltip 
        contentStyle={{
          backgroundColor: 'hsl(var(--background))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '8px'
        }}
      />
      <Line 
        type="monotone" 
        dataKey={dataKey} 
        stroke={color} 
        strokeWidth={3}
        dot={{ fill: color, strokeWidth: 2, r: 6 }}
        name={name}
      />
    </LineChart>
  </ResponsiveContainer>
);

export const SimplePieChart = ({ data }: {
  data: { name: string; value: number; color: string }[];
}) => (
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={80}
        dataKey="value"
        label={({ name, value }) => `${name}: ${value}%`}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
);