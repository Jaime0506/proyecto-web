import { Link } from "react-router-dom";
import { useAppSelector } from "../../../hooks";

export const Attendance = () => {
  const state = useAppSelector((state) => state.data.currentSubject);

  const renderRows = () => {
    return state?.sessions.map((session, index) => (
      <Link key={index} to={`/app/board/attendanceCall`} state={{session}}>
        <p>Asistencia del {session.date}</p>
      </Link>
    ));
  };

  return <div>{renderRows()}</div>;
};
