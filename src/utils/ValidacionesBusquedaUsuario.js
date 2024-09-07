export const validacionesBusquedaUsuario = (campos) => {
    const errors = {}
    const { usuCorreo, usuNumeroDocumento } = campos

    if (usuCorreo === "" && usuNumeroDocumento === "") {
        errors.usuCorreo = "Alguno de los campos es requerido."
        errors.usuNumeroDocumento = "Alguno de los campos es requerido."
    }

    //Validaciones para usuCorreo
    if (usuCorreo) {
        const RegExp = /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        if (!RegExp.test(usuCorreo)) {
            errors.usuCorreo = "El correo no es válido"
        }
    }

    //Validaciones para usuNumeroDocumento
    if (usuNumeroDocumento) {
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

    return errors
}