import { useState } from "react"

import { Button } from "@nextui-org/button"
import { Image } from "@nextui-org/image"
import { Input } from "@nextui-org/input"

import { Link } from "react-router-dom"

import { useAuth } from "../../hooks/useAuth"
import { userExample } from "../../data/dataExample"

import register_student from '../../assets/register_teacher.svg'

interface FormType {
    email: string
    password: string
    rPassword: string
}

export const RegisterPage = () => {

    const { onLogin } = useAuth()
    const [isVisible, setIsVisible] = useState(false);
    const [formValues, setFormValues] = useState<FormType>({
        email: "",
        password: "",
        rPassword: ""
    });

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        onLogin(userExample)
    }

    const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const toogleVisible = () => setIsVisible(state => !state)

    return (
        <section className="flex w-full h-screen grid-cols-2">
            <div className="flex-1 flex items-center justify-center bg-primary">
                <div className="flex flex-col items-center justify-center w-3/5">
                    <Image
                        // width={'50%'}
                        src={register_student}
                    />
                </div>
            </div>

            <div className="md:w-[45%] p-8 px-20 flex flex-col gap-20">
                <h1 className="font-bold text-3xl font-roboto">Canvis</h1>

                <section className="flex flex-col gap-6">
                    <h2 className="font-bold font-open text-4xl">"Conéctate y gestiona tu aprendizaje de forma simple y colaborativa."</h2>
                    <h4 className="text-lg font-roboto font-normal">Inicia sesion para empezar a usar nuestros servicios</h4>

                    <div className="flex flex-col py-10">
                        <form onSubmit={handleOnSubmit}>
                            <Input
                                name="email"
                                variant="bordered"
                                radius="none"
                                label="Correo electronico"
                                type="email"
                                endContent={
                                    <div className="h-full flex items-center">
                                        <i className="fa-solid fa-envelope"></i>
                                    </div>
                                }
                                onChange={handleOnChangeInput}
                                value={formValues.email}
                            />
                            <Input
                                name="password"
                                variant="bordered"
                                radius="none"
                                label="Contraseña"
                                type={isVisible ? "text" : "password"}
                                endContent={
                                    <button className="h-full flex items-center" onClick={toogleVisible} type="button" >
                                        {
                                            isVisible ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>
                                        }
                                    </button>
                                }
                                onChange={handleOnChangeInput}
                                value={formValues.password}
                            />
                            <Input
                                name="rPassword"
                                variant="bordered"
                                radius="none"
                                label="Repetir contraseña"
                                type={isVisible ? "text" : "password"}
                                onChange={handleOnChangeInput}
                                value={formValues.rPassword}
                            />

                            <Link to={'/auth/login'}>
                                <h4 className="mt-5 text-sm underline">¿Ya tienes una cuenta?</h4>
                            </Link>

                            <div className="flex gap-5 py-8">
                                <Button
                                    type="submit"
                                    radius="none"
                                    className="bg-primary text-white"
                                >
                                    Registrate
                                </Button>
                            </div>
                        </form>

                    </div>
                </section>
            </div>
        </section>
    )
}