import { Container, Paper, Typography } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import ComprasPorDia from "./ComprasPorDia";
import GananciasPorDia from "./GananciasPorDia";

const useStyles = makeStyles((theme) => ({
    paper:{
        padding: 20
    },
    container:{
        marginTop: 300
    }
}));

function ReportesNegocio() {
    const classes = useStyles();
    return (
        <Container maxWidth="lg" className={classes.container}>
            <Typography color="primary" variant="h2" >
                REPORTES DEL NEGOCIO
            </Typography>

            <Typography align="center" >
                Información estadística de la aplicación
            </Typography>

            <Paper elevation={10}>
                <Typography color="secondary" variant="h6" >
                    COMPRAS POR DIA.
                </Typography>
                <ComprasPorDia />
            </Paper>
            <br />
            <br />
            <hr />
            <br />
            <br />
            <Paper elevation={10} className={classes.paper}>
                <Typography color="secondary" variant="h6" >
                    TOTAL DE VENTAS POR DIA
                </Typography>
                <GananciasPorDia />
            </Paper>

        </Container>
    )
}

export default ReportesNegocio
