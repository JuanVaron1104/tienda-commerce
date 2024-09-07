export const validarRegistroProveedor = (campos) => {
    const errors = {}
    const {
        provNombre, provNit,
        provDireccion, provCorreo,
        provTelefono, provActivo } = campos

    //Validaciones para provNombre
    if (!provNombre) {
        errors.provNombre = "Campo obligatorio"
    } else {
        const RegExp = /[\w \s !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{1,255}$/
        if (!RegExp.test(provNombre)) {
            errors.provNombre = "Solo se permiten letras"
        } else {
            const RegExp = /[\w \s !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{1,50}$/
            if (!RegExp.test(provNombre)) {
                errors.provNombre = "Mínimo 1 y máximo 50 caracteres."
            }
        }
    }

    //Validaciones para provNit
    if (!provNit) {
        errors.provNit = "Campo obligatorio"
    } else {
        const RegExp = /^\D*\d{1,255}$/
        if (!RegExp.test(provNit)) {
            errors.provNit = "Solo se permiten números"
        } else {
            const RegExp = /^\D*\d{1,11}$/
            if (!RegExp.test(provNit)) {
                errors.provNit = "Mínimo 1 y máximo 11 dígitos."
            }
        }
    }

    //Validaciones para provDireccion
    if (!provDireccion) {
        errors.provDireccion = "Campo obligatorio"
    } else {
        const RegExp = /^[A-Za-z0-9\s#-.]{1,50}$/
        if (!RegExp.test(provDireccion)) {
            errors.provDireccion = "Mínimo 1 y máximo 50 caracteres."
        }
    }

    //Validaciones para provCorreo
    if (!provCorreo) {
        errors.provCorreo = "Campo obligatorio"
    } else {
        const RegExp = /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        if (!RegExp.test(provCorreo)) {
            errors.provCorreo = "El correo no es válido"
        }
    }

    //Validaciones para provTelefono
    if (!provTelefono) {
        errors.provTelefono = "Campo obligatorio"
    } else {
        const RegExp = /^\D*\d{1,255}$/
        if (!RegExp.test(provTelefono)) {
            errors.provTelefono = "Solo se permiten números"
        } else {
            const RegExp = /^\D*\d{7,10}$/
            if (!RegExp.test(provTelefono)) {
                errors.provTelefono = "Mínimo 7 y máximo 10 dígitos."
            }
        }
    }

    //Validaciones para provActivo
    if (!provActivo) {
        errors.provActivo = true
    }

    return errors
}