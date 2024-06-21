function path(root, sublink) {
    return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/dashboard";

export const PATH_AUTH = {
    root: ROOTS_AUTH,
    login: path(ROOTS_AUTH, "/login"),
    register: path(ROOTS_AUTH, "/register"),
};

export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,
    dashboard: path(ROOTS_DASHBOARD, "/websitedashboard"),
    analytics: path(ROOTS_DASHBOARD, "/webanalytics"),
    courses: path(ROOTS_DASHBOARD, "/courses"),
};
