import { useState } from 'react'
import BuscarProductoForm from './BuscarProductoForm'
import BuscarProductoTable from './BuscarProductoTable';

function BuscarProducto() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)

    return (
        loading ? (
            <BuscarProductoForm
                url={"http://localhost:5000/Productos/Search"}
                setLoading={setLoading}
                setData={setData}
            />
        )
            :
            <BuscarProductoTable
                data={data}
            />
    )
}

export default BuscarProducto
