import { Navigate, RouteObject } from "react-router-dom";
import { News, Tasks, Attendance, InfoTask, AttendanceCall, TaskDelivery, FeedBack } from "./pages/components";
import { Board, Subjects } from "./pages/estudent";

export const BoardChildren: RouteObject = {
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
            path: 'infoTask/:taskId',
            element: <InfoTask />
        },
        {
            path: 'attendanceCall',
            element: <AttendanceCall />
        },
        {
            path: 'taskDelivery/:taskId',
            element: <TaskDelivery />
        },
        {
            path: 'feedback/:taskId',
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