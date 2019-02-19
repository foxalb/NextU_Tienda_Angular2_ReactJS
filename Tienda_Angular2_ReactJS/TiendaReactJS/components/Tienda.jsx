import React from 'react';
import { Redirect } from 'react-router-dom';
import update from 'immutability-helper'; //Manejo de arrays
import * as firebase from 'firebase';
import BarraNavegacion from './tienda/BarraNavegacion.jsx';
//import CatalogoRow from './tienda/CatalogoRow.jsx';
import Catalogo from './tienda/Catalogo.jsx';


class Tienda extends React.Component{
//==================Component Will Mount========================================
  componentWillMount(){
    const listaProductos = [] //Arreglo temporal de objetos para almacenar todos los productos
    firebase.database().ref("productos").once("value").then((snapshot) => {
        snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            var childData = childSnapshot.val();
            listaProductos.push(childData);
        });
        this.setState({catalogo : listaProductos });
        this.setState({productos : this.state.catalogo});
        //console.log(this.state.catalogo, listaProductos.length);
    });
  }

  actualizarVistaDisponible(cantidad){
    console.log('Candidad: '+cantidad)
  }

//==============================================================================
  constructor(props) {
    super(props)
      this.state = {
        catalogo: [],
        productos: [],
        listaCarrito : [],
      }
      this.filtrarCatalogo = this.filtrarCatalogo.bind(this);
  }

// /*actualizarVistaDisponible={this.actualizarVistaDisponible} actualizarCarrito={this.agregarACarrito.bind(this)*/
//==============================================================================
    render(){
        return(
          <div className="tienda row">
            <div className="container">
            <BarraNavegacion />
              <div className="left lista-productos box">
                <div className="row col s12 blue darken-1 animated fadeInDown fast">
                  <h4 className="col m6 s12 white-text left ">Cátalogo de productos</h4>
                  <h4 className="right col m6 s12 input-field">
                    <i className="material-icons prefix white-text">search</i>
                    <input onChange={this.filtrarCatalogo} type="text" id="descripcion" placeholder="aguacate"  type="text" className="white-text no-margin-bottom"/>
                    <label htmlFor="descripcion" className="white-text">¿Qué estás buscando?</label>
                  </h4>
                </div>
                {
                  this.mostrarProductos()
                }
              </div>
            </div>
          </div>
        )
  }

  mostrarProductos(){
    //console.log(this.state.productos)
    return this.state.productos.map(
              (producto) => { return <Catalogo key={ producto.id } id={producto.id}  nombre={ producto.nombre } imagen={ producto.imagen } descripcion={ producto.descripcion } disponible={ producto.disponible } filtro ={this.state.palabraFiltro} /> }
            )
  }
  //==============================================================================
  //                    Filtrar Productos

  filtrarCatalogo(event){
    this.state.productos = this.state.catalogo;                 //Inicializar el catálogo de productos con la información de la base de datos
    let palabraFiltro = event.target.value.toLowerCase();       //Pasar la infromación a minúsculas para hacerlas coincidir con el parámetro nombre en la base de datos
    let itemMatch = [];                                       //Inicializar el arreglo de productos coincidentes

      for(let item of this.state.productos){                    //Recorrer el arreglo de productos en el Catalogo
        let nombre = item.nombre.toLowerCase();                 //crear una variable para comparar los productos
        if(nombre.includes( palabraFiltro )){                   //Verificar que algún item del catálogo contenga los caracteres especificados en el campo de búsqueda
          itemMatch.push(item)}                                 //Agregar el producto coincidente al arreglo
        }
      this.setState({productos : itemMatch});
      if(itemMatch.length == 0){
        this.state.productos = []
      }
      console.log(this.state.productos)
  }

 //==============================================================================

/*//==============================================================================
  */


  componentDidMount(){
    console.log(this.state.productos)
    console.log('component Mounted')
  }
  //==============================================================================


}

export default Tienda;
//<Catalogo listado={this.state.productos} actualizarVistaDisponible={this.actualizarVistaDisponible.bind(this)}/>
