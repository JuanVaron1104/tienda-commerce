import axios from 'axios'
import { useState, useEffect } from 'react'
import ReactTable from '../ReactTable'
import { MensajeInformativo } from '../../common/Alerts'
import AllOutIcon from '@material-ui/icons/AllOut';

function VerCliente() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)

    useEffect(() => {
        if (!(data)) {
            getEmpleados()
        }
    }, [data])

    const getEmpleados = async () => {
        try {
            const { data: empleados } = await axios.get("http://localhost:5000/Empleados")
            setData(empleados)
        } catch (error) {
            console.log(error)
            console.log(error.response)
            return MensajeInformativo('ERROR', error.response.data.message, 'error')
        } finally {
            setLoading(false)
        }
    }

    return (
        loading ? <h1>Cargando...</h1> :
            <ReactTable
                title="Listado de empleados"
                descripcion="Estos son todos los empleados registrados en la aplicación."
                formID={"Identificación"}
                data={data}
                columnasAdicionales={1}
                columnasSinOrdenamiento={[]}
                Icon1={AllOutIcon}
            />
    )
}

export default VerCliente
