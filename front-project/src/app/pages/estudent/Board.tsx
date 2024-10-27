import InsiderNavBar from "../../../components/InsiderNavBar";

import { Outlet } from "react-router-dom";

export const Board = () => {
  return (
    <div className="flex w-full flex-col">
      <InsiderNavBar />
      <div className="flex gap-x-4 m-4">
        <Outlet />
      </div>
    </div>
  );
};
