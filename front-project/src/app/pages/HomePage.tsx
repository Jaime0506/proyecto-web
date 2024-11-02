import { Link } from "react-router-dom";
import { CardComponent } from "../../components/CardComponent";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { currentSubject } from "../../store/data/dataSlice";
import { SubjectsType } from "../../types/redux";

export const HomePage = () => {
  const state = useAppSelector((state) => state.data.subjects);
  const dispatch = useAppDispatch();

  const handleOnClick = (selectedSubject: SubjectsType) => {
    dispatch(currentSubject(selectedSubject));
  };

  const renderCards = () => {
    return state?.map((subject, index) => (
      <Link
        key={index}
        to={`/app/board/news`}
        onClick={() => {
          handleOnClick(subject);
        }}
      >
        <CardComponent subject={subject} />
      </Link>
    ));
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-wrap gap-x-4 my-2 mx-20">{renderCards()}</div>
    </div>
  );
};
