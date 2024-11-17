import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
import { useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { handleOnSubmitAttendance } from "../../../store/auth/thunk";

export const AttendanceCall = () => {
  const state = useAppSelector((state) => state.data.attendance);

  const dispatch = useAppDispatch();

  const location = useLocation();
  const date = location.state?.session ? location.state.session.date : undefined;

  const handleSubmit = (p_subject_id: string, p_user_id: string, p_status: string, p_date: string) => {
    dispatch(handleOnSubmitAttendance(p_subject_id, p_user_id, p_status, p_date))
  }

  const renderAttendance = () => {
    return (
      state?.map((attendance, index) => {
        const {user_id, subject_id, attendance_id} = attendance
        const {status} = attendance.metadata?.find((meta) => meta.date === date) || {};

        return (
          <TableRow key={index}>
            <TableCell>{user_id}</TableCell>
            <TableCell>{subject_id}</TableCell>
            <TableCell>{attendance_id}</TableCell>
            <TableCell>
              <label>
                <input 
                  type="radio" 
                  name={attendance.attendance_id}
                  value="si" 
                  defaultChecked={status === "si"}
                  onClick={()=>{handleSubmit(subject_id, user_id, "si", date)}}
                />
                <input 
                  type="radio" 
                  name={attendance.attendance_id}
                  value="no" 
                  defaultChecked={status === "no"}
                  onClick={()=>{handleSubmit(subject_id, user_id, "no", date)}}
                />
                <input 
                  type="radio" 
                  name={attendance.attendance_id}
                  value="re" 
                  defaultChecked={status === "re"}
                  onClick={()=>{handleSubmit(subject_id, user_id, "re", date)}}
                />
              </label>
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
          <TableColumn>user_id</TableColumn>
          <TableColumn>subject_id</TableColumn>
          <TableColumn>attendance_id</TableColumn>
          <TableColumn>si no re</TableColumn>
        </TableHeader>
        <TableBody>{renderAttendance()}</TableBody>
      </Table>
    </div>
  );
};
