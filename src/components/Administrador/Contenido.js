import VerClientes from './GestionCliente/VerClientes'
import BuscarCliente from './GestionCliente/BuscarCliente/'
import SolicitudEdicion from './GestionCliente/SolicitudEdicion'
import VerEmpleados from './GestionEmpleado/VerEmpleados'
import BuscarEmpleado from './GestionEmpleado/BuscarEmpleado/'
import RegistrarEmpleado from './GestionEmpleado/RegistrarEmpleado'
import VerProductos from './GestionProducto/VerProductos'
import BuscarProducto from './GestionProducto/BuscarProducto/'
import RegistrarProducto from './GestionProducto/RegistrarProducto'
import VerProvedores from './GestionProveedor/VerProvedores'
import BuscarProveedor from './GestionProveedor/BuscarProveedor'
import RegistrarProveedor from './GestionProveedor/RegistrarProveedor'
import ReportesCliente from './GestionReporte/ReportesCliente'
import ReportesEmpleado from './GestionReporte/ReportesEmpleado'
import ReportesNegocio from './GestionReporte/ReportesNegocio'
import { Redirect, Route, Switch } from 'react-router-dom'

function Contenido() {
    return (
        <Switch>
            <Route
                exact
                path="/Administrador"
                render={() => {
                    return (
                        <Redirect to="/Administrador/Clientes/Buscar" />
                    )
                }}
            />
            <Route path="/Administrador/Clientes/Buscar" component={BuscarCliente} />
            <Route path="/Administrador/Clientes/Ver" component={VerClientes} />
            <Route path="/Administrador/Clientes/Solicitudes" component={SolicitudEdicion} />
            <Route path="/Administrador/Empleados/Buscar" component={BuscarEmpleado} />
            <Route path="/Administrador/Empleados/Ver" component={VerEmpleados} />
            <Route path="/Administrador/Empleados/Registro" component={RegistrarEmpleado} />
            <Route path="/Administrador/Productos/Buscar" component={BuscarProducto} />
            <Route path="/Administrador/Productos/Ver" component={VerProductos} />
            <Route path="/Administrador/Productos/Registro" component={RegistrarProducto} />
            <Route path="/Administrador/Proveedores/Buscar" component={BuscarProveedor} />
            <Route path="/Administrador/Proveedores/Ver" component={VerProvedores} />
            <Route path="/Administrador/Proveedores/Registro" component={RegistrarProveedor} />
            <Route path="/Administrador/Reportes/Cliente" component={ReportesCliente} />
            <Route path="/Administrador/Reportes/Empleado" component={ReportesEmpleado} />
            <Route path="/Administrador/Reportes/Negocio" component={ReportesNegocio} />
        </Switch>
    )
}

export default Contenido
