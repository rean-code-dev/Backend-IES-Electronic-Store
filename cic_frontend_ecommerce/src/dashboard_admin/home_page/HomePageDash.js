import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Calendar, Package, ShoppingBag, ClipboardX } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Dashboard = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const pieData = [
    { name: "Total Order", value: 10, color: "#D72638" },
    { name: "Customer Growth", value: 30, color: "#1EB980" },
    { name: "Total Revenue", value: 20, color: "#C4A35A" },
  ];

  const lineData = [
    { name: "Sunday", value: 0 },
    { name: "Monday", value: 0 },
    { name: "Tuesday", value: 0 },
    { name: "Wednesday", value: 10 },
    { name: "Thursday", value: 30 },
    { name: "Friday", value: 50 },
    { name: "Saturday", value: 10 },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start Date"
            className="px-4 py-2 border rounded-lg"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="End Date"
            className="px-4 py-2 border rounded-lg"
          />
          <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
            <Calendar size={20} />
            Filter Date
          </button>
        </div>
      </div>
      <p className="text-gray-500">Hi, uat01. Welcome back to Red Ant Express Admin!</p>

      <div className="grid grid-cols-4 gap-4 mt-6">
        {[ 
          { icon: <ClipboardX className="text-red-500" size={32} />, label: "Total Orders", value: 40 },
          { icon: <Package className="text-green-500" size={32} />, label: "Total Delivered", value: 18 },
          { icon: <ClipboardX className="text-red-500" size={32} />, label: "Total Canceled", value: 22 },
          { icon: <ShoppingBag className="text-yellow-500" size={32} />, label: "Total Revenue", value: "$39" },
        ].map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4">
            {item.icon}
            <div>
              <h2 className="text-xl font-semibold">{item.value}</h2>
              <p className="text-gray-500">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Pie Chart</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Chart Order</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={lineData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#007BFF" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;