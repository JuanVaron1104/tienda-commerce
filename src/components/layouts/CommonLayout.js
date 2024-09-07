import { makeStyles } from '@material-ui/core/styles';

import top from '../../assets/background/top.svg'
import botton from '../../assets/background/botton.svg'

const useStyles = makeStyles({
  img_top: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: '-9'
  },
  img_botton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: '-9'
  },
  contenedor: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh'
  }
});

function CommonLayout({ children }) {
  const classes = useStyles();
  return (
    <div className={classes.contenedor}>
      <img src={top} alt="bg-top" className={classes.img_top} />

      {children}

      <img src={botton} alt="bg-botton" className={classes.img_botton} />
    </div>
  )
}

export default CommonLayout
