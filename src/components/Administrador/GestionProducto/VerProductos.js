import axios from 'axios'
import { useState, useEffect } from 'react'
import ReactTable from '../ReactTable'
import { MensajeInformativo } from '../../common/Alerts'

function VerProductos() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)

    useEffect(() => {
        if (!(data)) {
            getProductos()
        }
    }, [data])

    const getProductos = async () => {
        try {
            const { data: productos } = await axios.get("http://localhost:5000/Productos")

            let newProductos = []
            productos.forEach(producto => {
                const {proFoto, ...restProducto} = producto
                newProductos.push(restProducto)
            });

            setData(newProductos)
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
                title="Listado de productos"
                descripcion="Estos son todos los productos registrados en la aplicación."
                formID={"id_producto"}
                data={data}
                columnasSinOrdenamiento={[]}
                columnasSinFiltros={["Precio", "Cantidad", "Disponibilidad"]}
            />
    )
}

export default VerProductos
