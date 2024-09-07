import axios from 'axios'
import { useState, useEffect } from 'react'
import ReactTable from '../ReactTable'
import { MensajeInformativo } from '../../common/Alerts'
import AllOutIcon from '@material-ui/icons/AllOut';
function VerProveedores() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)

    useEffect(() => {
        if (!(data)) {
            getProveedores()
        }
    }, [data])

    const getProveedores = async () => {
        try {
            const { data: productos } = await axios.get("http://localhost:5000/Proveedores")
            productos.forEach(producto => {
                delete producto.id_proveedor
            });
            setData(productos)
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
                title="Listado de proveedores"
                descripcion="Estos son todos los proveedores registrados en la aplicación."
                formID={"NIT"}
                data={data}
                columnasAdicionales={1}
                columnasSinOrdenamiento={[]}
                Icon1={AllOutIcon}
            />
    )
}

export default VerProveedores
