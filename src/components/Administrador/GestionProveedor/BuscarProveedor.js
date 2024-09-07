import axios from 'axios'
import { useState, useEffect } from 'react'
import ReactTable from '../ReactTable'
import { MensajeInformativo } from '../../common/Alerts'
import EditIcon from '@material-ui/icons/Edit'

function BuscarProveedor() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)

    useEffect(() => {
        if (!(data)) {
            getProductos()
        }
    }, [data])

    const getProductos = async () => {
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
            title="Búsqueda de proveedor"
            descripcion="Puedes buscar los proveedores registrados por medio de su NIT, o su nombre."
            formID={"NIT"}
            data={data}
            columnasAdicionales={1}
            columnasSinFiltros={["Dirección", "Teléfono", "Estado" ]}
            columnasSinOrdenamiento={[]}
            Icon1={EditIcon}
        />
    )
}

export default BuscarProveedor
