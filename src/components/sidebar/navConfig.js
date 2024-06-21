import { PATH_DASHBOARD } from "@/route/paths";
import Iconify from "../Iconify";

const ICONS = {
    Dashboard: <Iconify icon={"akar-icons:dashboard"} />,
    Analytics: <Iconify icon={"material-symbols:analytics-outline"} />,
    Components: <Iconify icon={"majesticons:data-line"} />,
    Courses: <Iconify icon={"hugeicons:course"} />,
};

const navConfig = [
    {
        text: "Dashboard",
        path: PATH_DASHBOARD.dashboard,
        icon: ICONS.Dashboard,
    },
    {
        text: "Analytics",
        path: PATH_DASHBOARD.analytics,
        icon: ICONS.Analytics,
    },
    {
        text: "Courses",
        path: PATH_DASHBOARD.courses,
        icon: ICONS.Courses,
    },
    {
        text: "Banner",
        path: "/banner",
        icon: ICONS.Components,
        children: [
            {
                title: "Create Banner",
                path: "/banner/createbanner",
            },
            {
                title: "View Banners",
                path: "/banner/viewbanners",
            },
        ],
    },
];

export default navConfig;
