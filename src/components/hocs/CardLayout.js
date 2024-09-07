import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    input: {
        margin: theme.spacing(1),
        width: '250px'
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '30px 60px',
        background: '#F9F9F9',
    }
}));

function CardLayout({ title, description, Icon, children }) {
    const classes = useStyles();
    return (
        <Paper elevation={5} className={classes.card}>
            {
                Icon ? Icon : <></>
            }
            <Typography variant="h4" align="center" gutterBottom> {title} </Typography>
            <Typography variant="body1"> {description} </Typography>
            {children}
        </Paper>
    )
}

export default CardLayout
