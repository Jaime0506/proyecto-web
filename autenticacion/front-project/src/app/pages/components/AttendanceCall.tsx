import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../../hooks";

export const AttendanceCall = () => {
  const state = useAppSelector((state) => state.data.attendance);

  const location = useLocation();
  const {date} = location.state?.session;

  const renderAttendance = () => {
    return (
      state?.map((attendance, index) => {
        const {status} = attendance.metadata?.find((meta) => meta.date === date) || {};

        return (
          <TableRow key={index}>
            <TableCell>{attendance.user_id}</TableCell>
            <TableCell>{attendance.subject_id}</TableCell>
            <TableCell>{attendance.attendance_id}</TableCell>
            <TableCell>
              <label>
                <input 
                  type="radio" 
                  name={attendance.attendance_id}
                  value="si" 
                  defaultChecked={status === "si"}
                />
                <input 
                  type="radio" 
                  name={attendance.attendance_id}
                  value="no" 
                  defaultChecked={status === "no"}
                />
                <input 
                  type="radio" 
                  name={attendance.attendance_id}
                  value="re" 
                  defaultChecked={status === "re"}
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
