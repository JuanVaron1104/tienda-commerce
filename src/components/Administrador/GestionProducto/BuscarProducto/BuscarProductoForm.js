import axios from 'axios';
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Container, FormControl, InputLabel, Input, InputAdornment, Button, Typography } from '@material-ui/core/'

import SearchIcon from '@material-ui/icons/Search';

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

function BuscarProducto({ url, setData, setLoading }) {
    const classes = useStyles()
    const [searchData, setSearchData] = useState("")

    const handleChange = (event) => {
        setSearchData(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (searchData !== "") {
            const { data } = await axios.get(url, {
                params: {
                    searchData: searchData
                }
            })
            setData(data)
            setLoading(false)
        }
    }

    return (
        <Container fixed>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Typography variant={"h4"} align={"Center"} className={classes.margin}>
                    Búsqueda de producto
                </Typography>

                <Typography variant={"button"} align={"Center"}>
                    Escribe una palabra o frase para buscar
                </Typography>
                <FormControl className={classes.margin}>
                    <InputLabel htmlFor="searchData">Descripción</InputLabel>
                    <Input
                        autoFocus
                        error={searchData === "" ? true : false}
                        id="searchData"
                        name="searchData"
                        value={searchData}
                        onChange={handleChange}
                        endAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<SearchIcon />}
                >
                    Buscar
                </Button>
            </form>
        </Container>
    )
}

export default BuscarProducto
