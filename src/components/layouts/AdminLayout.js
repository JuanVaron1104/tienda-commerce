import { makeStyles } from '@material-ui/core/styles';

import top from '../../assets/background/top_adm.svg'
import botton from '../../assets/background/botton_adm.svg'

const useStyles = makeStyles({
  img_top: {
    position: 'absolute',
    top: 0,
    left: 0,
    //zIndex: '-9'
  },
  img_botton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    //zIndex: '-9'
  },
  contenedor: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#939393'
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
