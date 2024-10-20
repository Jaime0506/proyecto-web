import { Calendar } from "@nextui-org/calendar";
import { Link } from "react-router-dom";
import { Card, CardBody } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";


export const HomePage = () => {
  return (
    <div className="flex w-full flex-col">
      <Link to={'/app/student'}>Ir a student</Link>


      <div className="flex gap-x-4 m-4">
        <Card className="h-80 border-2">
          <CardBody>
            <Image
              alt="Card background"
              src="https://concepto.de/wp-content/uploads/2014/08/programacion-2-e1551291144973.jpg"
              width={270}
              height={125}
            />
            <h4 className="font-bold text-large pt-2">Asignatura</h4>
          </CardBody>
          <Divider className="mt-16" />
        </Card>
        <Card className="h-80 border-2">
          <CardBody>
            <Image
              alt="Card background"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB7jh5I_dlFNScU1Zla356DzuacPrFhefoEg&s"
              width={270}
              height={125}
            />
            <h4 className="font-bold text-large pt-2">Asignatura</h4>
          </CardBody>
          <Divider className="mt-16" />
        </Card>
        <Card className="h-80 border-2">
          <CardBody>
            <Image
              alt="Card background"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTid-9eSLK_bGohyztnz72tE40RpGWg4FRgfg&s"
              width={270}
              height={125}
            />
            <h4 className="font-bold text-large pt-2">Asignatura</h4>
          </CardBody>
          <Divider className="mt-16" />
        </Card>
        <Card className="h-80 border-2">
          <CardBody>
            <Image
              alt="Card background"
              src="https://media.licdn.com/dms/image/v2/D4E12AQHohmp9RBzPXw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1702393125933?e=2147483647&v=beta&t=nMM--w6QGXozKsX5Aje96ggXH9j66Q2aCKEexkY_lwY"
              width={270}
              height={125}
            />
            <h4 className="font-bold text-large pt-2">Asignatura</h4>
          </CardBody>
          <Divider className="mt-16" />
        </Card>


        {/* <Calendar color="secondary" aria-label="Date (Uncontrolled)" /> */}
      </div>
    </div>
  );
};


