import React from 'react';
import ReactDOM from 'react-dom'; 
import { render } from 'react-dom'
//import { Router, Route, browserHistory, IndexRoute} from 'react-router';
import { BrowserRouter as Router, Route, browserHistory, IndexRoute } from 'react-router-dom'
//=================Importar Componentes======================
//import App from './App.jsx';
import LoginForm from './components/Login.jsx';
//import App from './components/App.jsx';
import Tienda from './components/Tienda.jsx';
import Carrito from './components/tienda/Carrito.jsx';
import Producto from './components/tienda/Producto.jsx'
//import BarraNavegacion from './components/tienda/BarraNavegacion.jsx';
//import LoginFirebase from './components/Login.jsx';

ReactDOM.render(

    <Router history={browserHistory} >
      <div>
        <Route path="/login" component={LoginForm}/>
        <Route path="/tienda" component={Tienda}/>
        <Route path="/carrito" component={Carrito}/>
        <Route path='/producto/:id' component={Producto}/>
        <Route path="/" component={LoginForm}/>
      </div>
    </Router>
  , document.getElementById('app')
)

//ReactDOM.render(<BarraNavegacion />, document.getElementById('barra-navegacion'))
//ReactDOM.render(<Tienda />, document.getElementById('tienda'))
//ReactDOM.render(<Firebase />, document.getElementById('firebase'))
//ReactDOM.render(<Login />, document.getElementById('login'))
