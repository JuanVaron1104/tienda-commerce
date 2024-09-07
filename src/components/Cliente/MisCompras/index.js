import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';

import ComprasRecientes from './ComprasRecientes';
import HistoricoCompras from './HistoricoCompras';
import './miscompras.css'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    background: '#F9f9f9',
  }
});

export default function MediaCard() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          align="center"
          variant="h1"
          color="primary"
          gutterBottom
        >
          Mis Compras
        </Typography>
        <ComprasRecientes />
        <br />
        <hr />
        <br />
        <HistoricoCompras />
      </CardContent>
    </Card>
  );
}