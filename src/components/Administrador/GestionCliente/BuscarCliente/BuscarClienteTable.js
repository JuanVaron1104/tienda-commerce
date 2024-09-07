import ReactTable from '../../ReactTable'
import EditIcon from '@material-ui/icons/Edit'

function BuscarClienteTable({ data = [] }) {
    if (data.length > 0) {
        return (<ReactTable
            title="Búsqueda de cliente"
            descripcion="Puedes buscar los clientes registrados por medio de su cedula, o su nombre."
            formID={"Identificación"}
            data={data}
            columnasAdicionales={1}
            columnasSinFiltros={["Tipo", "Primer nombre", "Segundo nombre", "Primer apellido", "Segundo apellido", "Teléfono"]}
            columnasSinOrdenamiento={[]}
            Icon1={EditIcon}
        />)
    } else {
        return (
            <h1>No se encontró ningún cliente</h1>
        )
    }
}

export default BuscarClienteTable
