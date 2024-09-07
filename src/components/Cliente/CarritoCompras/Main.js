import { makeStyles } from '@material-ui/core/styles';
import Producto from './Producto'

const useStyles = makeStyles((theme) => ({
    main: {
        backgroundColor: '#e0e0e0',
        padding: '1rem',
        margin: '0.5rem',
        borderRadius: '0.5rem',
        flex: '2'
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

function Main({ products, handleDeleteProducto }) {
    const classes = useStyles();

    return (
        <main className={classes.main}>
            <h2>Productos en carrito</h2>
            <div className={classes.row}>
                {products.map((product, index) => (
                    <Producto key={index} product={product} handleDeleteProducto={handleDeleteProducto} ></Producto>
                ))}
            </div>
        </main>
    )
}

export default Main
