import {ReactNode} from "react";
import Sidebar from "@/component/Sidebar.tsx";
import '../view/Dashboard.css';

type DashboardLayoutProps = {
    title: string;
    subtitle: string;
    children: ReactNode;
}

export const DashboardLayout = ({children}: DashboardLayoutProps) => {
    return (
        <div className="dashboard">

            <Sidebar />

            <div className="content">
                {children}
            </div>

        </div>
    )
}