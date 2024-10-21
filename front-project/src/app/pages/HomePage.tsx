import { Link } from "react-router-dom";
import { useSubjects } from "../../hooks/useSubjects";
import { CardComponent } from "../../components/CardComponent";

export const HomePage = () => {
  const { subjects } = useSubjects();

  const renderCards = () => {
    return subjects?.map((subject, index) => (
      <Link to={`/app/student/schedule/${subject.name}`}>
        <CardComponent subject={subject} />
      </Link>
    ));
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-wrap gap-x-4 my-2 mx-20 ">{renderCards()}</div>
    </div>
  );
};
