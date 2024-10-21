import { Card, CardBody } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import { SubjectType } from "../types/redux";

interface CardComponentProps {
  subject: SubjectType;
}

export const CardComponent = ({ subject }: CardComponentProps) => {
  return (
    <Card className="h-80 w-72 border-2 m-4 border-primary">
      <CardBody>
        <Image
          alt={subject.name}
          src="https://concepto.de/wp-content/uploads/2014/08/programacion-2-e1551291144973.jpg"
          width={270}
          height={125}
        />
        <h4 className="font-bold text-xl pt-2 overflow-hidden">
          {subject.name}
        </h4>
      </CardBody>
      <Divider className="mt-64 border-primary absolute" />
    </Card>
  );
};

export default Card;
