import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
import { Button } from "@nextui-org/button";
import { useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { handleOnGetName, handleOnSubmitAttendance } from "../../../store/auth/thunk";
import { useState } from "react";

interface AttendanceCall {
  p_subject_id: string, 
  p_user_id: string, 
  p_status: string, 
  p_date: string
}

export const AttendanceCall = () => {
  const states = ["si", "no", "re"];
  const attendanceState = useAppSelector((state) => state.data.attendance);
  const userRole = useAppSelector((state) => state.auth.user);
  const { name } = useAppSelector((state) => state.data.currentSubject) || {};

  const dispatch = useAppDispatch();
  const location = useLocation();
  const date = location.state?.session?.date;

  const [attendance, setAttendance] = useState<AttendanceCall[]>([]);
  const [names, setNames] = useState<Record<string, string>>({});
  
  const fetchName = async (user_id: string) => {
    if (!names[user_id]) {
      const name = await handleOnGetName(user_id);
      setNames((prevNames) => ({ ...prevNames, [user_id]: name }));
    }
  };

  const handleSubmit = () => {
    attendance.map((call)=>{
      dispatch(handleOnSubmitAttendance(call.p_subject_id, call.p_user_id, call.p_status, call.p_date));
    });
    setAttendance([])
  };

  const handleOnClick = (p_subject_id: string, p_user_id: string, p_status: string, p_date: string) => {
    setAttendance((prevAttendance) => ([...prevAttendance, {p_subject_id, p_user_id, p_status, p_date}]));
  }

  const renderInputs = ( attendance_id: string, subject_id: string, user_id: string, status: string | undefined ) => ( 
    <div className="flex space-x-1">
      {states.map((state, index) => (
        <div key={index} className="flex items-center space-x-1">
          <h1>{state}</h1>
          <input
            type="radio"
            name={attendance_id}
            value={state}
            defaultChecked={status === state}
            onClick={() => handleOnClick(subject_id, user_id, state, date)}
            disabled={!(userRole?.role === "docent")}
          />
        </div>
      ))}
    </div>
  );

  const renderAttendance = () => {
    return (
      attendanceState?.map((attendance, index) => {
        const { user_id, subject_id, attendance_id } = attendance;
        const { status } = attendance.metadata?.find((meta) => meta.date === date) || {};

        fetchName(user_id);

        return (
          <TableRow key={index}>
            <TableCell>{names[user_id] || "Loading..."}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>
              {renderInputs(attendance_id, subject_id, user_id, status)}
            </TableCell>
          </TableRow>
        );
      }) || []
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <h1>Asistencia del {date}</h1>
      <Table aria-label="Example static collection table" selectionMode="single">
        <TableHeader>
          <TableColumn>Estudiante</TableColumn>
          <TableColumn>Asignatura</TableColumn>
          <TableColumn>Asistencia</TableColumn>
        </TableHeader>
        <TableBody>{renderAttendance()}</TableBody>
      </Table>
      
      <div className="flex justify-center">
      {userRole?.role === "docent" && (
          <Button
            color="default"
            variant="flat"
            onClick={() => {
              handleSubmit();
            }}
            className="w-1"
          >
            Enviar
          </Button>
        )}        
      </div>
    </div>
  );
};