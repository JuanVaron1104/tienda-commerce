import axios from 'axios'
import { useEffect, useState } from 'react'
import ReactTable from '../ReactTable'
import { MensajeInformativo } from '../../common/Alerts'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

function SolicitudEdicion() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)

    useEffect(() => {
        if (!(data)) {
            getClientes()
        }
    }, [data])

    const getClientes = async () => {
        try {
            const { data: clientes } = await axios.get("http://localhost:5000/Clientes/Solicitudes")
            setData(clientes)
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
                title="Solicitudes de edición de datos"
                descripcion="Estos son todas las solicitudes que han realizado los empleados para poder modificar datos de algún cliente."
                formID={"Identificación"}
                data={data}
                columnasAdicionales={2}
                columnasSinOrdenamiento={[]}
                Icon1={CheckCircleOutlineIcon}
                Icon2={HighlightOffIcon}
            />
    )
}

export default SolicitudEdicion
