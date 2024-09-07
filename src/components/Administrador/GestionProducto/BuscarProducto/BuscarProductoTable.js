import ReactTable from '../../ReactTable'
import EditIcon from '@material-ui/icons/Edit';

function BuscarProducto({data}) {
    return (
        <ReactTable
            title="Búsqueda de producto"
            descripcion="Puedes filtrar los productos registrados por medio de su código, o su nombre."
            formID={"Cedula"}
            data={data}
            columnasAdicionales={1}
            columnasSinFiltros={["Precio", "Cantidad", "Disponibilidad"]}
            columnasSinOrdenamiento={[]}
            Icon1={EditIcon}
        />
    )
}

export default BuscarProducto
