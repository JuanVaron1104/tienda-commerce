import { makeStyles } from '@material-ui/core/styles';

import top from '../../assets/background/top_1.svg'
import botton from '../../assets/background/botton_1.svg'

const useStyles = makeStyles({
  img_top: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  img_botton: {
    position: 'absolute',
    bottom: 0,
    left: 0
  },
  contenedor: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh'
  }
});

function AdminLayout({ children }) {
  const classes = useStyles();
  return (
    <div className={classes.contenedor}>
      <img src={top} alt="bg-top" className={classes.img_top} />

      {children}

      <img src={botton} alt="bg-botton" className={classes.img_botton} />
    </div>
  )
}

export default AdminLayout
