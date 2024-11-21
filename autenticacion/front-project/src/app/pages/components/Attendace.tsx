import { Link } from "react-router-dom";
import { useAppSelector } from "../../../hooks";
import LogoCharacters from '../../../assets/characters.svg';

export const Attendance = () => {
  const state = useAppSelector((state) => state.data.currentSubject);
  let num = 1;

  const renderRows = () => {
    return state?.sessions.map((session, index) => (
      <Link key={index} to={`/app/board/attendanceCall`} state={{ session }}>
          <img src={LogoCharacters} />
        <div className="flex flex-row gap-96">
          <p>Asistencia Clase {num++}</p>
          <h1>Fecha: {session.date}</h1>
        </div>
      </Link>
    ));
  };

  return <div>{renderRows()}</div>;
};
