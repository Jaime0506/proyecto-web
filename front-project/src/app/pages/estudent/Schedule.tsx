import { Image } from "@nextui-org/image";
import { Card, CardHeader } from "@nextui-org/card";
import InsiderNavBar from "../../../components/InsiderNavBar";
import { useAppSelector } from "../../../hooks";

export const Schedule = () => {
  const state = useAppSelector((state) => state.data.currentSubject);
  return (
    <div className="flex w-full flex-col">
      <InsiderNavBar />

      <div className="flex gap-x-4 m-4">
        <Card className=" h-[250px]">
          <CardHeader className="absolute z-10 top-36 flex-col !items-start">
            <h4 className="text-white font-medium text-7xl">
              {state?.name}
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 h-full object-cover"
            src={state?.image}
            width={1490}
          />
        </Card>
      </div>
    </div>
  );
};
