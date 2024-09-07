import axios from 'axios';
import { useEffect, useState } from 'react';
import { Typography, FormControlLabel, TextField, MenuItem, FormLabel, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    barraFiltros: {
        display: 'flex',
        margin: theme.spacing(2),
        justifyContent: 'center',
        alignItems: 'center'
    },
    filtros: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2)
    },
    select: {
        marginLeft: theme.spacing(1),
        minWidth: theme.spacing(20)
    }
}));

function BarraDeFiltros({ filtros, handleChange, clearFilters }) {
    const classes = useStyles();
    const [proveedores, setProveedores] = useState(null)
    const [lineas, setLineas] = useState(null)
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        cargarDatosFormulario()
    }, [])

    return (
        loading ? <h1>Cargando...</h1> :
            <div className={classes.barraFiltros} >
                <FormControlLabel
                    control={<SearchIcon />}
                    label={<Typography variant="button" component="span" >Filtros</Typography>}
                />

                <div className={classes.filtros} >
                    <FormLabel>
                        Por Proveedor:
                    </FormLabel>
                    <TextField
                        select
                        variant="outlined"
                        className={classes.select}
                        name="proveedor"
                        value={filtros.proveedor || 0}
                        onChange={handleChange}
                    >
                        <MenuItem value={0}>
                            <em>Todos</em>
                        </MenuItem>
                        {
                            proveedores.map(proveedor => {
                                return <MenuItem key={proveedor.id_proveedor} value={proveedor.id_proveedor}>{proveedor.Nombre}</MenuItem>
                            })
                        }
                    </TextField>
                </div>

                <div className={classes.filtros} >
                    <FormLabel>
                        Por Linea:
                    </FormLabel>
                    <TextField
                        select
                        variant="outlined"
                        className={classes.select}
                        name="linea"
                        value={filtros.linea || 0}
                        onChange={handleChange}
                    >
                        <MenuItem value={0}>
                            <em>Todos</em>
                        </MenuItem>
                        {
                            lineas.map(linea => {
                                return <MenuItem key={linea.id_linea} value={linea.id_linea}>{linea.linDescripcion}</MenuItem>
                            })
                        }
                    </TextField>
                </div>

                <div className={classes.filtros} >
                    <FormLabel>
                        Por Precio:
                    </FormLabel>
                    <TextField
                        select
                        variant="outlined"
                        className={classes.select}
                        name="precio"
                        value={filtros.precio || 0}
                        onChange={handleChange}
                    >
                        <MenuItem value={0}>
                            <em>Todos</em>
                        </MenuItem>
                        <MenuItem value={1}>
                            Hasta $100.000
                        </MenuItem>
                        <MenuItem value={2}>
                            De $100.000 a $300.000
                        </MenuItem>
                        <MenuItem value={3}>
                            De $300.000 a $700.000
                        </MenuItem>
                        <MenuItem value={4}>
                            Desde $700.000
                        </MenuItem>
                    </TextField>
                </div>

                <Button color="secondary" onClick={clearFilters}>
                    Limpiar
                </Button>
            </div>
    )
}

export default BarraDeFiltros
