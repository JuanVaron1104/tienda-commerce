import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import EditarDatosContacto from './EditarDatosContacto'
import MostrarDatosContacto from './MostrarDatosContacto'


const useStyles = makeStyles((theme) => ({
    progressField: {
        fontSize: '5rem'
    },
    input: {
        margin: theme.spacing(1),
        width: '250px',
        backgroundColor: '#FFF'
    },
    listField: {
        display: 'inline'
    },
    fieldset: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    button: {
        margin: theme.spacing(1),
    },
    buttons: {
        textAlign: 'center'
    }
}));

function DatosContacto({ userData }) {
    const [editable, setEditable] = useState(false)

    const handleChange = (event) => {
        setEditable((!editable))
    }

    return (
        editable ?
            <EditarDatosContacto userData={userData} useStyles={useStyles} handleEditable={handleChange} />
            :
            <MostrarDatosContacto userData={userData} useStyles={useStyles} handleEditable={handleChange} />
    )
}

export default DatosContacto
