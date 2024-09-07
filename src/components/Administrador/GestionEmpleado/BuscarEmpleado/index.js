import { useState } from 'react'
import BuscarUsuario from '../../BuscadorUsuario';
import BuscarEmpleadoTable from './BuscarEmpleadoTable';

function BuscarEmpleado() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)

    return (
        loading ? (
            <BuscarUsuario
                url={"http://localhost:5000/Empleados/Search"}
                setLoading={setLoading}
                setData={setData}
            />
        )
            :
            <BuscarEmpleadoTable
                data={data}
            />
    )
}

export default BuscarEmpleado
