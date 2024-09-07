import Swal from 'sweetalert2';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';

import { MensajeInformativo } from '../../common/Alerts';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        maxWidth: 300
    },
    button: {
        width: '50%'
    }
});

function Producto({ item }) {
    const classes = useStyles()
    const history = useHistory()

    const handleOpenModal = () => {
        history.push(`/productos/${item.Codigo}`)
    }

    const handleSubmitComprar = async () => {
        if ( localStorage.getItem('commerce_userID') || sessionStorage.getItem('commerce_userID') ) {
            handleSubmitAddToCarrito();
            history.push("/carrito")
        } else {
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

    const handleSubmitAddToCarrito = async (cantidad = 1) => {
        if (item.Cantidad >= cantidad && cantidad > 0) {
            try {
                const { data: respuesta } = await axios.post("http://localhost:5000/CarritoCompras", {
                    detcarId_producto: item.Codigo,
                    detcarCantidad: cantidad,
                    detcarId_carrito: (localStorage.getItem('commerce_userID') || sessionStorage.getItem('commerce_userID'))
                })

                if (respuesta.affectedRows > 0) {
                    MensajeInformativo('AÑADIDO CORRECTAMENTE', 'El producto fue agregado a tu carrito de compras', 'success')
                } else {
                    MensajeInformativo('ERROR', "", 'error')
                }
            } catch (error) {
                console.log(error)
                MensajeInformativo('ERROR', error.response.data.message, 'error')
            }
        } else {
            return new Error()
        }
    }

    return (
        <>
            <Card className={classes.root}>
                <CardActionArea onClick={handleOpenModal}>
                    <CardMedia
                        component="img"
                        alt={item.Producto}
                        height="250"
                        image={`http://localhost:5000/${item.proFoto}`}
                        title={item.Producto}
                    />

                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {item.Producto}
                        </Typography>
                        <Typography variant="body2" color="textPrimary" component="p">
                            {
                                `$${item.Precio}`
                            }
                        </Typography>
                        <Typography variant="caption" color="textSecondary" component="p">
                            {
                                item.Disponibilidad
                            }
                        </Typography>
                    </CardContent>
                </CardActionArea>

                <CardActions>
                    <Button size="small" color="secondary" className={classes.button} onClick={handleOpenModal}>
                        Detalles
                    </Button>
                    <Button
                        size="small"
                        color="primary"
                        className={classes.button}
                        onClick={handleSubmitComprar}
                        disabled={item.Disponibilidad === "Agotado"}
                    >
                        Comprar
                    </Button>
                </CardActions>
            </Card>
        </>

    );
}

export default Producto
