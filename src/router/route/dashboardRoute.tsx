import type {RouteType} from "../../util/type/route.tsx";
import {RouteConstant} from "@/util/constants/routeConstant.ts";
import {NameEnum} from "@/util/enums/enum.ts";
import User from "@/view/User.tsx";
import Settings from "@/view/Settings.tsx";
import Analytics from "@/view/Analytics.tsx";

export const dashboardRoute: RouteType[] = [
    // {
    //     path: RouteConstant.dashboard.landing.path,
    //     name: NameEnum.Dashboard,
    //     element: <Dashboard/>,
    //     metadata: {
    //         isProtected: false,
    //         hasSideBar: true,
    //         subtitle: "",
    //         hasForm: false
    //     },
    // },
    {
        path: RouteConstant.dashboard.user.path,
        name: NameEnum.User,
        element: <User/>,
        metadata: {
            isProtected: false,
            hasSideBar: true,
            subtitle: "",
            hasForm: false
        },
    },
    {
        path: RouteConstant.dashboard.settings.path,
        name: NameEnum.Settings,
        element: <Settings/>,
        metadata: {
            isProtected: false,
            hasSideBar: true,
            subtitle: "",
            hasForm: false
        },
    },
    {
        path: RouteConstant.dashboard.analytics.path,
        name: NameEnum.Analytics,
        element: <Analytics/>,
        metadata: {
            isProtected: false,
            hasSideBar: true,
            subtitle: "",
            hasForm: false
        },
    },
]