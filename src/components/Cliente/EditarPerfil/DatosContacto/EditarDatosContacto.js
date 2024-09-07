import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import CardLayout from '../../../hocs/CardLayout';
import { MensajeInformativo } from '../../../common/Alerts'
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

function EditarDatosContacto({ userData, useStyles, handleEditable }) {
    const classes = useStyles();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true)
    const [contactData, setContactData] = useState({});
    const [ciudades, setCiudades] = useState(null)
    const history = useHistory()

    const handleChange = (event) => {
        setContactData({ ...contactData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const erroresFormulario = validaciones(contactData);
            if (Object.keys(erroresFormulario).length) {
                setErrors(erroresFormulario);
            } else {
                try {
                    await axios.put('http://localhost:5000/Cliente', { userDatos: contactData, idUsuario: (localStorage.getItem('proyecto_tps103_userID') || sessionStorage.getItem('proyecto_tps103_userID')) })
                    Swal.fire({
                        title: 'DATOS ACTUALIZADOS',
                        text: 'Es posible que debas refrescar para ver los cambios',
                        icon: 'success'
                    }).then(() => {
                        handleEditable()
                    history.go(0)
                    })
                } catch (error) {
                    console.log(error)
                    MensajeInformativo('ERROR', error.response.data.message, 'error')
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        setContactData({
            usuDireccion: userData.usuDireccion,
            usuCorreo: userData.usuCorreo,
            usuTelefono: userData.usuTelefono
        })
    }, [userData.usuCorreo, userData.usuDireccion, userData.usuTelefono])

    useEffect(() => {
        obtenerCiudades()
    }, [])

    const obtenerCiudades = async () => {
        const { data: ciudades } = await axios.get("http://localhost:5000/Ciudades")
        setCiudades(ciudades)
        setLoading(false)
    }

    return (
        loading ? <h6>Loading..</h6>
            :
            <CardLayout
                title={"Datos de contacto"}
                description={"Todos los campos son obligatorios"}
            >
                <form>
                    <fieldset className={classes.fieldset}>
                        <legend>Datos De Contacto</legend>
                        <div>
                            <div className={classes.listField}>
                                <FormControl variant="outlined" className={classes.input}>
                                    <InputLabel id="lbl_ciudadResidencia">Ciudad de residencia (*)</InputLabel>
                                    <Select
                                        error={errors.usuId_ciudadResidencia}
                                        labelId="lbl_ciudadResidencia"
                                        name="usuId_ciudadResidencia"
                                        label="Ciudad de residencia (*)"
                                        value={contactData.usuId_ciudadResidencia || -1}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={-1} disabled>
                                            <em>Seleccione...</em>
                                        </MenuItem>
                                        {
                                            ciudades.map(ciudad => {
                                                return <MenuItem
                                                    key={ciudad.id_ciudad}
                                                    value={ciudad.id_ciudad}
                                                >
                                                    {ciudad.ciuNombre}
                                                </MenuItem>
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
                                    value={contactData.usuDireccion || ""}
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
                                    value={contactData.usuCorreo || ""}
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
                                    value={contactData.usuTelefono || ""}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </fieldset>

                    <div className={classes.buttons}>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            onClick={handleEditable}
                        >
                            <Typography variant="button" >Cancelar</Typography>
                        </Button>

                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={handleSubmit}
                        >
                            <Typography variant="button" >Actualizar Datos</Typography>
                        </Button>
                    </div>
                </form>
            </CardLayout>
    )
}


const validaciones = (campos) => {
    const errors = {}
    const { usuId_ciudadResidencia, usuDireccion, usuTelefono, usuCorreo } = campos

    //Validaciones para usuId_ciudadResidencia
    console.log(usuId_ciudadResidencia)
    if (!usuId_ciudadResidencia || usuId_ciudadResidencia === -1) {
        errors.usuId_ciudadResidencia = true
    }

    //Validaciones para usuDireccion
    if (!usuDireccion) {
        errors.usuDireccion = "Campo obligatorio"
    } else {
        const RegExp = /^[A-Za-z0-9\s#-.]{1,50}$/
        if (!RegExp.test(usuDireccion)) {
            errors.usuDireccion = "Mínimo 1 y máximo 50 caracteres."
        }
    }

    //Validaciones para usuTelefono
    if (!usuTelefono) {
        errors.usuTelefono = "Campo obligatorio"
    } else {
        const RegExp = /^\D*\d{1,255}$/
        if (!RegExp.test(usuTelefono)) {
            errors.usuTelefono = "Solo se permiten números"
        } else {
            const RegExp = /^\D*\d{7,10}$/
            if (!RegExp.test(usuTelefono)) {
                errors.usuTelefono = "Mínimo 7 y máximo 10 dígitos."
            }
        }
    }

    //Validaciones para usuCorreo
    if (!usuCorreo) {
        errors.usuCorreo = "Campo obligatorio"
    } else {
        const RegExp = /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        if (!RegExp.test(usuCorreo)) {
            errors.usuCorreo = "El correo no es válido"
        }
    }
    return errors
}
export default EditarDatosContacto
