import { Link } from 'react-router-dom'
import './404.css'

function Error_404() {
    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>404</h1>
                </div>
                <h2>Oops! PAGINA NO ENCONTRADA</h2>
                <p>
                    Es posible que la página que está buscando se haya eliminado, cambiado
                    el nombre o no está disponible temporalmente.
                    <Link to="/">
                        Volver a inicio
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Error_404
