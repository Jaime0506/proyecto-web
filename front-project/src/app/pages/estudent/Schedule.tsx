import { Image } from "@nextui-org/image";
import { Card, CardHeader } from "@nextui-org/card";
import InsiderNavBar from "../../../components/InsiderNavBar";
import { useParams } from "react-router-dom";

export const Schedule = () => {
  const { asignatura } = useParams();
  return (
    <div className="flex w-full flex-col">
      <InsiderNavBar />

      <div className="flex gap-x-4 m-4">
        <Card className=" h-[250px]">
          <CardHeader className="absolute z-10 top-36 flex-col !items-start">
            <h4 className="text-white font-medium text-7xl">
              {asignatura ? asignatura : "vacio"}
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 h-full object-cover"
            src="https://colegiosigma.com.pe/aulavirtual/pluginfile.php/333/course/overviewfiles/matematica.jpg"
            width={1490}
          />
        </Card>
      </div>
    </div>
  );
};
