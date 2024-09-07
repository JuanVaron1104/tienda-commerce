import { useState } from "react";
import axios from 'axios'
import CommonLayout from '../components/layouts/CommonLayout'
import RegisterComponent from "../components/Registro"
import { MensajeInformativo } from '../components/common/Alerts'

function RegisterView() {
    const [registerData, setRegisterData] = useState({});

    const sendRegister = async () => {
        try {
            const { usuPasswordConfirm, ...datosRegistro } = registerData
            const autenticado = await axios.post('http://localhost:5000/SignUp', datosRegistro)
            return MensajeInformativo('REGISTRO COMPLETO', autenticado.data.message, 'success')
        } catch (error) {
            console.log(error)
            return MensajeInformativo('ERROR', error.response.data.message, 'error')
        }
    }

    const handleChange = (event) => {
        setRegisterData({ ...registerData, [event.target.name]: event.target.value });
    };

    return (
        <CommonLayout>
            <RegisterComponent
                registerData={registerData}
                handleChange={handleChange}
                sendRegister={sendRegister}
            />
        </CommonLayout>
    )
}

export default RegisterView
