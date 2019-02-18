import { Injectable } from '@angular/core'; 
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router'; //Inyectar el componente router para manejar redirecciones URL

@Injectable()
export class AuthService {
  constructor( private router : Router, private http: Http ) { }

  //Obtener los usuarios almacenados en la base de datos
  getUsuarios(){
    return this.http.get('https://tienda-angular2.firebaseio.com/usuarios/.json')
    .map((response : Response) => { return response.json() })
  }

  getUsuariosPOST(email:string, password:string){
    let data = JSON.stringify({email:email, password:password})
    let simpleEmail = email.replace(/[^a-zA-Z 0-9.]+/g,'');
        simpleEmail= email.replace(/\./g,'')
    return this.http.put(`https://tienda-angular2.firebaseio.com/usuarios/${ simpleEmail }.json`, data)
    .map((response : Response) => {

      return response.json()
    })
  }

  logout(){
    sessionStorage.removeItem('Session');
    this.router.navigate(['login'])
  }

  checkSession(){
    if(sessionStorage.getItem("Session")){
      console.log("Bienvenido "+sessionStorage.getItem("Session"))
    }
    return sessionStorage.getItem("Session"); //Verificar si hay una sesión iniciada
  }

}
