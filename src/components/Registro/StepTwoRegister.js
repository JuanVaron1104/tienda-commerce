import { useState } from 'react';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import { Typography, Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core'
import { DESCRIPTION_REGISTER } from '../../consts/TextConst';
import CardLayout from '../hocs/CardLayout'

import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import { validarStepTwoRegistro } from '../../utils/ValidacionesRegistro';

const useStyles = makeStyles((theme) => ({
    contenedor: {
        textAlign: 'center'
    },
    button: {
        margin: theme.spacing(1),
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
    progressField: {
        fontSize: '5rem'
    }
}));

function StepTwoRegister({ title, ciudades = [], backStep, handleChange, registerData, sendRegister }) {
    const classes = useStyles();

    const [errors, setErrors] = useState({});

    const handleSubmit = () => {
        try {
            const erroresFormulario = validarStepTwoRegistro(registerData);
            if (Object.keys(erroresFormulario).length) {
                setErrors(erroresFormulario);
            } else {
                sendRegister();
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <CardLayout
            title={title}
            description={DESCRIPTION_REGISTER}
            Icon={<LooksTwoIcon color="primary" className={classes.progressField} fontSize="large" />}
        >
            <fieldset className={classes.fieldset}>
                <legend>Datos de contacto</legend>
                <div>
                    <div className={classes.listField}>
                        <FormControl variant="outlined" className={classes.input}>
                            <InputLabel id="lbl_ciudadResidencia">Ciudad de residencia (*)</InputLabel>
                            <Select
                                error={errors.usuId_ciudadResidencia}
                                labelId="lbl_ciudadResidencia"
                                name="usuId_ciudadResidencia"
                                label="Ciudad de residencia (*)"
                                value={registerData.usuId_ciudadResidencia || -1}
                                onChange={handleChange}
                            >
                                <MenuItem value={-1} disabled>
                                    <em>Seleccione...</em>
                                </MenuItem>
                                {
                                    ciudades.map(ciudad => {
                                        return <MenuItem key={ciudad.id_ciudad} value={ciudad.id_ciudad}>{ciudad.ciuNombre}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </div>

                    <div className={classes.listField}>
                        <TextField
                            error={errors.usuDireccion ? true : false}
                            helperText={errors.usuDireccion}
                            name="usuDireccion"
                            className={classes.input}
                            label={"Dirección de residencia (*)"}
                            variant="outlined"
                            value={registerData.usuDireccion || ""}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <div className={classes.listField}>
                        <TextField
                            error={errors.usuCorreo ? true : false}
                            helperText={errors.usuCorreo}
                            name="usuCorreo"
                            className={classes.input}
                            label={"Correo Electrónico (*)"}
                            variant="outlined"
                            value={registerData.usuCorreo || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={classes.listField}>
                        <TextField
                            error={errors.usuTelefono ? true : false}
                            helperText={errors.usuTelefono}
                            name="usuTelefono"
                            className={classes.input}
                            label={"Teléfono (*)"}
                            variant="outlined"
                            value={registerData.usuTelefono || ""}
                            onChange={handleChange}
                        />
                    </div>
                </div>

            </fieldset>

            <fieldset className={classes.fieldset}>
                <legend>Datos de la cuenta</legend>
                <div>
                    <div className={classes.listField}>
                        <TextField
                            error={errors.usuPassword ? true : false}
                            helperText={errors.usuPassword}
                            name="usuPassword"
                            className={classes.input}
                            label={"Contraseña (*)"}
                            variant="outlined"
                            type="password"
                            value={registerData.usuPassword || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={classes.listField}>
                        <TextField
                            error={errors.usuPasswordConfirm ? true : false}
                            helperText={errors.usuPasswordConfirm}
                            name="usuPasswordConfirm"
                            className={classes.input}
                            label={"Confirmación de contraseña (*)"}
                            variant="outlined"
                            type="password"
                            value={registerData.usuPasswordConfirm || ""}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </fieldset>

            <div className={classes.listField}>
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<NavigateBeforeIcon />}
                    onClick={backStep}
                >
                    <Typography variant="button" >REGRESAR</Typography>
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<NavigateNextIcon />}
                    onClick={handleSubmit}
                >
                    <Typography variant="button" >CREAR CUENTA</Typography>
                </Button>
            </div>

        </CardLayout>
    )
}

export default StepTwoRegister
