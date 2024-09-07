import Swal from 'sweetalert2';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { Button, Grid, Modal, Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MensajeInformativo } from '../../../common/Alerts';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paper: {
        position: 'absolute',
        maxWidth: '60vw',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    button: {
        width: 'calc(50% - 10px)',
        margin: '10px 5px'
    },
    input: {
        display: 'flex',
        alignItems: 'center'
    },
    inputNumber: {
        marginLeft: 10
    }
}));

function DetalleProducto() {
    const classes = useStyles()
    const [loading, setLoading] = useState(true)
    const [producto, setProducto] = useState(null)
    const [cantidad, setCantidad] = useState(1)
    const [error, setError] = useState(false)
    const [openDetalleModal, setOpenDetalleModal] = useState(true)

    const history = useHistory();
    let { idProducto } = useParams()

    useEffect(() => {
        if (producto === null) {
            getProducto()
        }
    }, [producto])

    const handleChange = (event) => {
        setCantidad(event.target.value)
        setError(false)
    }

    const handleCloseModal = () => {
        setOpenDetalleModal(false)
    }

    const handleSubmitAddToCarrito = async () => {
        if (localStorage.getItem('commerce_userID') || sessionStorage.getItem('commerce_userID')) {
            if (producto.proCantidad >= cantidad && cantidad > 0) {
                try {
                    const { data: respuesta } = await axios.post("http://localhost:5000/CarritoCompras", {
                        detcarId_producto: idProducto,
                        detcarCantidad: cantidad,
                        detcarId_carrito: (localStorage.getItem('commerce_userID') || sessionStorage.getItem('commerce_userID'))
                    })
                    handleCloseModal()
                    history.push("/productos")

                    if (respuesta.affectedRows > 0) {
                        MensajeInformativo('AÑADIDO CORRECTAMENTE', 'El producto fue agregado a tu carrito de compras', 'success')
                    } else {
                        MensajeInformativo('ERROR', "", 'error')
                    }
                } catch (error) {
                    console.log(error)
                    handleCloseModal()
                    history.push("/productos")
                    MensajeInformativo('ERROR', error.response.data.message, 'error')
                }
            } else {
                setError(true)
            }
        } else {
            handleCloseModal()
            Swal.fire({
                title: "Debes iniciar sesión primero",
                icon: "error",
                iconColor: "#9a66a8",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#9a66a8",
                showConfirmButton: true,
            }).then(() => history.push("/Login"))
        }
    }

    const handleSubmitComprar = async () => {
        if (localStorage.getItem('commerce_userID') || sessionStorage.getItem('commerce_userID')) {
            handleSubmitAddToCarrito().then(() => history.push("/carrito"))
        } else {
            handleCloseModal()
            Swal.fire({
                title: "Debes iniciar sesión primero",
                icon: "error",
                iconColor: "#9a66a8",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#9a66a8",
                showConfirmButton: true,
            }).then(() => history.push("/Login"))
        }
    }

    const getProducto = async () => {
        try {
            const URL = `http://localhost:5000/Producto/${idProducto}`
            const { data } = await axios.get(URL)
            const producto = data[0]
            setProducto(producto)
        } catch (error) {
            console.log(error)
            console.log(error.response)
            return MensajeInformativo('ERROR', error.response.data.message, 'error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            open={openDetalleModal}
            onClose={() => { handleCloseModal(); history.push("/productos") }}
            className={classes.modal}
        >
            <div className={classes.paper}>
                {
                    loading ? <h1>Cargando...</h1> :
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <img
                                    src={`http://localhost:5000/${producto.proFoto}`}
                                    width='100%'
                                    alt={`${producto.proNombre}`}
                                />
                            </Grid>
                            <Grid container item xs={6}>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                        onClick={() => {
                                            handleCloseModal()
                                            history.push("/productos")
                                        }}
                                    >
                                        Volver
                                    </Button>
                                </Grid>

                                <Grid item xs={12} >
                                    <Typography variant="h4">
                                        {producto.proNombre}
                                    </Typography>
                                </Grid>

                                <Grid item xs={6} >
                                    <Typography variant="subtitle1">
                                        PRECIO
                                    </Typography>
                                    <Typography variant="caption">
                                        {`$ ${producto.proPrecio}`}
                                    </Typography>
                                </Grid>

                                <Grid item xs={6}>
                                    <Typography variant="subtitle1">
                                        IVA
                                    </Typography>
                                    <Typography variant="caption">
                                        {`${producto.proIva}%`}
                                    </Typography>
                                </Grid>

                                <Grid item xs={6}>
                                    <Typography variant="subtitle1">
                                        PROVEEDOR
                                    </Typography>
                                    <Typography variant="caption">
                                        {producto.proId_proveedor}
                                    </Typography>
                                </Grid>

                                <Grid item xs={6}>
                                    <Typography variant="subtitle1">
                                        LINEA
                                    </Typography>
                                    <Typography variant="caption">
                                        {producto.proId_linea}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="subtitle1">
                                        DESCRIPCIÓN
                                    </Typography>
                                    <Typography variant="caption">
                                        {producto.proDescripcion}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="subtitle1">
                                        DISPONIBILIDAD
                                    </Typography>
                                    <Typography variant="caption">
                                        {producto.proDisponibilidad}
                                    </Typography>
                                </Grid>

                                {
                                    producto.proDisponibilidad === "Disponible" && (
                                        <>
                                            <Grid item xs={12}>
                                                <Typography variant="subtitle1">
                                                    UNIDADES DISPONIBLES
                                                </Typography>
                                                <Typography variant="caption">
                                                    {producto.proCantidad}
                                                </Typography>
                                            </Grid>

                                            <Grid item xs={12} className={classes.input}>
                                                <Typography variant="subtitle1">
                                                    CANTIDAD
                                                </Typography>
                                                <TextField className={classes.inputNumber}
                                                    error={error ? true : false}
                                                    type="number"
                                                    variant="standard"
                                                    value={cantidad}
                                                    helperText={error ? `El valor excede la cantidad disponible` : ``}
                                                    onChange={handleChange}
                                                ></TextField>
                                            </Grid>
                                        </>
                                    )
                                }

                                <Grid container item xs={12} >
                                    <Button
                                        size="small"
                                        color="secondary"
                                        variant="contained"
                                        className={classes.button}
                                        disabled={producto.proDisponibilidad === "Agotado"}
                                        onClick={handleSubmitAddToCarrito}
                                    >
                                        Añadir al carrito
                                    </Button>

                                    <Button
                                        size="small"
                                        color="primary"
                                        variant="contained"
                                        className={classes.button}
                                        disabled={producto.proDisponibilidad === "Agotado"}
                                        onClick={handleSubmitComprar}
                                    >
                                        Comprar
                                    </Button>
                                </Grid>

                            </Grid>
                        </Grid>
                }
            </div>
        </Modal>
    )
}

export default DetalleProducto
