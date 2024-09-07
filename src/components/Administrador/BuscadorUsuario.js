import axios from 'axios'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Container, FormControl, InputLabel, Input, InputAdornment, Button } from '@material-ui/core/'

import EmailIcon from '@material-ui/icons/Email'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'
import PageviewIcon from '@material-ui/icons/Pageview'

import { validacionesBusquedaUsuario } from '../../utils/ValidacionesBusquedaUsuario'

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: 500,
        justifyContent: 'space-between',
        padding: 30
    },
    margin: {
        margin: 10
    },
    button: {
        margin: 15
    }
}));

function BuscadorUsuario({ url, setData, setLoading }) {
    const classes = useStyles()

    const [errors, setErrors] = useState({});
    const [searchData, setSearchData] = useState({ usuNumeroDocumento: "", usuCorreo: "" })

    const handleChange = (event) => {
        setSearchData({ ...searchData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        try {
            const erroresFormulario = validacionesBusquedaUsuario(searchData);
            if (Object.keys(erroresFormulario).length) {
                setErrors(erroresFormulario);
            } else {
                setErrors({})
                buscarUsuarios()
            }
        } catch (error) {
            console.error(error);
        }
    }

    const buscarUsuarios = async () => {
        try {
            const { data } = await axios.get(url, {
                params: {
                    usuNumeroDocumento: searchData.usuNumeroDocumento,
                    usuCorreo: searchData.usuCorreo
                }
            })
            setData(data)
            setLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Container fixed>
            <form className={classes.form} onSubmit={handleSubmit}>
                <FormControl className={classes.margin}>
                    <InputLabel htmlFor="identificacion">Identificación</InputLabel>
                    <Input
                        autoFocus
                        error={errors.usuNumeroDocumento ? true : false}
                        id="identificacion"
                        name="usuNumeroDocumento"
                        value={searchData.usuNumeroDocumento}
                        onChange={handleChange}
                        startAdornment={
                            <InputAdornment position="start">
                                <PermIdentityIcon />
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <FormControl className={classes.margin}>
                    <InputLabel htmlFor="correo">Correo Electrónico</InputLabel>
                    <Input
                        error={errors.usuCorreo ? true : false}
                        id="correo"
                        name="usuCorreo"
                        value={searchData.usuCorreo}
                        onChange={handleChange}
                        startAdornment={
                            <InputAdornment position="start">
                                <EmailIcon />
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<PageviewIcon />}
                >
                    Buscar
                </Button>
            </form>
        </Container>
    );

}

export default BuscadorUsuario
