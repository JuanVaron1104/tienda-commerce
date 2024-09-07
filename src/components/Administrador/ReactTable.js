import ReactFlexyTable from 'react-flexy-table'
import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import 'react-flexy-table/dist/index.css'

const useStyles = makeStyles((theme) => ({
    contenido: {
        zIndex: 9,
        backgroundColor: '#F9F9F9',
        padding: 0,
        margin: 0
    },
    table: {
        width: "60vw",
        overflowX: 'auto'
    },
    title: {
        fontWeight: 500,
        textAlign: 'center',
        margin: theme.spacing(3)
    },
    description: {
        margin: theme.spacing(2),
        textAlign: 'center'
    }
}));

function ReactTable({
    title,
    descripcion,
    formID,
    data = [],
    columnasAdicionales,
    columnasSinFiltros,
    columnasSinOrdenamiento,
    Icon1 = DonutLargeIcon,
    Icon2 = DonutLargeIcon
}) {
    const classes = useStyles();

    const additionalCols = [
        {
            header: 'Acciones',
            td: (data) => {
                return (
                    <div>
                        {
                            <Icon1
                                width='50'
                                height='50'
                                onClick={() => alert('this is edit for id ' + data[`${formID}`])}
                            />
                        }

                        {
                            columnasAdicionales === 2 && (
                                <Icon2
                                    width='50'
                                    height='50'
                                    onClick={() => alert('this is delete for id ' + data[`${formID}`])}
                                />
                            )
                        }
                    </div>
                )
            }
        }
    ]

    return (
        <Container fixed>
            <Typography variant="h3" component="h1" className={classes.title} >{title}</Typography>
            {
                descripcion && <Typography variant="body1" className={classes.description} > {descripcion} </Typography>
            }
            <Container maxWidth="md" className={classes.contenido}>
                <ReactFlexyTable
                    className={classes.table}
                    data={data}
                    previousText="Anterior"
                    nextText="Siguiente"
                    rowsText="Mostrar"
                    pageText="Pag."
                    ofText=" de"
                    totalDataText="Usuarios encontrados: "
                    filteredDataText="Usuarios filtrados: "
                    pageSizeOptions={[4, 5, 6]}
                    additionalCols={columnasAdicionales ? additionalCols : []}
                    filterable={columnasSinFiltros ? true : false}
                    nonFilterCols={columnasSinFiltros}
                    sortable={columnasSinOrdenamiento ? true : false}
                    nonSortCols={columnasSinOrdenamiento}
                />
            </Container >
        </Container>
    )
}

export default ReactTable
