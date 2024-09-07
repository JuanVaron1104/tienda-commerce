import { useState } from 'react'
import BuscarUsuario from '../../BuscadorUsuario';
import BuscarClienteTable from './BuscarClienteTable';

function BuscarCliente() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)

    return (
        loading ? (
            <BuscarUsuario
                url={"http://localhost:5000/Clientes/Search"}
                setLoading={setLoading}
                setData={setData}
            />
        )
            :
            <BuscarClienteTable
                data={data}
            />
    )
}

export default BuscarCliente
