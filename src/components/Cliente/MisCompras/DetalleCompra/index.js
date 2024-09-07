import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { Button, Grid, Modal, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { MensajeInformativo } from '../../../common/Alerts';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    paper: {
        position: 'absolute',
        maxWidth: '60vw',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    productPaper: {
        marginTop: theme.spacing(1),
        display: 'flex',
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: '#F9F9F9'
    }
}));

function DetalleCompra() {
    const classes = useStyles()
    const [compra, setCompra] = useState({})
    const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState(false)
    const [openDetalleModal, setOpenDetalleModal] = useState(true)

    const history = useHistory();
    const { idCompra } = useParams()

    const handleCloseModal = () => {
        setOpenDetalleModal(false)
        history.goBack()
    }

    useEffect(() => {
        getCompra()
    },[])

    const getCompra = async () => {
        try {
            const { data: compras } = await axios.get("http://localhost:5000/Compra", {
                params: {
                    id_venta: idCompra
                }
            })

            const { productos, ...compra } = compras
            productos.unshift({proCodigo: "Codigo", detveCantidad :"Cantidad", proNombre:"Nombre"})
            setProductos(productos)
            setCompra(compra)

        } catch (error) {
            console.log(error)
            console.log(error.response)
            MensajeInformativo('ERROR', error.response.data.message, 'error')

        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            open={openDetalleModal}
            onClose={handleCloseModal}
            className={classes.modal}
        >
            <div className={classes.paper}>
                {

                    loading ? <h1>Cargando...</h1> :
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <img
                                    src={`http://localhost:5000/${compra.proFoto}`}
                                    width='100%'
                                    alt=""
                                />
                            </Grid>
                            <Grid container item xs={6}>
                                <Grid item xs={6}>
                                    <Typography color="primary">
                                        IDENTIFICADOR VENTA:
                                    </Typography>
                                    <Typography>
                                        {compra.id_venta}
                                    </Typography>
                                </Grid>

                                <Grid item xs={6}>
                                    <Typography color="primary">
                                        FECHA VENTA:
                                    </Typography>
                                    <Typography>
                                        {compra.venFechaventa}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography color="primary">
                                        CLIENTE:
                                    </Typography>
                                    <Typography>
                                        {`${compra.usuPrimerNombre} ${compra.usuPrimerApellido}  ${compra.usuSegundoApellido}`}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography color="primary">
                                        PRODUCTOS:
                                    </Typography>
                                    {
                                        productos.map((producto) => {
                                            return <Producto classes={classes} product={producto} />
                                        })
                                    }
                                </Grid>

                                <Grid item xs={4}>
                                    <Typography color="primary">
                                        SUBTOTAL
                                    </Typography>
                                    <Typography>
                                        {compra.venSubTotal}
                                    </Typography>
                                </Grid>

                                <Grid item xs={4}>
                                    <Typography color="primary">
                                        PAGO POR IVA
                                    </Typography>
                                    <Typography>
                                        {compra.venValorIva}
                                    </Typography>
                                </Grid>

                                <Grid item xs={4}>
                                    <Typography color="primary">
                                        TOTAL
                                    </Typography>
                                    <Typography>
                                        {compra.venTotalVenta}
                                    </Typography>
                                </Grid>


                                <Grid item xs={12}>
                                    <Button variant="contained" color="secondary" onClick={handleCloseModal} fullWidth>
                                        Volver
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                }
            </div>
        </Modal>
    )
}

const Producto = ({ classes, product }) => {
    return (
        <Paper className={classes.productPaper}>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    {
                        product.proCodigo
                    }
                </Grid>

                <Grid item xs={4}>
                    {
                        `${product.proNombre}`
                    }
                </Grid>

                <Grid item xs={4}>
                    {
                        product.detveCantidad
                    }
                </Grid>
            </Grid>
        </Paper>
    )
}

export default DetalleCompra
