import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    main: {
        flex: 1,
        backgroundColor: '#e0e0e0',
        padding: '1rem',
        margin: '0.5rem',
        borderRadius: '0.5rem',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    col2: {
        flex: 2
    },
    col1: {

    },
    remove: {
        backgroundColor: '#f04040',
        width: '1.5rem'
    },
    add: {
        backgroundColor: '#40c0f0',
        width: '1.5rem'
    },
    col1Tr: {
        flex: 1,
        textAlign: 'right'
    },
    col2Tr: {
        flex: 2,
        textAlign: 'right'
    },
    button: {
        fontSize: '0.8rem',
        padding: '0.2rem',
        margin: '0.1rem',
        borderRadius: '0.5rem',
        border: '0.1rem #404040 solid',
        backgroundColor: '#f0c040',
        width: '100%',
        cursor: 'pointer',
    }
}));

function Basket({ cartItems, onAdd, onRemove, handleSubmitComprar }) {
    const classes = useStyles();
    const itemsPrice = cartItems.reduce((a, c) => a + c.detcarCantidad * c.proPrecio, 0);
    const taxPrice = cartItems.reduce((a, c) => a + (c.detcarCantidad * c.proPrecio) * (c.proIva / 100), 0);
    const totalPrice = itemsPrice + taxPrice;

    const handleSubmit = () => {   
        handleSubmitComprar(itemsPrice , taxPrice, totalPrice)
    }

    return (
        <aside className={classes.main}>
            <h2>ARTÍCULOS EN EL CARRITO</h2>
            <div>
                {cartItems.length === 0 && <div>Carrito esta vació</div>}
                {cartItems.map((item) => (
                    <div key={item.proCodigo} className={classes.row}>
                        <div className={classes.col2}>
                            {`${item.proNombre} `} <br />
                            <strong>IVA: {item.proIva}%</strong>
                        </div>
                        <div className={classes.col2}>
                            <button onClick={() => onRemove(item)} className={classes.remove}>
                                -
                            </button>{' '}
                            <button onClick={() => onAdd(item)} className={classes.add}>
                                +
                            </button>
                        </div>

                        <div className={classes.col2Tr}>
                            {item.detcarCantidad} x ${item.proPrecio.toFixed(2)}
                        </div>
                    </div>
                ))}

                {cartItems.length !== 0 && (
                    <>
                        <hr></hr>
                        <div className={classes.row}>
                            <div className={classes.col2}>SubTotal</div>
                            <div className={classes.col1Tr}>${itemsPrice.toFixed(2)}</div>
                        </div>
                        <div className={classes.row}>
                            <div className={classes.col2}>
                                {`IVA `}
                            </div>
                            <div className={classes.col1Tr}>${taxPrice.toFixed(2)}</div>
                        </div>

                        <div className={classes.row}>
                            <div className={classes.col2}>
                                <strong>Precio Total</strong>
                            </div>
                            <div className={classes.col1Tr}>
                                <strong>${totalPrice.toFixed(2)}</strong>
                            </div>
                        </div>
                        <hr />
                        <div className={classes.row}>
                            <button onClick={handleSubmit} className={classes.button}>
                                COMPRAR
                            </button>
                        </div>
                    </>
                )}
            </div>
        </aside>
    )
}

export default Basket
