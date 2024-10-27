import { Navigate, RouteObject } from "react-router-dom";
import { ValidationRoutes } from "../components/ValidationRoutes";
import { HomePage } from "./pages/HomePage";
import { Board, Subjects } from "./pages/estudent";
import { SettingsPage } from "./pages/SettingsPage";
import { News, Tasks, Attendance, InfoTask, AttendanceCall, TaskDelivery, FeedBack } from "./pages/components";

const validation = (status: string):boolean => {
    if (status === "authenticated") return true

    return false
}

export const AppRoutes: RouteObject = {
    path: 'app',
    element: <ValidationRoutes redirectTo="/" validation={validation} type="app" />,
    children: [
        {
            path: '',
            element: <Navigate to={'home'} />
        },
        {
            path: 'home',
            element: <HomePage />
        },
        {
            path: 'settings',
            element: <SettingsPage />
        },
        {
            path: 'board',
            element:<Board />,
            children: [
                {
                    path: 'news',
                    element: <News />
                },
                {
                    path: 'tasks',
                    element: <Tasks />
                },
                {
                    path: 'attendance',
                    element: <Attendance />
                },
                {
                    path: 'infoTask',
                    element: <InfoTask />
                },
                {
                    path: 'attendanceCall',
                    element: <AttendanceCall />
                },
                {
                    path: 'taskDelivery',
                    element: <TaskDelivery />
                },
                {
                    path: 'feedback',
                    element: <FeedBack />
                },
                {
                    path: 'subjectsExample',
                    element: <Subjects />
                },
                {
                    path: '*',
                    element: <Navigate to={'board'} />
                }
            ]
        }
    ]
}