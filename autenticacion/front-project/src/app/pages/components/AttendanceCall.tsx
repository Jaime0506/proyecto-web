import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
import { useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { handleOnGetName, handleOnSubmitAttendance } from "../../../store/auth/thunk";
import { useState } from "react";

export const AttendanceCall = () => {
  const states = ["si", "no", "re"];
  const attendanceState = useAppSelector((state) => state.data.attendance);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const date = location.state?.session?.date;

  const [names, setNames] = useState<Record<string, string>>({});

  const fetchName = async (user_id: string) => {
    if (!names[user_id]) {
      const name = await handleOnGetName(user_id);
      setNames((prevNames) => ({ ...prevNames, [user_id]: name }));
    }
  };

  const handleSubmit = (p_subject_id: string, p_user_id: string, p_status: string, p_date: string) => {
    dispatch(handleOnSubmitAttendance(p_subject_id, p_user_id, p_status, p_date));
  };

  const renderInputs = (
    attendance_id: string,
    subject_id: string,
    user_id: string,
    status: string | undefined
  ) =>
    states.map((state, index) => (
      <input
        key={index}
        type="radio"
        name={attendance_id}
        value={state}
        defaultChecked={status === state}
        onClick={() => handleSubmit(subject_id, user_id, state, date)}
      />
    ));

  const renderAttendance = () => {
    return (
      attendanceState?.map((attendance, index) => {
        const { user_id, subject_id, attendance_id } = attendance;
        const { status } = attendance.metadata?.find((meta) => meta.date === date) || {};

          fetchName(user_id);

        return (
          <TableRow key={index}>
            <TableCell>{names[user_id] || "Loading..."}</TableCell>
            <TableCell>{subject_id}</TableCell>
            <TableCell>
              <label>{renderInputs(attendance_id, subject_id, user_id, status)}</label>
            </TableCell>
          </TableRow>
        );
      }) || []
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <Table color={"success"} aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Nombre</TableColumn>
          <TableColumn>Subject ID</TableColumn>
          <TableColumn>Asistencia</TableColumn>
        </TableHeader>
        <TableBody>{renderAttendance()}</TableBody>
      </Table>
    </div>
  );
};

