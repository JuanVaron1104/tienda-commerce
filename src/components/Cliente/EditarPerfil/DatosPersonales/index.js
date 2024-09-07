import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CardLayout from '../../../hocs/CardLayout'

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
        margin: theme.spacing(1)
    }
}));

function DatosPersonales({ userData }) {
    const classes = useStyles();

    return (
        <CardLayout
            title={"Datos personales"}
            description={""}
        >
            <fieldset className={classes.fieldset}>
                <legend>Datos Personales</legend>
                <div>
                    <div className={classes.listField}>
                        <TextField
                            className={classes.input}
                            label={"Primer Nombre"}
                            variant="outlined"
                            disabled
                            value={userData.usuPrimerNombre || ""}
                        />
                    </div>

                    <div className={classes.listField}>
                        <TextField
                            className={classes.input}
                            label={"Segúndo Nombre"}
                            variant="outlined"
                            disabled
                            value={userData.usuSegundoNombre || ""}
                        />
                    </div>
                </div>
                <div>
                    <div className={classes.listField}>
                        <TextField
                            className={classes.input}
                            label={"Primer Apellido"}
                            variant="outlined"
                            disabled
                            value={userData.usuPrimerApellido || ""}

                        />
                    </div>

                    <div className={classes.listField}>
                        <TextField
                            className={classes.input}
                            label={"Segundo Apellido"}
                            variant="outlined"
                            disabled
                            value={userData.usuSegundoApellido || ""}
                        />
                    </div>
                </div>

                <div>
                    <div className={classes.listField}>
                        <TextField
                            className={classes.input}
                            label={"Tipo de Documento"}
                            variant="outlined"
                            disabled
                            value={userData.usuTipoDocumento || -1}
                        />
                    </div>

                    <div className={classes.listField}>
                        <TextField
                            className={classes.input}
                            label={"Numero Documento"}
                            variant="outlined"
                            disabled
                            value={userData.usuNumeroDocumento || ""}
                        />
                    </div>
                </div>

                <div>

                    <div className={classes.listField}>
                        <TextField
                            className={classes.input}
                            label={"Ciudad de nacimiento"}
                            variant="outlined"
                            disabled
                            value={userData.usuCiudadNacimiento || ""}

                        />
                    </div>

                    <div className={classes.listField}>
                        <TextField
                            className={classes.input}
                            label={"Fecha de Nacimiento"}
                            variant="outlined"
                            disabled
                            value={userData.usuFechaNacimiento || ""}

                        />
                    </div>
                </div>
            </fieldset>
        </CardLayout>
    )
}

export default DatosPersonales
