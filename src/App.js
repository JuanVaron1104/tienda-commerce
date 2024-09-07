import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import AuthAdministrador from "./components/router/AuthAdmin";
import Logout from "./components/router/Logout";
import RegisterView from "./views/RegisterView";
import LoginView from "./views/LoginView";
import HomeCliente from "./views/HomeCliente";
import PageNotFound from "./components/common/Errors/404"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/Login" component={LoginView} />
        <Route exact path="/Logout" component={Logout} />
        <Route exact path="/Registro" component={RegisterView} />
        <Route path="/Administrador" component={AuthAdministrador} />
        <Route path="/" component={HomeCliente} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </Router>
  )
}

export default App;
