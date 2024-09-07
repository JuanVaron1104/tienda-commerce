import { useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'

import Header from '../components/Cliente/Header/'
import MisCompras from '../components/Cliente/MisCompras/'
import Productos from '../components/Cliente/Productos/'
import MiPerfil from '../components/Cliente/EditarPerfil/'
import MiCarrito from '../components/Cliente/CarritoCompras/'
import DetalleProducto from '../components/Cliente/Productos/DetalleProducto';
import DetalleCompra from '../components/Cliente/MisCompras/DetalleCompra/';
import PageNotFound from '../components/common/Errors/404'

function HomeCliente() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (

        <Switch>
            <Route
                exact
                path="/"
                render={() => {
                    return (
                        <Redirect to="/Productos" />
                    )
                }}
            />
            <Route exact path="/Productos/:idProducto">
                <Header
                    value={value}
                    handleChange={handleChange}
                />
                <DetalleProducto />
            </Route>
            <Route exact path="/Compras/:idCompra">
                <Header
                    value={value}
                    handleChange={handleChange}
                />
                <DetalleCompra />
            </Route>
            <Route path="/Productos">
                <Header
                    value={value}
                    handleChange={handleChange}
                />
                <Productos />
            </Route>
            <Route exact path="/Carrito">
                <Header
                    value={value}
                    handleChange={handleChange}
                />
                <MiCarrito />
            </Route>
            <Route exact path="/Compras">
                <Header
                    value={value}
                    handleChange={handleChange}
                />
                <MisCompras />
            </Route>
            <Route path="/Perfil">
                <Header
                    value={value}
                    handleChange={handleChange}
                />
                <MiPerfil />
            </Route>
            <Route path="*" component={PageNotFound} />
        </Switch>

    )
}

export default HomeCliente
