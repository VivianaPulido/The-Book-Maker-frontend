import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import NavBar from './components/NavBar'
import Landing from './components/Landing'
import Signup from './components/Signup'
import Login from './components/Login'
import Footer from './components/Footer'
import Calculadora from './components/Calculadora'
import Servicios from './components/Servicios'
import Tienda from './components/Tienda'
import Privacidad from './components/Privacidad'
import MiPerfil from './components/MiPerfil'
import Edicion from './components/Edición'

import AuthState from './context/autenticacion/AuthState'
import AlertaState from './context/alertas/AlertaState'

import tokenAuth from './config/token'



function App() {
  return (
    <>

    <AlertaState> 
    <AuthState>
      <Router>
        <NavBar />

        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/login" component={Login} />
          <Route exact path="/calculadora" component={Calculadora} />
          <Route exact path="/servicios" component={Servicios} />
          <Route exact path="/tienda" component={Tienda} />
          <Route exact path="/mis-obras" component={MiPerfil} />
          <Route exact path="/aviso-de-privacidad" component={Privacidad} />
          <Route exact path="/mis-obras/:id" component={Edicion} />
        </Switch>

        <Footer />
      </Router>
      </AuthState>
      </AlertaState>  
     
    </>
  );
}

export default App;
