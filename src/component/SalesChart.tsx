import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const data = [
    { name: "Jan", sales: 400 },
    { name: "Feb", sales: 700 },
    { name: "Mar", sales: 600 },
    { name: "Apr", sales: 900 },
    { name: "May", sales: 1200 }
];

export default function SalesChart() {
    return (
        <div style={{background:"white", padding:"20px", borderRadius:"10px"}}>
            <h3>Sales Overview</h3>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="#4f46e5" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}