import "./Analytics.css";

import {Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

/* Dummy Data */

const trendData = [
    {month: "Jan", value: 400},
    {month: "Feb", value: 800},
    {month: "Mar", value: 600},
    {month: "Apr", value: 1000},
    {month: "May", value: 1400}
];

const pieData = [
    {name: "Active", value: 70},
    {name: "Inactive", value: 30}
];

const COLORS = ["#4f46e5", "#ef4444"];

export default function Analytics() {
    return (
        <div className="analytics-page">

            <h1>Analytics</h1>
            <p>System performance and user statistics</p>

            {/* Metric Cards */}
            <div className="analytics-cards">

                <div className="analytics-card">
                    <h4>Total Users</h4>
                    <h2>2,340</h2>
                </div>

                <div className="analytics-card">
                    <h4>Revenue</h4>
                    <h2>$12,400</h2>
                </div>

                <div className="analytics-card">
                    <h4>Active Users</h4>
                    <h2>1,890</h2>
                </div>

                <div className="analytics-card">
                    <h4>Conversion</h4>
                    <h2>4.3%</h2>
                </div>

            </div>

            {/* Charts Section */}
            <div className="charts-grid">

                {/* Line Chart */}
                <div className="chart-card">
                    <h3>User Growth Trend</h3>

                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={trendData}>
                            <XAxis dataKey="month"/>
                            <YAxis/>
                            <Tooltip/>

                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#4f46e5"
                                strokeWidth={2}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className="chart-card">
                    <h3>User Status Distribution</h3>

                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={100}
                            >
                                {pieData.map((_entry, index) => (
                                    <Cell key={index} fill={COLORS[index]}/>
                                ))}
                            </Pie>

                            <Tooltip/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

            </div>

        </div>
    );
}