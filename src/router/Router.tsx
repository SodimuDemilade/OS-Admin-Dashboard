import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {dashboardRoute} from "./route/dashboardRoute.tsx";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import type {RouteType} from "../util/type/route.tsx";
import RouterUtil from "../util/RouterUtil.ts";
import type {NameEnum} from "../util/enums/enum.ts";
import {StringUtil} from "../util/stringUtil.ts";
import type {RootState} from "@/store";
import {DashboardLayout} from "@/layout/DashboardLayout.tsx";

export const Router = () => {
    const routes = [...dashboardRoute];
    const publicRoute = routes.filter(it => !it.metadata.isProtected);
    const privateRoute = routes.filter(it => it.metadata.isProtected);
    const authState = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const isAuthenticated = !StringUtil.isStringNullOrEmpty(authState?.token);


    useEffect(() => {
        // Set the global navigate function on component mount
        RouterUtil.setNavigateFn(navigate);
    }, [navigate]);

    return (
        <Routes>
            {
                publicRoute.map((value: RouteType, index) => {
                    const options = value.metadata
                    const component = (options.hasSideBar ?
                        <DashboardLayout title={value.name as NameEnum} subtitle={value.metadata.subtitle}
                                         children={
                                             value.element}/> : value.element)

                    return (
                        <Route key={index} path={value.path} element={component}  {...value.metadata} />
                    )
                })
            }
            {
                privateRoute.map((value: RouteType, index) => {
                    const options = value.metadata
                    const component = (options.hasSideBar ?
                        <DashboardLayout title={value.name as NameEnum} subtitle={value.metadata.subtitle}
                                         children={
                                             value.element}/> : value.element)
                    return (
                        isAuthenticated ?
                            <Route key={index} path={value.path} element={component}  {...value.metadata} /> :
                            <Route key={index} path={value.path} element={<Navigate to={'/'} replace/>}/>
                    )
                })
            }
        </Routes>
    )
}