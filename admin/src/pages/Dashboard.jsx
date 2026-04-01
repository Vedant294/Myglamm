import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { FiTrendingUp, FiAward, FiZap, FiBarChart2 } from "react-icons/fi";
function Dashboard() {
  const [data, setData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [revenueRes, categoryRes] = await Promise.all([
          axios.get(
            `${import.meta.env.VITE_BACKEND_API}/orders/monthly-revenue`
          ),
          axios.get(
            `${import.meta.env.VITE_BACKEND_API}/orders/category-sales`
          ),
        ]);

        setData(revenueRes.data);
        setCategoryData(categoryRes.data);
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate metrics
  const metrics = {
    totalRevenue: data.reduce((sum, item) => sum + (item.totalRevenue || 0), 0),
    totalOrders: data.reduce((sum, item) => sum + (item.totalOrders || 0), 0),
    avgOrderValue:
      data.reduce((sum, item) => sum + (item.totalRevenue || 0), 0) /
      Math.max(
        data.reduce((sum, item) => sum + (item.totalOrders || 0), 1),
        1
      ),
  };

  const MetricCard = ({ color, title, value, prefix = "", suffix = "" }) => (
    <div className="flex-1 min-w-[200px] bg-gray-50 rounded-lg p-4">
      <div className="flex items-center">
        <div className={`w-3 h-3 bg-[${color}] rounded-full mr-3`}></div>
        <span className="text-sm font-medium text-gray-600">{title}</span>
      </div>
      <p className="text-2xl font-bold text-gray-800 mt-2">
        {prefix}
        {value.toLocaleString()}
        {suffix}
      </p>
    </div>
  );

  if (loading) {
    return (
      <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="flex gap-4">
            <div className="h-20 bg-gray-200 rounded flex-1"></div>
            <div className="h-20 bg-gray-200 rounded flex-1"></div>
            <div className="h-20 bg-gray-200 rounded flex-1"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Dashboard Analytics
        </h1>
        <p className="text-gray-500">
          Comprehensive overview of sales performance and category insights
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Sales Performance Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Sales Performance
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Monthly revenue and orders overview
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-3 sm:mt-0">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#8884d8] rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Revenue</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#82ca9d] rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Orders</span>
              </div>
            </div>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f0f0f0"
                  vertical={false}
                />
                <XAxis
                  dataKey="_id"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                  formatter={(value, name) => [
                    name === "totalRevenue"
                      ? `$${value.toLocaleString()}`
                      : value.toLocaleString(),
                    name === "totalRevenue" ? "Revenue" : "Orders",
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="totalRevenue"
                  stroke="#8884d8"
                  strokeWidth={3}
                  dot={{ fill: "#8884d8", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#8884d8" }}
                />
                <Line
                  type="monotone"
                  dataKey="totalOrders"
                  stroke="#82ca9d"
                  strokeWidth={3}
                  dot={{ fill: "#82ca9d", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#82ca9d" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3  gap-4 mt-6 pt-6 border-t border-gray-100">
            <MetricCard
              color="#8884d8"
              title="Total Revenue"
              value={metrics.totalRevenue}
              prefix="$"
            />
            <MetricCard
              color="#82ca9d"
              title="Total Orders"
              value={metrics.totalOrders}
            />
            <MetricCard
              color="#f59e0b"
              title="Avg. Order Value"
              value={metrics.avgOrderValue}
              prefix="$"
            />
          </div>
        </div>

        {/* Category Sales Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Category Performance
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Units sold by product category
              </p>
            </div>
            <div className="flex items-center mt-3 sm:mt-0">
              <div className="w-3 h-3 bg-[#4F46E5] rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Units Sold</span>
            </div>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f0f0f0"
                  vertical={false}
                />
                <XAxis
                  dataKey="_id"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                  formatter={(value) => [`${value} units`, "Units Sold"]}
                />
                <Bar dataKey="totalSold" radius={[6, 6, 0, 0]}>
                  {categoryData.map((entry, index) => {
                    const colors = [
                      "#4F46E5",
                      "#10B981",
                      "#F59E0B",
                      "#EF4444",
                      "#8B5CF6",
                      "#EC4899",
                      "#06B6D4",
                      "#84CC16",
                      "#F97316",
                      "#6366F1",
                    ];
                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Category Legend */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Categories
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {categoryData.slice(0, 6).map((category, index) => {
                const colors = [
                  "#4F46E5",
                  "#10B981",
                  "#F59E0B",
                  "#EF4444",
                  "#8B5CF6",
                  "#EC4899",
                ];
                return (
                  <div key={index} className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: colors[index % colors.length] }}
                    ></div>
                    <span className="text-sm text-gray-600 truncate">
                      {category._id}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Top Category</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {categoryData.length > 0 ? categoryData[0]?._id : "N/A"}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <FiTrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Best Month</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {data.length > 0
                  ? data.reduce(
                      (max, item) =>
                        item.totalRevenue > max.totalRevenue ? item : max,
                      data[0]
                    )._id
                  : "N/A"}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <FiAward className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Avg. Monthly Growth
              </p>
              <p className="text-2xl font-bold text-gray-800 mt-1">+12.5%</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <FiZap className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Conversion Rate
              </p>
              <p className="text-2xl font-bold text-gray-800 mt-1">8.2%</p>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <FiBarChart2 className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
