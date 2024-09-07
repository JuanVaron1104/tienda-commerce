import axios from 'axios';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core'
import Compra from './Compra'
import { MensajeInformativo } from '../../common/Alerts';

const useStyles = makeStyles({
    intro: {
        boxShadow: '0 3px 5px 2px rgba(0,0,0,0.3)',
        background: 'linear-gradient(45deg, #C1C1C1 30%, #E5E5E5 90%)',
    }
});

function ComprasRecientes() {
    const classes = useStyles();

    const [compras, setCompras] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getComprasRecientes()
    }, [])

    const getComprasRecientes = async () => {
        try {
            const { data: compras } = await axios.get("http://localhost:5000/Compras/Recientes", {
                params: {
                    id_usuarios: (localStorage.getItem('commerce_userID') || sessionStorage.getItem('commerce_userID'))
                }
            })
            console.log(compras)
            setCompras(compras)
        } catch (error) {
            console.log(error)
            console.log(error.response)
            MensajeInformativo('ERROR', error.response.data.message, 'error')
        } finally {
            setLoading(false)
        }
    }

    return (
        loading ? <h6>Cargando...</h6>
            :
            <div>
                <Card className={classes.intro}>
                    <CardContent>
                        <Typography
                            variant="h5"
                            color="primary"
                            gutterBottom
                        >
                            Compras Recientes
                        </Typography>
                        <div className="grid">
                            {
                                compras.map((compra, index) => {
                                    return (
                                        <Compra
                                            key={index}
                                            id_venta={compra.id_venta}
                                            title={compra.titulo}
                                            fecha={compra.fecha}
                                            proCodigo={compra.proCodigo}
                                            proDisponibilidad={compra.proDisponibilidad}
                                            proFoto={compra.proFoto}
                                            proCantidad={compra.proCantidad}
                                        />)
                                })
                            }
                        </div>
                    </CardContent>
                </Card>
            </div>
    )
}

export default ComprasRecientes
