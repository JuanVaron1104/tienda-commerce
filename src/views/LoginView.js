import Swal from 'sweetalert2'
import axios from 'axios'
import { useEffect, useState } from 'react'
import CommonLayout from '../components/layouts/CommonLayout'
import LoginComponent from "../components/Login"
import { MensajeInformativo } from '../components/common/Alerts'
import { useHistory } from 'react-router-dom'


const definirEnturamiento = (usuId_role) => {
    if (usuId_role === 1) {
        return ("/Empleados")
    } else if (usuId_role === 2) {
        return ("/Administrador")
    } else {
        return ("/Productos")
    }
}

function LoginView() {
    const [loginData, setLoginData] = useState({});
    const history = useHistory()

    useEffect(() => {
        const usuRole = localStorage.getItem("proyecto_tps103_userRole") || sessionStorage.getItem("proyecto_tps103_userRole")
        if (usuRole) {
            Swal.fire({
                title: "Ya has iniciado sesión",
                icon: "error",
                iconColor: "#9a66a8",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#9a66a8",
                showConfirmButton: true,
            }).then(() => {
                history.push(definirEnturamiento(usuRole))
            });
        }
    },[])

    const handleSubmit = async () => {
        try {
            const { data } = await axios.post('http://localhost:5000/Login', loginData)
            if (loginData.saveSession) {
                localStorage.setItem('proyecto_tps103_userID', data.id_usuarios)
                localStorage.setItem('proyecto_tps103_userRole', data.usuId_role)
                localStorage.setItem('proyecto_tps103_username', data.username)

            } else {
                sessionStorage.setItem('proyecto_tps103_userID', data.id_usuarios)
                sessionStorage.setItem('proyecto_tps103_userRole', data.usuId_role)
                sessionStorage.setItem('proyecto_tps103_username', data.username)
            }
            const { usuId_role } = data
            history.push(definirEnturamiento(usuId_role))
        } catch (error) {
            console.log(error)
            console.log(error.response)

            return MensajeInformativo('ERROR', error.response.data.message, 'error')
        }
    }

    const handleChange = (event) => {
        if (event.target.name === "saveSession") {
            setLoginData({ ...loginData, [event.target.name]: event.target.checked });
        } else {
            setLoginData({ ...loginData, [event.target.name]: event.target.value });
        }
    };

    return (
        <CommonLayout>
            <LoginComponent
                loginData={loginData}
                handleChange={handleChange}
                handleSubmitLogin={handleSubmit}
            />
        </CommonLayout>
    )
}

export default LoginView
