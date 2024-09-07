import axios from 'axios';
import { Grid } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { MensajeInformativo } from '../../common/Alerts';
import Producto from './Producto'

function ListadoDeProductos({ filtros }) {
    const [loading, setLoading] = useState(true)
    const [productos, setProductos] = useState(null)

    useEffect(() => {
        getProductos()
    }, [])

    const getProductos = async () => {
        try {
            const { data: productos } = await axios.get("http://localhost:5000/Productos", {
                params: {
                    searchField: filtros.searchField,
                    proveedor: filtros.proveedor,
                    linea: filtros.linea,
                    precio: filtros.precio
                }
            })
            setProductos(productos)
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
            productos.length > 0 ?
                <Grid container spacing={3}>
                    {
                        productos.map((value, index) => {
                            return <Grid item key={index} xs={12} sm={6} md={4} lg={3} >
                                <Producto item={value} />
                            </Grid>
                        })
                    }
                </Grid>
                :
                <div>
                    No hay Productos....
                </div>
    )
}

export default ListadoDeProductos
