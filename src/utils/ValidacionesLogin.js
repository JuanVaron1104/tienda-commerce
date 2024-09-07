export const validarLogin = (campos) => {
    const errors = {}
    const { usuCorreo, usuPassword } = campos

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
    return errors
}