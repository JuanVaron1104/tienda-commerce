import axios from 'axios';
import { useState } from 'react'
import { Button, Typography, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CardLayout from '../../../hocs/CardLayout'
import { MensajeInformativo } from '../../../common/Alerts';

const useStyles = makeStyles((theme) => ({
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
    buttons: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center'
    },
    button: {
        margin: theme.spacing(1)
    }
}));

function SeguridadCuenta() {
    const classes = useStyles();
    const [userData, setUserData] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const erroresFormulario = validarPassword(userData);
            if (Object.keys(erroresFormulario).length) {
                setErrors(erroresFormulario);
            } else {
                try {
                    const { usuPasswordConfirm, ...userDatos } = userData
                    const autenticado = await axios.put('http://localhost:5000/Cliente', { userDatos: userDatos, idUsuario: (localStorage.getItem('commerce_userID') || sessionStorage.getItem('commerce_userID')) })
                    MensajeInformativo('CONTRASEÑA ACTUALIZADA', autenticado.data.message, 'success')
                    setUserData({})
                } catch (error) {
                    console.log(error)
                    MensajeInformativo('ERROR', error.response.data.message, 'error')
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleEliminarCuenta = () => {

    }

    return (
        <CardLayout
            title={"Actualiza tu contraseña"}
            description={"Todos los campos son obligatorios"}
        >
            <form>
                <fieldset className={classes.fieldset}>
                    <legend>Actualizar Contraseña</legend>

                    <div>
                        <div className={classes.listField}>
                            <TextField
                                name="usuPassword"
                                className={classes.input}
                                label={"Contraseña Nueva"}
                                variant="outlined"
                                value={userData.usuPassword || ""}
                                onChange={handleChange}
                                error={errors.usuPassword ? true : false}
                                helperText={errors.usuPassword}
                                type="password"
                            />
                        </div>

                        <div className={classes.listField}>
                            <TextField
                                name="usuPasswordConfirm"
                                className={classes.input}
                                label={"Confirmar Nueva Contraseña"}
                                variant="outlined"
                                value={userData.usuPasswordConfirm || ""}
                                onChange={handleChange}
                                error={errors.usuPasswordConfirm ? true : false}
                                helperText={errors.usuPasswordConfirm}
                                type="password"
                            />
                        </div>
                    </div>
                </fieldset>

                <div className={classes.buttons}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleSubmit}
                    >
                        <Typography variant="button" >Guardar Cambios</Typography>
                    </Button>

                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={handleEliminarCuenta}
                    >
                        <Typography variant="button" >Desactivar cuenta</Typography>
                    </Button>
                </div>
            </form>
        </CardLayout>
    )
}



const validarPassword = (campos) => {
    const errors = {}
    const { usuPassword, usuPasswordConfirm } = campos

    //Validaciones para la usuPassword
    if (!usuPassword) {
        errors.usuPassword = "Campo obligatorio"
    } else {
        const RegExp = /^(?=.*\d).{4,20}$/
        if (!RegExp.test(usuPassword)) {
            errors.usuPassword = "La contraseña debe tener entre 4 y 20 caracteres y al menos un dígito."
        }
    }

    //Validaciones para la usuPasswordConfirm
    if (!usuPasswordConfirm) {
        errors.usuPasswordConfirm = "Campo obligatorio"
    } else {
        if (usuPassword !== usuPasswordConfirm) {
            if (!errors.usuPassword) { errors.usuPassword = "Las contraseñas deben ser iguales." }
            errors.usuPasswordConfirm = "Las contraseñas deben ser iguales."
        }
    }

    return errors
}

export default SeguridadCuenta
