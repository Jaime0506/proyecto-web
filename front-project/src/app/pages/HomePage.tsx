import { Button } from "@nextui-org/button"
import { Calendar } from "@nextui-org/calendar"

export const HomePage = () => {
    return (
        <div className="flex w-full flex-col">

            Esta es la pagina de inicio insana
            aca tiene que ir el contenido informativo

            <Button>
                Ejemplo
            </Button>

wdw
            <div className="flex gap-x-4">
                eee
                <Calendar aria-label="Date (No Selection)" />
                <Calendar color="secondary" aria-label="Date (Uncontrolled)" />
            </div>
        </div>
    )
}