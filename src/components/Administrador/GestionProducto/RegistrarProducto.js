import axios from 'axios';
import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { MensajeInformativo } from '../../common/Alerts';
import RegistroProducto from './RegistroProducto'

function RegistrarProducto() {
    const [registerData, setRegisterData] = useState({});
    const history = useHistory()

    const handleChange = (event) => {
        if (event?.target?.name) {
            setRegisterData({ ...registerData, [event.target.name]: event.target.value });
        } else {
            setRegisterData({ ...registerData, proFoto: event });
        }
    };

    const handleSubmit = async () => {
        const { proCantidad, proCodigo, proDescripcion, proDisponibilidad, proId_linea, proId_proveedor, proIva, proNombre, proPrecio, proFoto } = registerData

        const form = new FormData();

        form.append('proCantidad', proCantidad);
        form.append('proCodigo', proCodigo);
        form.append('proDescripcion', proDescripcion);
        form.append('proDisponibilidad', proDisponibilidad);
        form.append('proId_linea', proId_linea);
        form.append('proId_proveedor', proId_proveedor);
        form.append('proIva', proIva);
        form.append('proNombre', proNombre);
        form.append('proPrecio', proPrecio);
        form.append('files', proFoto[0]);

        try {
            const autenticado = await axios.post('http://localhost:5000/Productos/Nuevo', form)
            Swal.fire({
                title: 'REGISTRO COMPLETO',
                text:autenticado.data.message,
                icon: 'success'
            }).then(() => history.go(0))
            
        } catch (error) {
            console.log(error)
            return MensajeInformativo('ERROR', error.response.data.message, 'error')
        }
    }

    return (
        <RegistroProducto
            registerData={registerData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    )
}

export default RegistrarProducto
