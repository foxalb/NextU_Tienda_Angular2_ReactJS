import React from 'react'
import { Link } from 'react-router-dom'
import update from 'immutability-helper'; //Manejo de arrays

class Catalogo extends React.Component { 

//==============================================================================
//                    Component Will Mount
//------------------------------------------------------------------------------
  componentWillMount(){
    this.setState({loader:true});
   }
//===============================================================================
//                    Constructor
//------------------------------------------------------------------------------
  constructor(props) {
    super(props);
    this.state = { //Inicializar variables
      inputValue : 1,
      listaProductos: [],
      listaCarrito: [],
      loader : true
    };

    this.agregarProducto = this.agregarProducto.bind(this);
    //this.btnTapped = this.btnTapped.bind(this);
  }
//==============================================================================
//                    Render
//------------------------------------------------------------------------------
  render() {
    return (
        <div className="col s12 m4 l3 animated fadeIn fast">
          <div className="card">
            <div className="card-image">
              <img src={this.props.imagen}/>
              <span className="card-title  text-shadow">{this.props.descripcion}</span>
             </div>
            <div className="card-content">
              <div className="informacion">
                <span className="badge carrito"><small className="white-text text-shadow"><i className="material-icons">shopping_cart</i> <p>!-this.obtenerCantidad(this.props.id)-!</p></small></span>
                <p><b>Precio: </b>{this.props.precio}</p>
                <p><b>Disponibles: </b>{this.props.disponible ? this.props.disponible : 'Agotado'}</p>
                <div className="input-group" >
                  <div className="file-field input-field">
                      <button  onClick={this.agregarProducto} className="btn input waves-effect waves-light" type="button" disabled={ (this.props.disponible <= 0) ? true : false } > <i className="material-icons">add_shopping_cart</i></button>
                    <div className="file-path-wrapper">
                      <input type="number" value={this.state.inputValue} disabled={ (this.props.disponible <= 0 ) ? true : false } min="0" max={this.props.disponible} className="form-control right-align" onChange={evt => this.updateInputValue(evt)}></input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-action"><Link to={`/producto/${this.props.id}`}>Ver detalle</Link></div>
          </div>
        </div>
    )
  }
//======================EventListener para campo de busqueda====================
  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }
//==============================================================================
  componentWillMount(){
    this.setState({loader:false});
  }

//==============================================================================
//                    Funciones
//------------------------------------------------------------------------------
//--------------------Agregar Productos-----------------------------------------
  agregarProducto(){
     let producto = this.props;
     let cantidad = this.state.inputValue
     if(producto.disponible < cantidad){
       alert('Máxima existencia es: '+ producto.disponible);    //Mostrar un mensaje de alerta con la cantidad maxima disponible
     }else{
       alert("agregando "+cantida)
     }
  }
//------------------------------------------------------------------------------
  componentDidMount(){
    //console.log(this.props)
    //console.log('Aplicacion iniciada')
  }












  //************************Revisar**********************
  btnTapped() {
    /*console.log(this.props)
    let cantidad = 0;
    this.state.listaCarrito = update(this.state.listaCarrito, {$push: [{id: this.props.id, cantidad: this.state.inputValue}]})
    let producto = this.state.listaCarrito;
    this.state.listaCarrito.forEach(function(item, index){
       cantidad = Number(cantidad) + Number(item.cantidad)
    })
    //this.actualizarDisponible(this.props)
    //console.log(this.state.listaCarrito)*/
    this.verificarCarrito(this.props)
 }

 //===Verificar existencia en el carrito para evitar items duplicados============
   verificarCarrito(item){
     if(this.guardarCarrito(item) == false){ //Verificar que el item enviado como parámetro no exista previamente en el arreglo de objetos de productos
       this.state.listaCarrito = update(this.state.listaCarrito, {$push: [{id: this.props.id, cantidad: this.state.inputValue}]}) //Si no existe agregarlo al arreglo
       console.log('Agregando Producto')
     }
     //sessionStorage.setItem("Carrito", JSON.stringify(this.listaCarrito)); //Actualizar la sesion Carrito con los nuevos valores del arreglo en formato string
   }

   //=============Guardar Items en el carrito======================================
     guardarCarrito(item){
       if(this.state.listaCarrito.length > 0){ //Verificar que el carrito contenga informacion
         for(let itemGuardado of this.state.listaCarrito){ //Recorrer el arreglo de productos actuales en el carrito
           if(itemGuardado.id == item.id){ //Verificar que el producto en el carrito coincida con el id del producto enviado como parámetro
             itemGuardado.cantidad = Number(itemGuardado.cantidad) + Number(item.cantidad) //Aumentar la cantidad del producto en el carrito
             return true //Devolver verdadero si el producto existia en el carrito
           }
         }
         return false; //Devolver falso si el producto no existia en el carrito
       }
       return false; //Devolver falso si el producto no existia en el carrito
     }


 verificarCarrito(item){
   if(this.guardarCarrito(item) == false){ //Verificar que el item enviado como parámetro no exista previamente en el arreglo de objetos de productos
     this.state.listaCarrito.push(item) //Si no existe agregarlo al arreglo
   }
   sessionStorage.setItem("Carrito", JSON.stringify(this.state.listaCarrito)); //Actualizar la sesion Carrito con los nuevos valores del arreglo en formato string
 }

  /*actualizarDisponible(item, cantidad){
    let disponible = Number(this.props.disponible) - Number(cantidad)
    console.log('Disponible: '+disponible)
    this.props.actualizarVistaDisponible(cantidad)
    this.props.actualizarCarrito(this.props.id, cantidad)

  }*/
}

export default Catalogo
/*return <EmpleadoRow id={ key }
                    nombre={ this.props.nombre }
                    descripcion={ this.props.descripcion }
                    imagen={ this.props.imagen }
                    disponible={ this.props.disponible } />
              //<EmpleadoAvatar picture={this.props.picture} />*/
