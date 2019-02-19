import React from 'react';
import { BrowserRouter as Router, Route, Link, IndexRoute } from 'react-router-dom';
import Tienda from './Tienda.jsx';
import Producto from './Producto.jsx';
import Carrito from './Carrito.jsx';
import LoginForm from '../Login.jsx'; 

class Main extends React.Component{
  render(){
      return(
          <nav className="blue darken-1">
            <div className="nav-wrapper">
              <a className="brand-logo text-shadow" href="#"><i className="material-icons">shopping_cart</i><p> VirtualStore</p></a>
              <ul className="right">
                <li><Link to="/tienda" className="text-shadow active"><i className="material-icons">apps</i></Link></li>
                <li><Link to="/carrito" className="text-shadow active"><i className="material-icons">shopping_cart</i><span hidden={(this.props.contador > 0) ? false : true } className="item-counter">{this.props.contador}</span></Link></li>
                <li className="cursor " onClick={this.logout}><Link to="/"><i className="material-icons text-shadow">assignment_return</i></Link></li>
              </ul>
            </div>
          </nav>
        );
  }

  logout(){
    sessionStorage.removeItem('Session'); //Eliminar los datos de la sesión
  }
}
export default Main;

//<h1>{this.state.mensaje}</h1>
//<Componente2 mensajeProps={this.state.mensaje2} cambiarEstado={this.changeState.bind(this)}/>
