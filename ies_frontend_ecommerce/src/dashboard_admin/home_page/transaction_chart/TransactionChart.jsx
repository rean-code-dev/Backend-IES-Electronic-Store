import React from 'react'
import { BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis,Bar,Rectangle,Area,AreaChart } from 'recharts';
const data = [
    {
        name: 'Jan',
        Expense: 3490,
        Income: 4300,
    },
    {
        name: 'Feb',
        Expense: 3490,
        Income: 4300,
    },
    {
        name: 'Mar',
        Expense: 3490,
        Income: 4300,
    },
    {
        name: 'Apr',
        Expense: 3490,
        Income: 4300,
    },
    {
        name: 'May',
        Expense: 3490,
        Income: 4300,
    },
    {
        name: 'Jun',
        Expense: 3490,
        Income: 4300,
    },
    {
        name: 'Jul',
        Expense: 3490,
        Income: 4300,
    },
    {
        name: 'Set',
        Expense: 3490,
        Income: 4300,
    },
    {
        name: 'Oct',
        Expense: 3490,
        Income: 4300,
    },
    {
        name: 'Nov',
        Expense: 3490,
        Income: 4300,
    },
    {
        name: 'Dec',
        Expense: 3490,
        Income: 4300,
    },
  ];

  function TransactionChart() {
  return (
   <div className='h-[22rem] bg-white p-4 reounded-sm border border-gray-200 flex flex-col flex-1'>
    <strong className='text-gray-700 font-medium'>Transaction</strong>
     <div className='w-full mt-3 flex-1 text-xs'>
      {/* <ResponsiveContainer width="100%" height="100%">
        <BarChart 
        width="500" 
        height="300" 
        data={data} 
        margin={{
            top: 20, 
            right: 10, 
            left:-10,
            bottom:0
        }}>
            <CartesianGrid strokeDasharray='3 3 0 0' vertical={false}/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Bar dataKey ="Income" fill="#0ea52e9"/>
            <Bar dataKey ="Expense" fill="#ea580c"/>

        </BarChart>
      </ResponsiveContainer> */}
      <AreaChart width={730} height={250} data={data}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis dataKey="name" />
  <YAxis />
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />
  <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
  <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
</AreaChart>
    </div>
   </div>
  )


}
export default TransactionChart