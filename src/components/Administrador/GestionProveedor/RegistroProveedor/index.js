import { useState } from 'react'
import { Button, Typography, TextField, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import LooksOneIcon from '@material-ui/icons/LooksOne'
import CardLayout from '../../../hocs/CardLayout'
import { validarRegistroProveedor } from '../../../../utils/ValidacionesRegistroProveedor';

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

function RegistroProveedor({ registerData, handleChange, handleSubmit }) {
    const classes = useStyles();
    const [errors, setErrors] = useState({});

    const onSubmit = () => {
        try {
            const erroresFormulario = validarRegistroProveedor(registerData);
            if (Object.keys(erroresFormulario).length) {
                setErrors(erroresFormulario);
            } else {
                handleSubmit();
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <CardLayout
            title={"Registro de Proveedor"}
            description={"Todos los campos son obligatorios"}
            Icon={<LooksOneIcon color="primary" className={classes.progressField} fontSize="large" />}
        >
            <form onSubmit={onSubmit}>
                <fieldset className={classes.fieldset}>
                    <legend>Información de la empresa</legend>
                    <div>
                        <div className={classes.listField}>
                            <TextField
                                error={errors.provNombre ? true : false}
                                helperText={errors.provNombre}
                                autoFocus
                                name="provNombre"
                                className={classes.input}
                                label={"Nombre"}
                                variant="outlined"
                                value={registerData.provNombre || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={classes.listField}>
                            <TextField
                                error={errors.provNit ? true : false}
                                helperText={errors.provNit}
                                name="provNit"
                                className={classes.input}
                                label={"NIT"}
                                variant="outlined"
                                value={registerData.provNit || ""}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset className={classes.fieldset}>
                    <legend>Información de contacto</legend>
                    <div>
                        <div className={classes.listField}>
                            <TextField
                                error={errors.provDireccion ? true : false}
                                helperText={errors.provDireccion}
                                name="provDireccion"
                                className={classes.input}
                                label={"Dirección"}
                                variant="outlined"
                                value={registerData.provDireccion || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={classes.listField}>
                            <TextField
                                error={errors.provCorreo ? true : false}
                                helperText={errors.provCorreo}
                                name="provCorreo"
                                className={classes.input}
                                label={"Correo Electrónico"}
                                variant="outlined"
                                value={registerData.provCorreo || ""}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <div className={classes.listField}>
                            <TextField
                                error={errors.provTelefono ? true : false}
                                helperText={errors.provTelefono}
                                name="provTelefono"
                                className={classes.input}
                                label={"Teléfono"}
                                variant="outlined"
                                value={registerData.provTelefono || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={classes.listField}>
                            <FormControl variant="outlined" className={classes.input}>
                                <InputLabel id="lbl_Estado">Estado</InputLabel>
                                <Select
                                    error={errors.provActivo}
                                    labelId="lbl_Estado"
                                    name="provActivo"
                                    label="Estado"
                                    value={registerData.provActivo || -1}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={-1} disabled>
                                        <em>Seleccione...</em>
                                    </MenuItem>
                                    <MenuItem value={1}>Activo</MenuItem>
                                    <MenuItem value={2}>Inactivo</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </fieldset>

                <Button
                    type={"submit"}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                >
                    <Typography variant="button" >REGISTRAR PROVEEDOR</Typography>
                </Button>
            </form>
        </CardLayout>
    )
}

export default RegistroProveedor
