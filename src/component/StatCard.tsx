import "./StatCard.css";
import type {StatCardProps} from "../util/type";

export default function StatCard({ title, value }: StatCardProps) {
    return (
        <div className="stat-card">
            <h4>{title}</h4>
            <p>{value}</p>
        </div>
    );
}