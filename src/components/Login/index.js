import { useState } from 'react'
import { TextField, FormControlLabel, Checkbox, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import { BUTTON_LOGIN, DESCRIPTION_LOGIN, LABELS_LOGIN, TITLE_LOGIN } from '../../consts/TextConst';
import CardLayout from '../../components/hocs/CardLayout'
import { validarLogin } from '../../utils/ValidacionesLogin';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    input: {
        margin: theme.spacing(1),
        width: '250px'
    }
}));

function LoginComponent({ loginData, handleChange, handleSubmitLogin }) {
    const classes = useStyles();

    const [errors, setErrors] = useState({});

    const onSubmit = () => {
        try {
            const erroresFormulario = validarLogin(loginData);
            if (Object.keys(erroresFormulario).length) {
                setErrors(erroresFormulario);
            } else {
                handleSubmitLogin()
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <CardLayout title={TITLE_LOGIN} description={DESCRIPTION_LOGIN}>
            <div>
                <TextField
                    autoFocus
                    error={errors.usuCorreo ? true : false}
                    helperText={errors.usuCorreo}
                    name="usuCorreo"
                    className={classes.input}
                    label={LABELS_LOGIN.IDENTIFICACION}
                    variant="outlined"
                    value={loginData.usuCorreo || ""}
                    onChange={handleChange}
                />
            </div>

            <div>
                <TextField
                    error={errors.usuPassword ? true : false}
                    helperText={errors.usuPassword}
                    name="usuPassword"
                    type="password"
                    className={classes.input}
                    label={LABELS_LOGIN.CONTRASENA}
                    variant="outlined"
                    value={loginData.usuPassword || ""}
                    onChange={handleChange}
                />
            </div>

            <div>
                <FormControlLabel
                    name="saveSession"
                    control={<Checkbox />}
                    label="Mantener sesión iniciada"
                    onChange={handleChange}
                />
            </div>

            <div>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<SendRoundedIcon />}
                    onClick={onSubmit}
                >
                    {BUTTON_LOGIN}
                </Button>
            </div>

            <Typography align="center" >
                ¿No tienes una cuenta?, Registrate <Link to="/Registro" >Aquí</Link>
            </Typography>
        </CardLayout>
    )
}

export default LoginComponent
