import { useState } from "react"

import { Button } from "@nextui-org/button"
import { Image } from "@nextui-org/image"
import { Input } from "@nextui-org/input"

import { Link } from "react-router-dom"

import register_student from '../../assets/register_teacher.svg'
import { validateEmail, validatePassword } from "../../utils/validationEmail"
import { useAuth } from "../../hooks/useAuth"

interface FormType {
    email: string
    password: string
    rPassword: string
    is_super_admin: boolean 
}

interface errorsType {
    email: string
    password: string
}

const errorsInit: errorsType = {
    email: "",
    password: ""
}

export const RegisterPage = () => {
    const { onRegister } = useAuth()

    const [errors, setErrors] = useState(errorsInit);
    const [isVisible, setIsVisible] = useState(false);
    const [formValues, setFormValues] = useState<FormType>({
        email: "",
        password: "",
        rPassword: "",
        is_super_admin: true
    });

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let errorTemp:errorsType = {
            email: '',
            password: ''
        }

        const email = validateEmail(formValues.email)
        const password = validatePassword(formValues.password, "register", formValues.rPassword)

        if (email) {
            errorTemp = {
                ...errorTemp,
                email
            }
        }

        if (password) {
            errorTemp = {
                ...errorTemp,
                password
            }
        }

        setErrors(errorTemp)

        if (!errorTemp.email && !errorTemp.password) {
            onRegister(formValues)

            
        }
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
                                autoComplete="."
                                name="email"
                                variant="bordered"
                                radius="none"
                                label="Correo electronico"
                                endContent={
                                    <div className="h-full flex items-center">
                                        <i className="fa-solid fa-envelope"></i>
                                    </div>
                                }
                                onChange={handleOnChangeInput}
                                value={formValues.email}
                                isInvalid={!!errors.email}
                                errorMessage={errors.email}
                            />
                            <Input
                                autoCapitalize="."
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
                                autoCapitalize="."
                                name="rPassword"
                                variant="bordered"
                                radius="none"
                                label="Repetir contraseña"
                                type={isVisible ? "text" : "password"}
                                onChange={handleOnChangeInput}
                                value={formValues.rPassword}
                                isInvalid={!!errors.password}
                                errorMessage={errors.password}
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