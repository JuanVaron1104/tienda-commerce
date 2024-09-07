import { useState } from 'react';
import { Typography } from '@material-ui/core';
import BarraDeBusqueda from './BarraDeBusqueda';
import BarraDeFiltros from './BarraDeFiltros';
import ListadoDeProductos from './ListadoDeProductos';

function Productos() {
    const [filtros, setFiltros] = useState({})

    const handleChange = (event) => {
        setFiltros({ ...filtros, [event.target.name]: event.target.value });
    };

    const clearFilters = () => {
        setFiltros({})
    }

    return (
        <>
            <Typography
                align="center"
                variant="h1"
                color="primary"
                gutterBottom
            >
                Conoce nuestros productos
            </Typography>

            <BarraDeBusqueda
                filtros={filtros}
                handleChange={handleChange}
            />
            <BarraDeFiltros
                filtros={filtros}
                handleChange={handleChange}
                clearFilters={clearFilters}
            />
            <ListadoDeProductos
                filtros={filtros}
            />
        </>
    )
}

export default Productos
