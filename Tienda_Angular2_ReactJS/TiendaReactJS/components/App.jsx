import React from 'react'
//import { Router, Route, Link, Redirect, browserHistory, IndexRoute } from 'react-router-dom'
import { BrowserRouter as Router, Route, Link, Redirect, browserHistory, IndexRoute } from 'react-router-dom'
import LoginForm from './Login.jsx';
import Tienda from './Tienda.jsx';

class App extends React.Component{
  //============Acciones Will mount===============================================
    componentWillMount(){
      //return !this.checkSession() ?  (this.setState.redirect = true) : (this.setState.redirect = false)
    }
  //================Verificar Sesión==============================================
    checkSession(){
      return sessionStorage.getItem("Session");
    }
  //============Acciones Constructor===============================================
    constructor(props) {
      super(props);
      this.state = {
        redirect : false
      }
    }
  //============Acciones Renderizar===============================================
    render(){
      return this.checkSession() ? <Redirect to='/tienda'/> : <Redirect to='/login' />
    }
  //==============================================================================
}

export default App; 
/*
const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/producto">Topics</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Catalogo}/>
      <Route path="/login" component={LoginForm}/>
      <Route path="/producto" component={Topics}/>
    </div>
  </Router>
)

const Catalogo = () => (
  <div>
    <Tienda />
  </div>
)

const Form = () => (
  <div>
    <LoginForm />
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

export default BasicExample
*/
