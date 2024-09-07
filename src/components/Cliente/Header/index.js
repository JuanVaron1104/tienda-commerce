import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Button, MenuItem, Menu, List, ListItem, ListItemText } from '@material-ui/core';

import RadioIcon from '@material-ui/icons/Radio';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link, useHistory } from 'react-router-dom';

import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    app:{
        backgroundColor: '#944D31'
    },
    appBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    menuLogo: {
        display: 'flex',
        alignItems: 'center'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    menuIcon: {
        fontSize: 40
    },
    title: {
        flexGrow: 1,
    },
    button: {
        marginLeft: 15,
        marginRight: 15,
    },
    link: {
        textDecoration: 'none',
        color: '#FFF'
    },
    navBar: {
        display: 'flex'
    },
    navItems: {
        display: 'flex',
        width: '10rem',
        textAlign: 'center'
    }
}));

function Header() {
    const classes = useStyles();
    const [menu, setMenu] = useState(0)
    const [anchorEl, setAnchorEl] = useState(false);
    const [auth, setAuth] = useState(false);
    const open = Boolean(anchorEl);
    const history = useHistory()

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCerrarSesion = () => {
        setAnchorEl(null);
        history.push("/Logout")
    }

    useEffect(() => {
        const user = localStorage.getItem(`proyecto_tps103_userID`) || sessionStorage.getItem(`proyecto_tps103_userID`)
        if (user) {
            setAuth(true)
        }
    }, [])

    return (
        <AppBar position="static" color={"secondary"} className={classes.app} >
            <Toolbar className={classes.appBar}>
                <div className={classes.menuLogo}>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <RadioIcon className={classes.menuIcon} />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Music Store
                    </Typography>
                </div>

                {
                    auth ? (
                        <>
                            <List component="nav" className={classes.navBar}>
                                <ListItem
                                    button
                                    selected={menu === 0}
                                    className={classes.navItems}
                                    onClick={() => {
                                        setMenu(0)
                                        history.push("/Productos")
                                    }}
                                >
                                    <ListItemText primary="Productos" />
                                </ListItem>

                                <ListItem
                                    button
                                    selected={menu === 1}
                                    className={classes.navItems}
                                    onClick={() => {
                                        setMenu(1)
                                        history.push("/Carrito")
                                    }}
                                >
                                    <ListItemText primary="Mi Carrito" />
                                </ListItem>

                                <ListItem
                                    button
                                    selected={menu === 2}
                                    className={classes.navItems}
                                    onClick={() => {
                                        setMenu(2)
                                        history.push("/Compras")
                                    }}
                                >
                                    <ListItemText primary="Mis Compras" />
                                </ListItem>

                                <ListItem
                                    button
                                    selected={menu === 3}
                                    className={classes.navItems}
                                    onClick={() => {
                                        setMenu(3)
                                        history.push("/Perfil")
                                    }}
                                >
                                    <ListItemText primary="Mi Perfil" />
                                </ListItem>
                            </List>

                            <div>
                                <Typography variant="button" className={classes.title}>
                                    {`${localStorage.getItem('proyecto_tps103_username') || sessionStorage.getItem('proyecto_tps103_username')}`}
                                </Typography>

                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle className={classes.menuIcon} />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleCerrarSesion}>Cerrar Sesión</MenuItem>
                                </Menu>
                            </div>
                        </>
                    ) :
                        (
                            <div>
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                >
                                    <Link to="/Login" className={classes.link}>
                                        Iniciar Sesión
                                    </Link>

                                </Button>
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                >
                                    <Link to="/Registro" className={classes.link}>
                                        Registrarse
                                    </Link>
                                </Button>
                            </div>
                        )
                }
            </Toolbar>
        </AppBar>
    )
}

export default withRouter(Header)
