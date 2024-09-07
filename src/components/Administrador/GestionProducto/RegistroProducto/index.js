import axios from 'axios'
import { Grid, TextField, FormControl, InputLabel, MenuItem, Select, Button, Typography, Container } from '@material-ui/core'
import { useState, useEffect } from 'react'
import { DropzoneArea } from 'material-ui-dropzone'
import { makeStyles } from '@material-ui/core/styles'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import LooksOneIcon from '@material-ui/icons/LooksOne'
import CardLayout from '../../../hocs/CardLayout'
import { ValidacionesRegistroProducto } from '../../../../utils/ValidacionesRegistroProducto'

const useStyles = makeStyles((theme) => ({
    contenido: {
        marginTop: theme.spacing(20)
    },
    progressField: {
        fontSize: '5rem'
    },
    fieldset: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    input: {
        width: '100%',
        backgroundColor: '#FFF'
    },
    dropzone: {
        height: '5rem'
    }
}));

function RegistrarProducto({ registerData, handleChange, handleSubmit }) {
    const classes = useStyles();
    const [errors, setErrors] = useState({});
    const [proveedores, setProveedores] = useState(null)
    const [lineas, setLineas] = useState(null)
    const [loading, setLoading] = useState(true);

    const onSubmit = (event) => {
        event.preventDefault()
        try {
            const erroresFormulario = ValidacionesRegistroProducto(registerData);
            if (Object.keys(erroresFormulario).length) {
                setErrors(erroresFormulario);
            } else {
                handleSubmit()
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        cargarDatosFormulario()
    }, [])

    const cargarDatosFormulario = async () => {
        try {
            const { data: proveedores } = await axios.get("http://localhost:5000/Proveedores")
            const { data: lineas } = await axios.get("http://localhost:5000/Lineas")
            setProveedores(proveedores)
            setLineas(lineas)
            setLoading(false)
        } catch (error) {
            console.error("Error al cargar los datos")
        }
    }

    return (
        loading ? <h1>Cargando...</h1> :
            <Container fixed className={classes.contenido}>
                <CardLayout
                    title={"Registro de Producto"}
                    description={"Todos los campos son obligatorios"}
                    Icon={<LooksOneIcon color="primary" className={classes.progressField} fontSize="large" />}
                >
                    <form onSubmit={onSubmit} encType="multipart/form-data">
                        <fieldset className={classes.fieldset}>
                            <legend>Detalles del producto</legend>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <TextField
                                        autoFocus
                                        error={errors.proNombre ? true : false}
                                        helperText={errors.proNombre}
                                        name="proNombre"
                                        className={classes.input}
                                        label={"Nombre"}
                                        variant="outlined"
                                        value={registerData.proNombre || ""}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <TextField
                                        error={errors.proCodigo ? true : false}
                                        helperText={errors.proCodigo}
                                        name="proCodigo"
                                        className={classes.input}
                                        label={"Código"}
                                        variant="outlined"
                                        value={registerData.proCodigo || ""}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6} md={6} lg={6} >
                                    <TextField
                                        error={errors.proDescripcion ? true : false}
                                        helperText={errors.proDescripcion}
                                        name="proDescripcion"
                                        className={classes.input}
                                        label={"Descripción"}
                                        multiline
                                        rows={5}
                                        variant="outlined"
                                        value={registerData.proDescripcion || ""}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid container item xs={12} sm={6} md={6} lg={6} spacing={1}>
                                    <Grid item xs={12} sm={12} md={12} lg={12} >
                                        <FormControl variant="outlined" className={classes.input}>
                                            <InputLabel id="lbl_proveedor">Proveedor</InputLabel>
                                            <Select
                                                error={errors.proId_proveedor}
                                                labelId="lbl_proveedor"
                                                name="proId_proveedor"
                                                label="Proveedor"
                                                value={registerData.proId_proveedor || -1}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={-1} disabled>
                                                    <em>Seleccione...</em>
                                                </MenuItem>
                                                {
                                                    proveedores.map(proveedor => {
                                                        return <MenuItem key={proveedor.id_proveedor} value={proveedor.id_proveedor}>{proveedor.Nombre}</MenuItem>
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <FormControl variant="outlined" className={classes.input}>
                                            <InputLabel id="lbl_linea">Linea de Producto</InputLabel>
                                            <Select
                                                error={errors.proId_linea}
                                                labelId="lbl_linea"
                                                name="proId_linea"
                                                label="Linea de Producto"
                                                value={registerData.proId_linea || -1}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={-1} disabled>
                                                    <em>Seleccione...</em>
                                                </MenuItem>
                                                {
                                                    lineas.map(linea => {
                                                        return <MenuItem key={linea.id_linea} value={linea.id_linea}>{linea.linDescripcion}</MenuItem>
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>

                                <Grid container item xs={12} sm={12} md={12} lg={12} spacing={1}>
                                    <Grid item xs={12} sm={6} md={6} lg={3}>
                                        <TextField
                                            error={errors.proPrecio ? true : false}
                                            helperText={errors.proPrecio}
                                            name="proPrecio"
                                            className={classes.input}
                                            label={"Precio: $COP"}
                                            variant="outlined"
                                            value={registerData.proPrecio || ""}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={3}>
                                        <TextField
                                            error={errors.proCantidad ? true : false}
                                            helperText={errors.proCantidad}
                                            name="proCantidad"
                                            className={classes.input}
                                            label={"Cantidad"}
                                            variant="outlined"
                                            value={registerData.proCantidad || ""}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={3}>
                                        <TextField
                                            error={errors.proIva ? true : false}
                                            helperText={errors.proIva}
                                            name="proIva"
                                            className={classes.input}
                                            label={"IVA: %"}
                                            variant="outlined"
                                            value={registerData.proIva || ""}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={3}>
                                        <FormControl variant="outlined" className={classes.input}>
                                            <InputLabel id="lbl_disponibilidad">Disponibilidad</InputLabel>
                                            <Select
                                                error={errors.proDisponibilidad}
                                                labelId="lbl_disponibilidad"
                                                name="proDisponibilidad"
                                                label="Disponibilidad"
                                                value={registerData.proDisponibilidad || -1}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={-1} disabled>
                                                    <em>Seleccione...</em>
                                                </MenuItem>
                                                <MenuItem value={1}>Disponible</MenuItem>
                                                <MenuItem value={2}>Agotado</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <InputLabel
                                        id="lbl_imagen"
                                        error={errors.proFoto}
                                    >
                                        Imagen de producto {errors.proFoto && " *Requerido"}
                                    </InputLabel>
                                    <DropzoneArea
                                        name={"dropZone"}
                                        acceptedFiles={['image/*']}
                                        dropzoneText={"Arrastra y suelta una imagen o da clic aquí"}
                                        filesLimit={1}
                                        onChange={(files) => handleChange(files)}
                                        dropzoneClass={classes.dropzone}
                                    />
                                </Grid>
                            </Grid>
                        </fieldset>

                        <Button
                            type={"submit"}
                            variant="contained"
                            color="primary"
                            fullWidth
                            className={classes.button}
                            endIcon={<NavigateNextIcon />}
                        >
                            <Typography variant="button" >REGISTRAR PRODUCTO</Typography>
                        </Button>
                    </form>
                </CardLayout>
            </Container>
    )
}

export default RegistrarProducto
