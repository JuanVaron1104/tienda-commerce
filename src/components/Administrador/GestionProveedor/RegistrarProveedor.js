import axios from 'axios';
import { useState } from 'react'
import { MensajeInformativo } from '../../common/Alerts';
import RegistroProveedor from './RegistroProveedor'

function RegistrarProveedor() {
    const [registerData, setRegisterData] = useState({});

    const handleChange = (event) => {
        setRegisterData({ ...registerData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async () => {
        try {
            const autenticado = await axios.post('http://localhost:5000/Proveedores/Nuevo', registerData)
            MensajeInformativo('REGISTRO COMPLETO', autenticado.data.message, 'success')
        } catch (error) {
            console.log(error)
            MensajeInformativo('ERROR', error.response.data.message, 'error')
        }
    }

    return (
        <RegistroProveedor
            registerData={registerData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    )
}

export default RegistrarProveedor
