import Swal from 'sweetalert2'

const confirmButtonColor = '#3085d6'
const cancelButtonColor = '#d33'

export const MensajeInformativo = (
    titulo,
    textoDescriptivo = '',
    variableIcono
) => {
    return (
        Swal.fire({
            title: titulo,
            text: textoDescriptivo,
            icon: variableIcono
        })
    )
}

export const MensajeConfirmacionSimple = (
    titulo,
    textoDescriptivo,
    variableIcono,
    onConfirm = () => { }
) => {
    return (
        Swal.fire({
            title: titulo,
            text: textoDescriptivo,
            icon: variableIcono,
            showCancelButton: true,
            confirmButtonColor: confirmButtonColor,
            cancelButtonColor: cancelButtonColor,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Confirmar'
        }).then((result) => {
            if (result.isConfirmed) {
                onConfirm()
            }
        })
    )
}

export const MensajeSimpleSinDescripcion = (titulo) => {
    Swal.fire(titulo)
}