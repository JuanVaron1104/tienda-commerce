export const ValidacionesRegistroProducto = (campos) => {
    const errors = {}
    const {
        proNombre, proDescripcion, proCodigo,
        proId_proveedor, proId_linea, proFoto,
        proPrecio, proCantidad, proIva, proDisponibilidad } = campos

    //Validaciones para proNombre
    if (!proNombre) {
        errors.proNombre = "Campo obligatorio"
    } else {
        const RegExp = /[\w \s !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{1,255}$/
        if (!RegExp.test(proNombre)) {
            errors.proNombre = "Solo se permiten letras"
        } else {
            const RegExp = /[\w \s !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{1,30}$/
            if (!RegExp.test(proNombre)) {
                errors.proNombre = "Mínimo 1 y máximo 30 caracteres."
            }
        }
    }

    //Validaciones para proDescripcion
    if (!proDescripcion) {
        errors.proDescripcion = "Campo obligatorio"
    } else {
        const RegExp = /[\w \s !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{1,255}$/
        if (!RegExp.test(proDescripcion)) {
            errors.proDescripcion = "Solo se permiten letras"
        } else {
            const RegExp = /[\w \s !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{1,200}$/
            if (!RegExp.test(proDescripcion)) {
                errors.proDescripcion = "Mínimo 1 y máximo 200 caracteres."
            }
        }
    }

    //Validaciones para proId_proveedor
    if (!proId_proveedor) {
        errors.proId_proveedor = true
    }

    //Validaciones para proId_linea
    if (!proId_linea) {
        errors.proId_linea = true
    }

    //Validaciones para proPrecio
    if (!proPrecio) {
        errors.proPrecio = "Campo obligatorio"
    } else {
        const RegExp = /^\D*\d{1,255}$/
        if (!RegExp.test(proPrecio)) {
            errors.proPrecio = "Solo se permiten números"
        }
    }

    //Validaciones para proCodigo
    if (!proCodigo) {
        errors.proCodigo = "Campo obligatorio"
    } else {
        const RegExp = /^\D*\d{1,255}$/
        if (!RegExp.test(proCodigo)) {
            errors.proCodigo = "Solo se permiten números"
        }
    }

    //Validaciones para proIva
    if (!proIva) {
        errors.proIva = "Campo obligatorio"
    } else {
        const RegExp = /^\D*\d{1,255}$/
        if (!RegExp.test(proIva)) {
            errors.proIva = "Solo se permiten números"
        }
    }

    //Validaciones para proCantidad
    if (!proCantidad) {
        errors.proCantidad = "Campo obligatorio"
    } else {
        const RegExp = /^\D*\d{1,255}$/
        if (!RegExp.test(proCantidad)) {
            errors.proCantidad = "Solo se permiten números"
        }
    }

    //Validaciones para proDisponibilidad
    if (!proDisponibilidad) {
        errors.proDisponibilidad = true
    }

    //Validaciones para proFoto
    if (proFoto.length === 0) {
        errors.proFoto = true
    }

    return errors
}