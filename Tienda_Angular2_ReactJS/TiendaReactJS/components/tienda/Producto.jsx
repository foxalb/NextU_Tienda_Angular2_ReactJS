import React from 'react';

class Producto extends React.Component{
  constructor(){
    super()
    this.state = {

      }
    }
    render({match}) {
    console.log({match})
        return(
          <div>
            DetalleProductos
          </div> 
       );
    }

    changeState(){

    }

}
export default Producto;
