import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../../hooks";

export const AttendanceCall = () => {
  const state = useAppSelector((state) => state.data.attendance);

  const location = useLocation();

  const renderAttendance = () => {
    return (
      state?.map((attendance, index) => (
        <TableRow key={index}>
          <TableCell>{attendance.user_id}</TableCell>
          <TableCell>{attendance.subject_id}</TableCell>
          <TableCell>{attendance.attendance_id}</TableCell>
          <TableCell>
          <label >
              <input 
                type="radio" 
                name={`attendance`} 
                value="si" 
              />
            </label>
            <label >
              <input 
                type="radio" 
                name={`attendance`} 
                value="no" 
              />
            </label>
            <label >
              <input 
                type="radio" 
                name={`attendance`} 
                value="re" 
              />
            </label>
          </TableCell>
        </TableRow>
      )) || []
    );
  };

  const dato = location.state?.session;
  console.log(dato);

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
