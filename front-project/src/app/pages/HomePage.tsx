import { Link } from "react-router-dom";
import { Card, CardBody } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import { useSubjects } from "../../hooks/useSubjects";

export const HomePage = () => {
  const { subjects } = useSubjects();

  const renderCards = () => {
    // if(!subjects) return <></>
    return subjects?.map((subject, index) => (
      <Link to={`/app/student/schedule/${subject.name}`}>
        <Card key={index} className="h-80 border-2">
          <CardBody>
            <Image
              alt="Card background"
              src="https://concepto.de/wp-content/uploads/2014/08/programacion-2-e1551291144973.jpg"
              width={270}
              height={125}
            />
            <h4 className="font-bold text-large pt-2">{subject.name}</h4>
          </CardBody>
          <Divider className="mt-16" />
        </Card>
      </Link>
    ));
  };

  return (
    <div className="flex w-full flex-col">
      <Link to={"/app/student"}>Ir a student</Link>

      <div className="flex flex-wrap gap-x-4 m-4">{renderCards()}</div>
    </div>
  );
};
