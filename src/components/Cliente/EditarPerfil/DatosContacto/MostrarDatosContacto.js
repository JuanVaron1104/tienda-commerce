import { Button, TextField, Typography } from '@material-ui/core';
import CardLayout from '../../../hocs/CardLayout';

function MostrarDatosContacto({ userData, useStyles, handleEditable }) {
    const classes = useStyles();
    return (
        <CardLayout
            title={"Editar Perfil"}
            description={"Mantén tu información actualizada"}
        >
            <form>
                <fieldset className={classes.fieldset}>
                    <legend>Datos De Contacto</legend>
                    <div>
                        <div className={classes.listField}>
                            <TextField
                                className={classes.input}
                                label={"Ciudad de Residencia"}
                                variant="outlined"
                                disabled
                                value={userData.usuId_ciudadResidencia}
                            />
                        </div>

                        <div className={classes.listField}>
                            <TextField
                                className={classes.input}
                                label={"Direccion de Residencia"}
                                variant="outlined"
                                disabled
                                value={userData.usuDireccion}
                            />
                        </div>
                    </div>

                    <div>
                        <div className={classes.listField}>
                            <TextField
                                className={classes.input}
                                label={"Correo Electronico"}
                                variant="outlined"
                                disabled
                                value={userData.usuCorreo}
                            />
                        </div>

                        <div className={classes.listField}>
                            <TextField
                                className={classes.input}
                                label={"Teléfono"}
                                variant="outlined"
                                disabled
                                value={userData.usuTelefono || ""}
                            />
                        </div>
                    </div>
                </fieldset>

                <div className={classes.buttons}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleEditable}
                    >
                        <Typography variant="button" >Editar Datos</Typography>
                    </Button>
                </div>
            </form>
        </CardLayout>
    )
}

export default MostrarDatosContacto
