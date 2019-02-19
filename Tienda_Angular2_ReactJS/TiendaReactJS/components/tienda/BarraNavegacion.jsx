import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Producto from './Producto.jsx';
import Carrito from './Carrito.jsx';
import LoginForm from '../Login.jsx';
import Componente2 from './componente2.jsx'; 



class Main extends React.Component{
constructor(){
  super()
  this.state = {
      mensaje: 'Este es un mensaje',
      mensaje2: 'Este es el mensaje cambiado'
    }
  }
  render(){
      return(
          <nav className="blue darken-1">
            <div className="nav-wrapper">
              <a className="brand-logo text-shadow" href="#"><i className="material-icons">shopping_cart</i><p> VirtualStore</p></a>
              <ul className="right">
                <li><Link to="/tienda" className="text-shadow active"><i className="material-icons">apps</i></Link></li>
                <li><Link to="/carrito" className="text-shadow active"><i className="material-icons">shopping_cart</i><span className="item-counter">10</span></Link></li>
                <li className="cursor " onClick={this.logout}><Link to="/login"><i className="material-icons text-shadow">assignment_return</i></Link></li>
              </ul>
            </div>
          </nav>
        );
  }

  logout(){
    sessionStorage.removeItem('Session'); //Eliminar los datos de la sesión
  }

  changeState(){
    this.setState({mensaje: 'Este es mi nuevo valor'})
  }

}
export default Main;

//<h1>{this.state.mensaje}</h1>
//<Componente2 mensajeProps={this.state.mensaje2} cambiarEstado={this.changeState.bind(this)}/>
