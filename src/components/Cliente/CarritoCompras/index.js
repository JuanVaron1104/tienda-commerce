import axios from 'axios';
import Swal from 'sweetalert2';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

import Main from './Main';
import Basket from './Basket';
import { MensajeInformativo } from '../../common/Alerts'

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        background: '#F9f9f9',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

function CarritoCompras() {
    const classes = useStyles()
    const history = useHistory()
    const [products, setProductos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getProductosCarrito()
    }, [])

    const getProductosCarrito = async () => {
        try {
            const { data: productos } = await axios.get("http://localhost:5000/CarritoCompras", {
                params: {
                    id_usuarios: (localStorage.getItem('commerce_userID') || sessionStorage.getItem('commerce_userID'))
                }
            })
            setProductos(productos)
        } catch (error) {
            console.log(error)
            console.log(error.response)
            //MensajeInformativo('ERROR', error.response.data.message, 'error')
        } finally {
            setLoading(false)
        }
    }

    const onAdd = async (product) => {
        const exist = products.find((x) => x.proCodigo === product.proCodigo);
        if (exist) {
            try {
                await axios.put("http://localhost:5000/CarritoCompras", {
                    detcarId_producto: product.proCodigo,
                    detcarCantidad: product.detcarCantidad + 1,
                    detcarId_carrito: (localStorage.getItem('commerce_userID') || sessionStorage.getItem('commerce_userID'))
                })
            } catch (error) {
                console.error(error)
            }
            setProductos(
                products.map((x) =>
                    x.proCodigo === product.proCodigo ? { ...exist, detcarCantidad: exist.detcarCantidad + 1 } : x
                )
            )
        }
    }

    const onRemove = async (product) => {
        const exist = products.find((x) => x.proCodigo === product.proCodigo);
        if (exist.detcarCantidad === 1) {

            try {
                await axios.delete("http://localhost:5000/CarritoCompras", {
                    params: {
                        detcarId_producto: product.proCodigo,
                        detcarId_carrito: (localStorage.getItem('commerce_userID') || sessionStorage.getItem('commerce_userID'))
                    }
                })
            } catch (error) {
                console.error(error)
            }

            setProductos(products.filter((x) => x.proCodigo !== product.proCodigo));
        } else {
            try {
                await axios.put("http://localhost:5000/CarritoCompras", {
                    detcarId_producto: product.proCodigo,
                    detcarCantidad: product.detcarCantidad - 1,
                    detcarId_carrito: (localStorage.getItem('commerce_userID') || sessionStorage.getItem('commerce_userID'))
                })
            } catch (error) {
                console.error(error)
            }
            setProductos(
                products.map((x) =>
                    x.proCodigo === product.proCodigo ? { ...exist, detcarCantidad: exist.detcarCantidad - 1 } : x
                )
            )
        }
    }

    const handleDeleteProducto = async (proCodigo) => {
        try {
            await axios.delete("http://localhost:5000/CarritoCompras", {
                params: {
                    detcarId_producto: proCodigo,
                    detcarId_carrito: (localStorage.getItem('commerce_userID') || sessionStorage.getItem('commerce_userID'))
                }
            })

            setProductos(products.filter((x) => x.proCodigo !== proCodigo));
        } catch (error) {
            console.error(error)
        }
    }

    const handleSubmitComprar = async (venSubTotal, venValorIva, venTotalVenta) => {
        try {
            const { data: respuesta } = await axios.post("http://localhost:5000/Compras", {
                userID: (localStorage.getItem('commerce_userID') || sessionStorage.getItem('commerce_userID')),
                venSubTotal, venValorIva, venTotalVenta
            })

            if (respuesta.affectedRows > 0) {
                Swal.fire({
                    title: 'COMPRA REGISTRADA',
                    text: 'El producto llegara pronto a tu domicilio',
                    icon: 'success'
                }).then(() => history.go(0))
            } else {
                MensajeInformativo('ERROR', "", 'error')
            }
        } catch (error) {
            console.log(error)
            MensajeInformativo('ERROR', error.response.data.message, 'error')
        }
    }

    return (
        loading ? <h1>Loading...</h1>
            :
            <Card className={classes.root}>
                <CardContent>
                    <Typography
                        align="center"
                        variant="h1"
                        color="primary"
                        gutterBottom
                    >
                        Carrito de Compras
                    </Typography>
                    <div className={classes.row}>
                        <Main products={products} handleDeleteProducto={handleDeleteProducto} ></Main>
                        <Basket
                            cartItems={products}
                            onRemove={onRemove}
                            onAdd={onAdd}
                            handleSubmitComprar={handleSubmitComprar}
                        ></Basket>
                    </div>
                </CardContent>
            </Card>
    )
}

export default CarritoCompras
