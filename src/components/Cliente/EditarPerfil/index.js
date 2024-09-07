import { Avatar, Box, Card, Container, Divider, List, ListItem, ListItemText, Typography } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { MensajeInformativo } from "../../common/Alerts";
import DatosContacto from './DatosContacto/'
import DatosPersonales from './DatosPersonales/'
import SeguridadCuenta from './SeguridadCuenta/'

const useStyles = makeStyles((theme) => ({
    contenedor: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '70vw',
        height: '70vh',
        marginTop: '64px',
    },
    menuContainer: {
        width: '30vw',
        height: '85vh',
        backgroundColor: theme.palette.primary.main
    },
    mainContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80vw',
        height: '85vh',
        backgroundColor: theme.palette.primary.light
    },
    navItems: {
        width: '100%',
        color: '#FFF'
    },
    userInfo: {
        height: 150,
        marginRight: 50,
        marginLeft: 50,
        display: 'flex',
        alignItems: 'center',
    },
    userInfoText: {
        display: 'flex',
        flexDirection: 'column',
        color: "#FFF"
    },
    avatar: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        marginRight: theme.spacing(1)
    }
}));

function MiPerfil() {
    const classes = useStyles();
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true)
    const [menu, setMenu] = useState(0)
    const history = useHistory()

    useEffect(() => {
        getDatosCliente()
    }, [])

    const getDatosCliente = async () => {
        try {
            const { data: cliente } = await axios.get("http://localhost:5000/Cliente", {
                params: {
                    id_usuarios: (localStorage.getItem('proyecto_tps103_userID') || sessionStorage.getItem('proyecto_tps103_userID'))
                }
            })
            setUserData(cliente[0])
        } catch (error) {
            console.log(error)
            console.log(error.response)
            return MensajeInformativo('ERROR', error.response.data.message, 'error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container fixed className={classes.contenedor} >
            <Card className={classes.menuContainer}>
                <Box className={classes.userInfo} >
                    <Avatar alt="Remy Sharp" className={classes.avatar}>A</Avatar>
                    <Box className={classes.userInfoText}>
                        <Typography
                            variant="button"
                        >
                            {`${localStorage.getItem('proyecto_tps103_username') || sessionStorage.getItem('proyecto_tps103_username')}`}
                        </Typography>

                        <Typography
                            variant="overline"
                        >CLIENTE</Typography>
                    </Box>
                </Box>
                <hr></hr>

                <List component="nav" className={classes.navItems}>
                    <ListItem
                        button
                        selected={menu === 0}
                        onClick={() => {
                            setMenu(0)
                            history.push("/perfil/datos-personales")
                        }}
                    >
                        <ListItemText primary="Datos personales" />
                    </ListItem>
                    <Divider />
                    <ListItem
                        button
                        selected={menu === 1}
                        onClick={() => {
                            setMenu(1)
                            history.push("/perfil/datos-contacto")
                        }}
                    >
                        <ListItemText primary="Datos de contacto" />
                    </ListItem>
                    <Divider light />
                    <ListItem
                        button
                        selected={menu === 2}
                        onClick={() => {
                            setMenu(2)
                            history.push("/perfil/cuenta")
                        }}
                    >
                        <ListItemText primary="Seguridad de la cuenta" />
                    </ListItem>
                </List>
            </Card>

            {
                loading ? <h1>Loading...</h1>
                    :
                    <Card className={classes.mainContainer}>
                        <Switch>
                            <Route
                                exact
                                path="/perfil"
                                render={() => {
                                    return (
                                        <Redirect to="/perfil/datos-personales" />
                                    )
                                }}
                            />
                            <Route path="/perfil/datos-personales" >
                                <DatosPersonales userData={userData} />
                            </Route>
                            <Route path="/perfil/datos-contacto" >
                                <DatosContacto userData={userData} />
                            </Route>
                            <Route path="/perfil/cuenta" >
                                <SeguridadCuenta />
                            </Route>
                        </Switch>
                    </Card>
            }
        </Container>
    )
}

export default MiPerfil
