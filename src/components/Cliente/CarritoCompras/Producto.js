import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 300
    },
    small: {
        maxHeight: '8rem'
    }
}));

function Producto({ product, handleDeleteProducto }) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt={product.proNombre}
                    height="140"
                    image={`http://localhost:5000/${product.proFoto}`}
                    title={product.proNombre}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {product.proNombre}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {`Precio: $${product.proPrecio}`}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button 
                variant="contained" 
                size="small" 
                color="secondary" 
                fullWidth
                onClick={()=> handleDeleteProducto(product.proCodigo)}
                >
                    Eliminar
                </Button>
            </CardActions>
        </Card>
    )
}

export default Producto
