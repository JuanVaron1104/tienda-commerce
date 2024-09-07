export const validarStepOneRegistro = (campos) => {
    const errors = {}
    const {
        usuPrimerNombre, usuSegundoNombre,
        usuPrimerApellido, usuSegundoApellido,
        usuTipoDocumento, usuNumeroDocumento,
        usuId_ciudadNacimiento, usuFechaNacimiento } = campos

    //Validaciones para usuPrimerNombre
    if (!usuPrimerNombre) {
        errors.usuPrimerNombre = "Campo obligatorio"
    } else {
        const RegExp = /^[A-Za-z ]{1,255}$/
        if (!RegExp.test(usuPrimerNombre)) {
            errors.usuPrimerNombre = "Solo se permiten letras"
        } else {
            const RegExp = /^[A-Za-z ]{1,20}$/
            if (!RegExp.test(usuPrimerNombre)) {
                errors.usuPrimerNombre = "Mínimo 1 y máximo 20 caracteres."
            }
        }
    }

    //Validaciones para usuSegundoNombre
    if (usuSegundoNombre) {
        const RegExp = /^[A-Za-z ]{1,255}$/
        if (!RegExp.test(usuSegundoNombre)) {
            errors.usuSegundoNombre = "Solo se permiten letras"
        } else {
            const RegExp = /^[A-Za-z ]{1,20}$/
            if (!RegExp.test(usuSegundoNombre)) {
                errors.usuSegundoNombre = "Mínimo 1 y máximo 20 caracteres."
            }
        }
    }

    //Validaciones para usuPrimerApellido
    if (!usuPrimerApellido) {
        errors.usuPrimerApellido = "Campo obligatorio"
    } else {
        const RegExp = /^[A-Za-z ]{1,255}$/
        if (!RegExp.test(usuPrimerApellido)) {
            errors.usuPrimerApellido = "Solo se permiten letras"
        } else {
            const RegExp = /^[A-Za-z ]{1,20}$/
            if (!RegExp.test(usuPrimerApellido)) {
                errors.usuPrimerApellido = "Mínimo 1 y máximo 20 caracteres."
            }
        }
    }

    //Validaciones para usuSegundoApellido
    if (!usuSegundoApellido) {
        errors.usuSegundoApellido = "Campo obligatorio"
    } else {
        const RegExp = /^[A-Za-z ]{1,255}$/
        if (!RegExp.test(usuSegundoApellido)) {
            errors.usuSegundoApellido = "Solo se permiten letras"
        } else {
            const RegExp = /^[A-Za-z ]{1,20}$/
            if (!RegExp.test(usuSegundoApellido)) {
                errors.usuSegundoApellido = "Mínimo 1 y máximo 20 caracteres."
            }
        }
    }

    //Validaciones para usuTipoDocumento
    if (!usuTipoDocumento || usuTipoDocumento === -1) {
        errors.usuTipoDocumento = true
    }

    //Validaciones para usuNumeroDocumento
    if (!usuNumeroDocumento) {
        errors.usuNumeroDocumento = "Campo obligatorio"
    } else {
        const RegExp = /^\D*\d{1,255}$/
        if (!RegExp.test(usuNumeroDocumento)) {
            errors.usuNumeroDocumento = "Solo se permiten números"
        } else {
            const RegExp = /^\D*\d{5,11}$/
            if (!RegExp.test(usuNumeroDocumento)) {
                errors.usuNumeroDocumento = "Mínimo 5 y máximo 11 dígitos."
            }
        }
    }

    //Validaciones para usuId_ciudadNacimiento
    if (!usuId_ciudadNacimiento || usuId_ciudadNacimiento === -1) {
        errors.usuId_ciudadNacimiento = true
    }

    //Validaciones para usuFechaNacimiento
    if (!usuFechaNacimiento) {
        errors.usuFechaNacimiento = "Campo obligatorio"
    }

    return errors
}


export const validarStepTwoRegistro = (campos) => {
    const errors = {}
    const {
        usuId_ciudadResidencia, usuDireccion,
        usuCorreo, usuTelefono,
        usuPassword, usuPasswordConfirm } = campos

    //Validaciones para usuId_ciudadResidencia
    if (!usuId_ciudadResidencia) {
        errors.usuId_ciudadResidencia = true
    }

    //Validaciones para usuDireccion
    if (!usuDireccion) {
        errors.usuDireccion = "Campo obligatorio"
    } else {
        const RegExp = /^[A-Za-z0-9\s#-.]{1,50}$/
        if (!RegExp.test(usuDireccion)) {
            errors.usuDireccion = "Mínimo 1 y máximo 50 caracteres."
        }
    }

    //Validaciones para usuTelefono
    if (!usuTelefono) {
        errors.usuTelefono = "Campo obligatorio"
    } else {
        const RegExp = /^\D*\d{1,255}$/
        if (!RegExp.test(usuTelefono)) {
            errors.usuTelefono = "Solo se permiten números"
        } else {
            const RegExp = /^\D*\d{7,10}$/
            if (!RegExp.test(usuTelefono)) {
                errors.usuTelefono = "Mínimo 7 y máximo 10 dígitos."
            }
        }
    }

    //Validaciones para usuCorreo
    if (!usuCorreo) {
        errors.usuCorreo = "Campo obligatorio"
    } else {
        const RegExp = /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        if (!RegExp.test(usuCorreo)) {
            errors.usuCorreo = "El correo no es válido"
        }
    }

    //Validaciones para la usuPassword
    if (!usuPassword) {
        errors.usuPassword = "Campo obligatorio"
    } else {
        const RegExp = /^(?=.*\d).{4,20}$/
        if (!RegExp.test(usuPassword)) {
            errors.usuPassword = "La contraseña debe tener entre 4 y 20 caracteres y al menos un dígito."
        }
    }

    //Validaciones para la usuPasswordConfirm
    if (!usuPasswordConfirm) {
        errors.usuPasswordConfirm = "Campo obligatorio"
    } else {
        if (usuPassword !== usuPasswordConfirm) {
            if (!errors.usuPassword) { errors.usuPassword = "Las contraseñas deben ser iguales." }
            errors.usuPasswordConfirm = "Las contraseñas deben ser iguales."
        }
    }

    return errors
}