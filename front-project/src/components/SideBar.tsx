import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { useAppSelector, useAppDispatch } from "../hooks";
import { Link } from "react-router-dom";
import { currentSubject } from "../store/data/dataSlice";

export default function SideBar() {
  const state = useAppSelector((state) => state.data.subjects);
  const dispatch = useAppDispatch();

  const handleOnClick = (selectedSubject: any) => {
    dispatch(currentSubject(selectedSubject));
  };

  const renderSubjects = () =>
    state?.map((subject, index) => (
      <NavbarItem
        className="mb-2"
        key={index}
        onClick={() => {
          handleOnClick(subject);
        }}
      >
        <Link
          to={"board/news"}
          className="text-black text-lg hover:bg-primary p-3 rounded hover:text-white transition-all"
        >
          {subject.name}
        </Link>
      </NavbarItem>
    ));

  return (
    <Navbar
      className=" border-r-2 border-primary py-4 flex flex-col h-[calc(100vh-97.33px)] w-72"
      style={{ top: "97.33px" }}
    >
      <NavbarContent className="flex flex-col pt-10 h-[calc(100vh-97.33px)] w-72">
        {renderSubjects()}
      </NavbarContent>
    </Navbar>
  );
}
