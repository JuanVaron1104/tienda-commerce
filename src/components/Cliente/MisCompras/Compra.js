import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Button, CardActions } from '@material-ui/core'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core'
import { MensajeInformativo } from '../../common/Alerts';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        maxWidth: 300
    },
    image: {
        background: '#EDEDED',
        width: '15rem',
    },
    media: {
        height: '10rem',
    },
    button: {
        width: '50%'
    }
});

function Compra({ id_venta, title, fecha, proCodigo, proFoto, proCantidad }) {
    const classes = useStyles();
    const history = useHistory()

    const handleOpenModal = () => {
        history.push(`/compras/${id_venta}`)
    }

    const handleSubmitAddToCarrito = async (event, cantidad = 1) => {
        if (proCantidad >= cantidad && cantidad > 0) {
            try {
                const { data: respuesta } = await axios.post("http://localhost:5000/CarritoCompras", {
                    detcarId_producto: proCodigo,
                    detcarCantidad: cantidad,
                    detcarId_carrito: (localStorage.getItem('proyecto_tps103_userID') || sessionStorage.getItem('proyecto_tps103_userID'))
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
        <Card className={classes.root}>
            <CardActionArea onClick={handleOpenModal}>
                <CardMedia
                    className={classes.media}
                    image={`http://localhost:5000/${proFoto}`}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <b>Fecha compra: </b>
                        {fecha}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button
                    size="small"
                    color="primary"
                    className={classes.button}
                    onClick={handleSubmitAddToCarrito}
                >
                    Añadir al carrito
                </Button>
                <Button
                    size="small"
                    color="primary"
                    className={classes.button}
                    onClick={handleOpenModal}
                >
                    Ver Detalles
                </Button>
            </CardActions>
        </Card>
    )
}

export default Compra
