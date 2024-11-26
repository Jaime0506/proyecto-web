import { useEffect, useState } from "react"
import { Button } from "@nextui-org/button"
import { Image } from "@nextui-org/image"
import { Input } from "@nextui-org/input"
import { Link } from "react-router-dom"
import { validateEmail, validatePassword } from "../../utils/validationEmail"
//import { useAuth } from "../../hooks/useAuth"

// Asumiendo que tienes una imagen para la sección administrativa
import admin_login from '../../assets/login_student.svg'

interface AdminFormType {
    email: string
    password: string
    adminCode?: string
}

interface AdminErrorsType {
    email: string
    password: string
    adminCode?: string
}

const errorsInit: AdminErrorsType = {
    email: "",
    password: "",
    adminCode: ""
}

export const AdminLoginPage = () => {
   // const { onAdmi } = useAuth()
    const [isVisible, setIsVisible] = useState(false)
    const [formValues, setFormValues] = useState<AdminFormType>({
        email: "",
        password: "",
        adminCode: ""
    })
    const [errors, setErrors] = useState(errorsInit)

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let errorTemp: AdminErrorsType = {
            email: '',
            password: '',
            adminCode: ''
        }

        // Validate Email
        const email = validateEmail(formValues.email)
        const password = validatePassword(formValues.password, "login")

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

        if (!formValues.adminCode) {
            errorTemp = {
                ...errorTemp,
                adminCode: "El código administrativo es requerido"
            }
        }

        setErrors(errorTemp)

        /*if (!errorTemp.email && !errorTemp.password && !errorTemp.adminCode) {
            onAdmi(adminCode)
        }*/
    }

    const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        console.log(errors)
    }, [errors]);

    const toggleVisible = () => setIsVisible(state => !state)

    return (
        <section className="flex w-full h-screen grid-cols-2">
            <div className="md:w-[45%] p-8 px-20 flex flex-col gap-20">
                <div className="flex items-center justify-between">
                    <h1 className="font-bold text-3xl font-roboto">Canvis</h1>
                    <span className="bg-primary text-white px-4 py-1 rounded-md">Panel Administrativo</span>
                </div>

                <section className="flex flex-col gap-6">
                    <h2 className="font-bold font-open text-4xl">"Gestiona y supervisa el sistema educativo de forma eficiente"</h2>
                    <h4 className="text-lg font-roboto font-normal">Acceso exclusivo para personal administrativo</h4>

                    <div className="flex flex-col py-10">
                        <form onSubmit={handleOnSubmit}>
                            <Input
                                autoComplete="off"
                                name="email"
                                variant="bordered"
                                radius="none" 
                                label="Correo administrativo"
                                type="email"
                                endContent={
                                    <div className="h-full flex items-center">
                                        <i className="fa-solid fa-envelope"></i>
                                    </div>
                                }
                                onChange={handleOnChangeInput}
                                value={formValues.email}
                                errorMessage={errors.email}
                                isInvalid={!!errors.email}
                                className="mb-4"
                            />
                            
                            <Input
                                autoComplete="off"
                                name="password"
                                variant="bordered"
                                radius="none"
                                label="Contraseña"
                                type={isVisible ? "text" : "password"}
                                endContent={
                                    <button 
                                        className="h-full flex items-center" 
                                        onClick={toggleVisible} 
                                        type="button"
                                    >
                                        {isVisible ? 
                                            <i className="fa-solid fa-eye"></i> : 
                                            <i className="fa-solid fa-eye-slash"></i>
                                        }
                                    </button>
                                }
                                onChange={handleOnChangeInput}
                                value={formValues.password}
                                errorMessage={errors.password}
                                isInvalid={!!errors.password}
                                className="mb-4"
                            />

                            <Input
                                autoComplete="off"
                                name="adminCode"
                                variant="bordered"
                                radius="none"
                                label="Código de administrador"
                                type={isVisible ? "text" : "password"}
                                endContent={
                                    <div className="h-full flex items-center">
                                        <i className="fa-solid fa-key"></i>
                                    </div>
                                }
                                onChange={handleOnChangeInput}
                                value={formValues.adminCode}
                                errorMessage={errors.adminCode}
                                isInvalid={!!errors.adminCode}
                                className="mb-4"
                            />

                            <div className="flex flex-col gap-4 py-8">
                                <Button
                                   
                                    type="submit"
                                    radius="none"
                                    className="bg-primary w-full"
                                    
                                    style={{
                                        color: "#FFFFFF"
                                    }}
                                >
                                    Iniciar Sesión como Administrador
                                </Button>

                                <Button
                                    as={Link}
                                    radius="none"
                                    className="bg-white border-primary border-[1.3px] text-black w-full"
                                    to={'/auth/login'}
                                >
                                    Volver al Login General
                                </Button>
                            </div>
                        </form>
                    </div>
                </section>
            </div>

            <div className="flex-1 flex items-center justify-center bg-primary">
                <Image
                    alt="Admin dashboard illustration"
                    src={admin_login}
                />
            </div>
        </section>
    )
}