import { useState } from 'react';
import { Typography, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import { makeStyles } from '@material-ui/core/styles';
import { DESCRIPTION_REGISTER } from '../../consts/TextConst';
import CardLayout from '../hocs/CardLayout'
import { validarStepOneRegistro } from '../../utils/ValidacionesRegistro';
import { Link } from 'react-router-dom';

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

function StepOneRegister({ title, showLoginLabel, ciudades = [], nextStep, handleChange, registerData }) {
    const classes = useStyles();

    const [errors, setErrors] = useState({});

    const handleSubmit = () => {
        try {
            const erroresFormulario = validarStepOneRegistro(registerData);
            if (Object.keys(erroresFormulario).length) {
                setErrors(erroresFormulario);
            } else {
                nextStep();
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <CardLayout
            title={title}
            description={DESCRIPTION_REGISTER}
            Icon={<LooksOneIcon color="primary" className={classes.progressField} fontSize="large" />}
        >
            <fieldset className={classes.fieldset}>
                <legend>Datos de Contacto</legend>
                <div>
                    <div className={classes.listField}>
                        <TextField
                            autoFocus
                            error={errors.usuPrimerNombre ? true : false}
                            helperText={errors.usuPrimerNombre}
                            name="usuPrimerNombre"
                            className={classes.input}
                            label={"Primer Nombre (*)"}
                            variant="outlined"
                            value={registerData.usuPrimerNombre || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={classes.listField}>
                        <TextField
                            error={errors.usuSegundoNombre ? true : false}
                            helperText={errors.usuSegundoNombre}
                            name="usuSegundoNombre"
                            className={classes.input}
                            label={"Segundo Nombre"}
                            variant="outlined"
                            value={registerData.usuSegundoNombre || ""}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <div className={classes.listField}>
                        <TextField
                            error={errors.usuPrimerApellido ? true : false}
                            helperText={errors.usuPrimerApellido}
                            name="usuPrimerApellido"
                            className={classes.input}
                            label={"Primer Apellido (*)"}
                            variant="outlined"
                            value={registerData.usuPrimerApellido || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={classes.listField}>
                        <TextField
                            error={errors.usuSegundoApellido ? true : false}
                            helperText={errors.usuSegundoApellido}
                            name="usuSegundoApellido"
                            className={classes.input}
                            label={"Segundo Apellido (*)"}
                            variant="outlined"
                            value={registerData.usuSegundoApellido || ""}
                            onChange={handleChange}
                        />
                    </div>
                </div>


                <div>
                    <div className={classes.listField}>
                        <FormControl variant="outlined" className={classes.input}>
                            <InputLabel id="lbl_tipoDocumento">Tipo de documento  (*)</InputLabel>
                            <Select
                                error={errors.usuTipoDocumento}
                                labelId="lbl_tipoDocumento"
                                name="usuTipoDocumento"
                                label="Tipo de documento (*)"
                                value={registerData.usuTipoDocumento || -1}
                                onChange={handleChange}
                            >
                                <MenuItem value={-1} disabled>
                                    <em>Seleccione...</em>
                                </MenuItem>
                                <MenuItem value={"C.C"}>Cedula de Ciudadanía</MenuItem>
                                <MenuItem value={"T.I"}>Tarjeta de Identidad</MenuItem>
                                <MenuItem value={"C.E"}>Cedula de Extranjería</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className={classes.listField}>
                        <TextField
                            error={errors.usuNumeroDocumento ? true : false}
                            helperText={errors.usuNumeroDocumento}
                            name="usuNumeroDocumento"
                            className={classes.input}
                            label={"Número de documento (*)"}
                            variant="outlined"
                            value={registerData.usuNumeroDocumento || ""}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <div className={classes.listField}>
                        <FormControl variant="outlined" className={classes.input}>
                            <InputLabel id="lbl_ciudadNacimiento">Ciudad de nacimiento (*)</InputLabel>
                            <Select
                                error={errors.usuId_ciudadNacimiento}
                                labelId="lbl_ciudadNacimiento"
                                name="usuId_ciudadNacimiento"
                                label="Ciudad de nacimiento (*)"
                                value={registerData.usuId_ciudadNacimiento || -1}
                                onChange={handleChange}
                            >
                                <MenuItem value={-1} disabled >
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
                            error={errors.usuFechaNacimiento ? true : false}
                            helperText={errors.usuFechaNacimiento}
                            name="usuFechaNacimiento"
                            label="Fecha de nacimiento (*)"
                            type="date"
                            className={classes.input}
                            variant="outlined"
                            value={registerData.usuFechaNacimiento || ""}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </fieldset>

            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<NavigateNextIcon />}
                onClick={handleSubmit}
            >
                <Typography variant="button" >CONTINUAR</Typography>
            </Button>

            {
                showLoginLabel &&
                <Typography align="center" >
                    ¿Ya tienes una cuenta?, Inicia sesión <Link to="/Login" >Aquí</Link>
                </Typography>
            }

        </CardLayout>
    )
}

export default StepOneRegister
