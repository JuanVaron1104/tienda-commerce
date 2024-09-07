import { useState } from 'react'
import axios from 'axios'
import { MensajeInformativo } from '../../common/Alerts'
import RegisterComponent from '../../Registro'

function RegistrarEmpleado() {
    const [registerData, setRegisterData] = useState({});

    const sendRegister = async () => {
        try {
            const { usuPasswordConfirm, ...datosRegistro } = registerData
            const autenticado = await axios.post('http://localhost:5000/Empleado/SignUp', datosRegistro)
            return MensajeInformativo('EMPLEADO REGISTRADO CORRECTAMENTE', autenticado.data.message, 'success')
        } catch (error) {
            console.log(error)
            return MensajeInformativo('ERROR', error.response.data.message, 'error')
        }
    }

    const handleChange = (event) => {
        setRegisterData({ ...registerData, [event.target.name]: event.target.value });
    };

    return (
        <RegisterComponent
            title={"Registro de Empleado"}
            showLoginLabel={false}
            registerData={registerData}
            sendRegister={sendRegister}
            handleChange={handleChange}
        />
    )
}

export default RegistrarEmpleado
