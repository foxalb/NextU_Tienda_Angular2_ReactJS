import React from 'react';
import { Redirect } from 'react-router-dom';
import * as firebase from 'firebase';
import BarraNavegacion from './BarraNavegacion.jsx';
//import CatalogoRow from './CatalogoRow.jsx';
import Catalogo from './Catalogo.jsx'; 


class Tienda extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      catalogo: [],
      productos: [],
      listaCarrito : [],
    }
    this.actualizarDisponible = this.actualizarDisponible.bind(this)
  }
  //==================Component Will Mount========================================
  componentWillMount(){
    //if(this.state.catalogo == ""){                                                   //Verificar si se ha cargado previamente la información del catálogo
      const listaProductos = []                                                 //Arreglo temporal de objetos para almacenar todos los productos
      firebase.database().ref("productos").once("value").then((snapshot) => {
        snapshot.forEach(function(childSnapshot) {
          var key = childSnapshot.key;
          var childData = childSnapshot.val();
          listaProductos.push(childData);
        });
        this.setState({catalogo : listaProductos });
        this.setState({productos : this.state.catalogo});
      })
    //}
  }
  //==============================================================================
  //                    Render
  //------------------------------------------------------------------------------
  render(){
  if(!sessionStorage.getItem('Session')){                                       //Verificar que exista sesion iniciada
    return <Redirect to="/" />
  }

    return(
    <div className="tienda row">
      <div className="container">
        <BarraNavegacion contador={this.contadorCarrito()}/>
        <div className="left lista-productos box">
          <div className="col s12 blue darken-1 animated fadeInDown fast">
            <h4 className="col m6 s12 white-text left ">Cátalogo de productos</h4>
            <h4 className="right col m6 s12 input-field">
            <i className="material-icons prefix white-text">search</i>
            <input onChange={this.filtrarCatalogo.bind(this)} type="text" id="descripcion" placeholder="aguacate"  type="text" className="white-text no-margin-bottom"/>
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
  //==============================================================================
  //                    Funciones
  //------------------------------------------------------------------------------
  mostrarProductos(){
    return this.state.productos.map(
      (producto) => { return <Catalogo actualizarDisponible={this.actualizarDisponible} productos={this.state.productos} key={ producto.id } id={producto.id}  nombre={ producto.nombre } imagen={ producto.imagen } descripcion={ producto.descripcion } disponible={ producto.disponible } precio ={producto.precio} /> }
    )
  }
  //============================================================================
  //                    Filtrar Productos
  //----------------------------------------------------------------------------
  filtrarCatalogo(event){
    this.state.productos = this.state.catalogo;             //Inicializar el catálogo de productos con la información de la base de datos
    let palabraFiltro = event.target.value.toLowerCase();   //Pasar la infromación a minúsculas para hacerlas coincidir con el parámetro nombre en la base de datos
    let itemMatch = [];                                     //Inicializar el arreglo de productos coincidentes

    for(let item of this.state.productos){                  //Recorrer el arreglo de productos en el Catalogo
      let nombre = item.nombre.toLowerCase();               //crear una variable para comparar los productos
      if(nombre.includes( palabraFiltro )){                 //Verificar que algún item del catálogo contenga los caracteres especificados en el campo de búsqueda
        itemMatch.push(item)}                               //Agregar el producto coincidente al arreglo
      }
      this.setState({productos : itemMatch});
      if(itemMatch.length == 0){
        this.state.productos = []
      }
    }
    //=============================================================================
    //             Guardar Items en el carrito
    //--------------Actualizar Disponible------------------------------------------
    actualizarDisponible(item, cantidad){
      for (let productoLista of this.state.productos){
        if (productoLista.id == item.id){
          this.verificarCarrito(item, cantidad)
          productoLista.disponible = (Number(productoLista.disponible) - Number(cantidad))
          this.setState({productos : this.state.productos})
          this.setState({listaCarrito : this.state.listaCarrito})
        }
      }
    }
    //-------------Verificar Carrito------------------------------------------------
    verificarCarrito(item, cantidad){
      if(this.guardarCarrito(item, cantidad) == false){                                //Verificar que el item enviado como parámetro no exista previamente en el arreglo de objetos de productos
        this.state.listaCarrito.push(item)                                             //Si no existe agregarlo al arreglo
      }
      this.setState({listaCarrito : this.state.listaCarrito})                          // Actualizar el estado listaCarrito
      sessionStorage.setItem("Carrito", JSON.stringify(this.state.listaCarrito));      //Actualizar la sesion Carrito con los nuevos valores del arreglo en formato string*/
    }
    //------------Agregar a Carrito-------------------------------------------------
    guardarCarrito(item, cantidad){
      if(this.state.listaCarrito.length > 0){                                                     //Verificar que el carrito contenga informacion
        for(let itemGuardado of this.state.listaCarrito){                                        //Recorrer el arreglo de productos actuales en el carrito
          if(itemGuardado.id == item.id){                                                       //Verificar que el producto en el carrito coincida con el id del producto enviado como parámetro
            itemGuardado.cantidad = (Number(itemGuardado.cantidad) + Number(cantidad))
            return true //Devolver verdadero si el producto existia en el carrito
          }
        }
        return false; //Devolver falso si el producto no existia en el carrito
      }
      return false; //Devolver falso si el producto no existia en el carrito
    }
    //==============================================================================
    //==============================================================================
    //                    Verificar items en carrito
    itemsCarrito(){
      if(sessionStorage.getItem("Carrito")){                                    //Verificar si la sesión del carrito contiene información
        this.state.listaCarrito = JSON.parse(sessionStorage.getItem("Carrito")); //Actualizar la información del carrito con la sesión actual en formato JSON
        return JSON.parse(sessionStorage.getItem("Carrito"));                    //Devolver los items del carrito en formato JSON
      }
      return 0;                                                                  //Devolver 0 si no existen carritos
    }
    //--------------------Contador de items en menu---------------------------------
    contadorCarrito(){
      return this.itemsCarrito().length //Contar la cantidad de items en el carrito
    }
  }
  export default Tienda;
