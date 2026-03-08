import "./Dashboard.css";
import StatCard from "../component/StatCard.tsx";
import SalesChart from "../component/SalesChart.tsx";

export default function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>

            <div className="stats">
                <StatCard title="Revenue" value="$12,340" />
                <StatCard title="Users" value="1,230" />
                <StatCard title="Orders" value="320" />
            </div>

            <SalesChart />
        </div>
    );
}