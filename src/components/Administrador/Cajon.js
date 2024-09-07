import { useHistory } from 'react-router-dom';
import { useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles';
import {
    Drawer, Avatar, List, ListItem, ListItemText, ListItemIcon,
    Accordion, AccordionDetails, AccordionSummary, Typography, Box,
    Hidden, AppBar, Toolbar, IconButton, Button
} from '@material-ui/core'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: '20rem',
        flexShrink: 0,
        backgroundColor: '#D0D0D0'
    },
    drawerPaper: {
        width: '20rem',
        overflowX: 'hidden'
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    heading: {
        fontSize: '32px',
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    }, accordion: {
        backgroundColor: '#F9F9F9',
        width: '100%'
    }, adminIcon: {
        height: 150,
        display: 'flex',
        alignItems: 'center',
        marginLeft: theme.spacing(5)
    },
    adminUserText: {
        display: 'flex',
        flexDirection: 'column'
    },
    avatar: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        marginRight: theme.spacing(1)
    }, list: {
        flexDirection: 'column'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${20}rem)`,
        marginLeft: '20rem',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    boton: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '4rem'
    }
}));

function Cajon({ activeMenu, handleChangeActiveMenu }) {
    const classes = useStyles();
    const history = useHistory()
    const [expanded, setExpanded] = useState('panel1');
    const [open, setOpen] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    return (
        <>
            <Hidden smDown>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="left"
                >
                    <Box className={classes.adminIcon} >
                        <Avatar alt="Remy Sharp" className={classes.avatar}>A</Avatar>
                        <Box className={classes.adminUserText}>
                            <Typography
                                variant="button"
                                color="textPrimary"
                            >
                                {localStorage.getItem('commerce_username') || sessionStorage.getItem('commerce_username')}
                            </Typography>

                            <Typography
                                variant="overline"
                                color="textSecondary"
                            >Administrador</Typography>
                        </Box>
                    </Box>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className={classes.accordion} >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <AssignmentIndIcon className={classes.heading} />
                            <Typography className={classes.secondaryHeading}>
                                Gestión de Clientes
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.list}>
                            <List>
                                <ListItem
                                    button
                                    selected={activeMenu === 'g_cliente_buscar' ? true : false}
                                    onClick={() => handleChangeActiveMenu("g_cliente_buscar", "/Administrador/Clientes/Buscar")}
                                >
                                    <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                                    <ListItemText primary="Buscar cliente" />
                                </ListItem>
                                <ListItem
                                    button
                                    selected={activeMenu === 'g_cliente_ver' ? true : false}
                                    onClick={() => handleChangeActiveMenu("g_cliente_ver", "/Administrador/Clientes/Ver")}
                                >
                                    <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                                    <ListItemText primary="Ver clientes" />
                                </ListItem>
                                <ListItem
                                    button
                                    divider
                                    selected={activeMenu === 'g_cliente_solicitudes' ? true : false}
                                    onClick={() => handleChangeActiveMenu("g_cliente_solicitudes", "/Administrador/Clientes/Solicitudes")}
                                >
                                    <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                                    <ListItemText primary="Solicitudes de edición" />
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <AssignmentIndIcon className={classes.heading} />
                            <Typography className={classes.secondaryHeading}>
                                Gestión de Empleados
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.list}>
                            <List>
                                <ListItem
                                    button
                                    selected={activeMenu === 'g_empleado_registrar' ? true : false}
                                    onClick={() => handleChangeActiveMenu("g_empleado_registrar", "/Administrador/Empleados/Registro")}
                                >
                                    <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                                    <ListItemText primary="Registrar empleado" />
                                </ListItem>
                                <ListItem
                                    button
                                    selected={activeMenu === 'g_empleado_buscar' ? true : false}
                                    onClick={() => handleChangeActiveMenu("g_empleado_buscar", "/Administrador/Empleados/Buscar")}
                                >
                                    <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                                    <ListItemText primary="Buscar empleado" />
                                </ListItem>
                                <ListItem
                                    button
                                    divider
                                    selected={activeMenu === 'g_empleado_ver' ? true : false}
                                    onClick={() => handleChangeActiveMenu("g_empleado_ver", "/Administrador/Empleados/Ver")}
                                >
                                    <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                                    <ListItemText primary="Ver empleados" />
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                        >
                            <AssignmentIndIcon className={classes.heading} />
                            <Typography className={classes.secondaryHeading}>
                                Gestión de Productos
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.list}>
                            <List>
                                <ListItem
                                    button
                                    selected={activeMenu === 'g_producto_registrar' ? true : false}
                                    onClick={() => handleChangeActiveMenu("g_producto_registrar", "/Administrador/Productos/Registro")}
                                >
                                    <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                                    <ListItemText primary="Registrar producto" />
                                </ListItem>
                                <ListItem
                                    button
                                    selected={activeMenu === 'g_producto_buscar' ? true : false}
                                    onClick={() => handleChangeActiveMenu("g_producto_buscar", "/Administrador/Productos/Buscar")}
                                >
                                    <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                                    <ListItemText primary="Buscar producto" />
                                </ListItem>
                                <ListItem
                                    button
                                    divider
                                    selected={activeMenu === 'g_producto_ver' ? true : false}
                                    onClick={() => handleChangeActiveMenu("g_producto_ver", "/Administrador/Productos/Ver")}
                                >
                                    <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                                    <ListItemText primary="Ver productos" />
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel4bh-content"
                            id="panel4bh-header"
                        >
                            <AssignmentIndIcon className={classes.heading} />
                            <Typography className={classes.secondaryHeading}>
                                Gestión de Proveedores
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.list}>
                            <List>
                                <ListItem
                                    button
                                    selected={activeMenu === 'g_proveedor_registrar' ? true : false}
                                    onClick={() => handleChangeActiveMenu("g_proveedor_registrar", "/Administrador/Proveedores/Registro")}
                                >
                                    <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                                    <ListItemText primary="Registrar proveedor" />
                                </ListItem>
                                <ListItem
                                    button
                                    selected={activeMenu === 'g_proveedor_buscar' ? true : false}
                                    onClick={() => handleChangeActiveMenu("g_proveedor_buscar", "/Administrador/Proveedores/Buscar")}
                                >
                                    <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                                    <ListItemText primary="Buscar proveedor" />
                                </ListItem>
                                <ListItem
                                    button
                                    divider
                                    selected={activeMenu === 'g_proveedor_ver' ? true : false}
                                    onClick={() => handleChangeActiveMenu("g_proveedor_ver", "/Administrador/Proveedores/Ver")}
                                >
                                    <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                                    <ListItemText primary="Ver proveedores" />
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel5bh-content"
                            id="panel5bh-header"
                        >
                            <AssignmentIndIcon className={classes.heading} />
                            <Typography className={classes.secondaryHeading}>
                                Gestión de Reportes
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.list}>
                            <List>
                                <ListItem
                                    button
                                    selected={activeMenu === 'g_reporte_cliente' ? true : false}
                                    onClick={() => handleChangeActiveMenu("g_reporte_cliente", "/Administrador/Reportes/Cliente")}
                                >
                                    <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                                    <ListItemText primary="De Clientes" />
                                </ListItem>
                                <ListItem
                                    button
                                    selected={activeMenu === 'g_reporte_empleado' ? true : false}
                                    onClick={() => handleChangeActiveMenu("g_reporte_empleado", "/Administrador/Reportes/Empleado")}
                                >
                                    <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                                    <ListItemText primary="De Empleados" />
                                </ListItem>
                                <ListItem
                                    button
                                    divider
                                    selected={activeMenu === 'g_reporte_negocio' ? true : false}
                                    onClick={() => handleChangeActiveMenu("g_reporte_negocio", "/Administrador/Reportes/Negocio")}
                                >
                                    <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                                    <ListItemText primary="Del Negocio" />
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.boton}
                        onClick={() => history.push("/Logout")}
                    >
                        Cerrar sesión
                    </Button>
                </Drawer>
            </Hidden>

            <Hidden mdUp>
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            MUSIC STORE - ADMIN
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {<ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Box className={classes.adminIcon} >
                        <Avatar alt="Remy Sharp" className={classes.avatar}>A</Avatar>
                        <Typography
                            variant="button"
                            color="textPrimary"
                        >Administrador</Typography>
                    </Box>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className={classes.accordion} >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <AssignmentIndIcon className={classes.heading} />
                            <Typography className={classes.secondaryHeading}>
                                Gestión de Clientes
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.list}>
                            <List>
                                <ListItem
                                    button
                                    selected={activeMenu === 'g_cliente_buscar' ? true : false}
                                    onClick={() => handleChangeActiveMenu("g_cliente_buscar")}
                                >
                                    <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                                    <ListItemText primary="Buscar cliente" />
                                </ListItem>
                                <ListItem
                                    button
                                    selected={activeMenu === 'g_cliente_ver' ? true : false}
                                    onClick={() => handleChangeActiveMenu("g_cliente_ver")}
                                >
                                    <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                                    <ListItemText primary="Ver clientes" />
                                </ListItem>
                                <ListItem
                                    button
                                    divider
                                    selected={activeMenu === 'g_cliente_solicitudes' ? true : false}
                                    onClick={() => handleChangeActiveMenu("g_cliente_solicitudes")}
                                >
                                    <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                                    <ListItemText primary="Solicitudes de edición" />
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <AssignmentIndIcon className={classes.heading} />
                            <Typography className={classes.secondaryHeading}>
                                Gestión de Empleados
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.list}>
                            <List>
                                <ListItem
                                    button
                                    selected={activeMenu === 'g_empleado_registrar' ? true : false}
                                    onClick={() => handleChangeActiveMenu("g_empleado_registrar")}
                                >
                                    <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                                    <ListItemText primary="Registrar empleado" />
                                </ListItem>
                                <ListItem
                                    button
                                    selected={activeMenu === 'g_empleado_buscar' ? true : false}
                                    onClick={() => handleChangeActiveMenu("g_empleado_buscar")}
                                >
                                    <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                                    <ListItemText primary="Buscar empleado" />
                                </ListItem>
                                <ListItem
                                    button
                                    divider
                                    selected={activeMenu === 'g_empleado_ver' ? true : false}
                                    onClick={() => handleChangeActiveMenu("g_empleado_ver")}
                                >
                                    <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                                    <ListItemText primary="Ver empleados" />
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                        >
                            <AssignmentIndIcon className={classes.heading} />
                            <Typography className={classes.secondaryHeading}>
                                Gestión de Productos
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.list}>
                            <List>
                                <ListItem
                                    button
                                    selected={activeMenu === 'g_producto_registrar' ? true : false}
                                    onClick={() => handleChangeActiveMenu("g_producto_registrar")}
                                >
                                    <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                                    <ListItemText primary="Registrar producto" />
                                </ListItem>
                                <ListItem
                                    button
                                    selected={activeMenu === 'g_producto_buscar' ? true : false}
                                    onClick={() => handleChangeActiveMenu("g_producto_buscar")}
                                >
                                    <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                                    <ListItemText primary="Buscar producto" />
                                </ListItem>
                                <ListItem
                                    button
                                    divider
                                    selected={activeMenu === 'g_producto_ver' ? true : false}
                                    onClick={() => handleChangeActiveMenu("g_producto_ver")}
                                >
                                    <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                                    <ListItemText primary="Ver productos" />
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel4bh-content"
                            id="panel4bh-header"
                        >
                            <AssignmentIndIcon className={classes.heading} />
                            <Typography className={classes.secondaryHeading}>
                                Gestión de Proveedores
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.list}>
                            <List>
                                <ListItem
                                    button
                                    selected={activeMenu === 'g_proveedor_registrar' ? true : false}
                                    onClick={() => handleChangeActiveMenu("g_proveedor_registrar")}
                                >
                                    <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                                    <ListItemText primary="Registrar proveedor" />
                                </ListItem>
                                <ListItem
                                    button
                                    selected={activeMenu === 'g_proveedor_buscar' ? true : false}
                                    onClick={() => handleChangeActiveMenu("g_proveedor_buscar")}
                                >
                                    <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                                    <ListItemText primary="Buscar proveedor" />
                                </ListItem>
                                <ListItem
                                    button
                                    divider
                                    selected={activeMenu === 'g_proveedor_ver' ? true : false}
                                    onClick={() => handleChangeActiveMenu("g_proveedor_ver")}
                                >
                                    <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                                    <ListItemText primary="Ver proveedores" />
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel5bh-content"
                            id="panel5bh-header"
                        >
                            <AssignmentIndIcon className={classes.heading} />
                            <Typography className={classes.secondaryHeading}>
                                Gestión de Reportes
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.list}>
                            <List>
                                <ListItem
                                    button
                                    selected={activeMenu === 'g_reporte_cliente' ? true : false}
                                    onClick={() => handleChangeActiveMenu("g_reporte_cliente")}
                                >
                                    <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                                    <ListItemText primary="De Clientes" />
                                </ListItem>
                                <ListItem
                                    button
                                    selected={activeMenu === 'g_reporte_empleado' ? true : false}
                                    onClick={() => handleChangeActiveMenu("g_reporte_empleado")}
                                >
                                    <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                                    <ListItemText primary="De Empleados" />
                                </ListItem>
                                <ListItem
                                    button
                                    divider
                                    selected={activeMenu === 'g_reporte_negocio' ? true : false}
                                    onClick={() => handleChangeActiveMenu("g_reporte_negocio")}
                                >
                                    <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                                    <ListItemText primary="Del Negocio" />
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>
                    <Button variant="contained" color="secondary" className={classes.boton} >
                        Cerrar sesión
                    </Button>
                </Drawer>
            </Hidden>
        </>
    )
}

export default Cajon
