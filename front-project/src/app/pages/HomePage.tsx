import { Link } from "react-router-dom";
import { CardComponent } from "../../components/CardComponent";
import { useAppSelector } from "../../hooks";

export const HomePage = () => {

  const state = useAppSelector((state) => state.data.subjects);

  const renderCards = () => {
    return state?.map((subject, index) => (
      <Link key={index} to={`/app/student/schedule/${subject.name}`}>
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
