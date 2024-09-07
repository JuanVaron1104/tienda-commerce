import { useState } from 'react'
import { Card } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import AdminLayout from '../components/layouts/AdminLayout'
import Cajon from '../components/Administrador/Cajon'
import Contenido from '../components/Administrador/Contenido'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    card: {
        marginLeft: '0',
        [theme.breakpoints.up('md')]: {
            marginLeft: '20rem',
        },
        zIndex: 2
    }
}));


function HomeAdministrador() {
    const classes = useStyles();
    const history = useHistory()
    const [activeMenu, setActiveMenu] = useState("g_cliente_buscar");

    const handleChangeActiveMenu = (newMenu, newUrl) => {
        history.push(newUrl)
        setActiveMenu(newMenu)
    }

    return (
        <AdminLayout>
            <Card className={classes.card} variant="outlined">
                <Cajon
                    activeMenu={activeMenu}
                    handleChangeActiveMenu={handleChangeActiveMenu}
                />
                <Contenido />
            </Card>
        </AdminLayout>
    )
}

export default HomeAdministrador
