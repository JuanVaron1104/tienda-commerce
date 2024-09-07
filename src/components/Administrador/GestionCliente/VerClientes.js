import axios from 'axios'
import { useEffect, useState } from 'react'
import ReactTable from '../ReactTable'
import { MensajeInformativo } from '../../common/Alerts'
import AllOutIcon from '@material-ui/icons/AllOut'

function VerClientes() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)

    useEffect(() => {
        if (!(data)) {
            getClientes()
        }
    }, [data])

    const getClientes = async () => {
        try {
            const { data: clientes } = await axios.get("http://localhost:5000/Clientes")
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

            data.length > 0 ?
                <ReactTable
                    title="Listado de clientes"
                    descripcion="Estos son todos los clientes registrados en la aplicación."
                    formID={"Identificación"}
                    data={data}
                    columnasAdicionales={1}
                    columnasSinOrdenamiento={[]}
                    Icon1={AllOutIcon}
                />
                :
                <h1>No se encontró ningún cliente</h1>
    )
}

export default VerClientes
