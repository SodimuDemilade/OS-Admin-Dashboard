import "./Sidebar.css";
import {RouteConstant} from "@/util/constants/routeConstant.ts";
import {useLocation, useNavigate} from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div className="sidebar">
            <h2 className="logo">OS Admin</h2>

            <ul>
                {/*<li onClick={() => navigate(RouteConstant.dashboard.landing.path)} className={`${location.pathname == "/" ? "sidebarActive" : ''}`}>Dashboard</li>*/}
                <li onClick={() => navigate(RouteConstant.dashboard.analytics.path)}
                    className={`${location.pathname == "/analytics" ? "sidebarActive" : ''}`}>Analytics
                </li>
                <li onClick={() => navigate(RouteConstant.dashboard.user.path)}
                    className={`${location.pathname == "/user" ? "sidebarActive" : ''}`}>Users
                </li>
                <li onClick={() => navigate(RouteConstant.dashboard.settings.path)}
                    className={`${location.pathname == "/settings" ? "sidebarActive" : ''}`}>Settings
                </li>
            </ul>
        </div>
    );
}