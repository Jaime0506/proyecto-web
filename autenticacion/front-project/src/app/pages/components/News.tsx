import { Image } from "@nextui-org/image";
import { Card, CardHeader } from "@nextui-org/card";
import { useAppSelector } from "../../../hooks";

export const News = () => {
  const state = useAppSelector((state) => state.data.currentSubject);
  return (<>
    <Card className="h-[250px]">
      <CardHeader className="absolute z-10 top-36 flex-col !items-start">
        <h4 className="text-white font-normal text-7xl">{state?.name}</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card background"
        className="z-0 h-full object-cover"
        src={state?.image}
        width={1490}
      />
    </Card>
    <div 
        dangerouslySetInnerHTML={{ __html: state?.description || "" }} 
        className="text-lg mt-4"
      />
    </>
  );
};
