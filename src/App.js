import './App.css';
import NavBar from './components/NavBar'
import Landing from './components/Landing'
import Signup from './components/Signup'
import Login from './components/Login'
import Footer from './components/Footer'
import Calculadora from './components/Calculadora'
import Servicios from './components/Servicios'
import Tienda from './components/Tienda'
import Privacidad from './components/Privacidad'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

function App() {
  return (
    <>   
      <Router>
        <NavBar />

        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/login" component={Login} />
          <Route exact path="/calculadora" component={Calculadora} />
          <Route exact path="/servicios" component={Servicios} />
          <Route exact path="/tienda" component={Tienda} />
          <Route exact path="/aviso-de-privacidad" component={Privacidad} />
        </Switch>

        <Footer />
      </Router>
     
    </>
  );
}

export default App;
