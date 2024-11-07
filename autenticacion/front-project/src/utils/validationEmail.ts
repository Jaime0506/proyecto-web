export const checkEmail = (email: string) => {
    // Expresión regular para validar el formato del email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Verifica si el email cumple con la expresión regular
    if (emailRegex.test(email)) {
        return true;  // Email válido
    } else {
        return false; // Email no válido
    }
}

export const validateEmail = (email: string) => {

    if (!email) {
        return "El correo no puede estar vacio"
    }

    if (!checkEmail(email)) {
        return "El correo digitado no es valido"
    }

    return false
}

export const validatePassword = (password: string, type: "login" | "register", rPassword?: string) => {
    if (type === "login") {
        if (!(password.length > 6)) {
            return "La contraseña debe tener mas de 6 caracteres"
        }
    }

    if (type === "register") {
        if (!(password.length > 6)) {
            return "Las contraseñas debe tener mas de 6 caracteres"
        }

        if (!(password === rPassword)) {
            return "Las contraseñas no coinciden"
        }
    }

    return false
}