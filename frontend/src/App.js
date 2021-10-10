import react from 'react';
import axios from 'axios';
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';
import UserList from './components/User.jsx';
import ProjectList from './components/Project.jsx';
import ProjectToDoList from './components/ProjectToDos.jsx';
import Footer from './components/Footer.jsx';
import NotFound404 from './components/NotFound404.jsx';
import LoginForm from './components/Login.jsx';


class App extends react.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': [],
      'todos': [],
      'projects': [],
      'token': '',
    }
  }

  get_token(username, password) {
    axios.post('http://127.0.0.1:8000/api/token/', 
    {username: username, password: password}).then(
        response => {
            const { refresh, access } = response.data
            this.set_token(access)
            console.log(access)
        }
    ).catch(error => console.log(error));
    
  }

  set_token(token) {
    localStorage.setItem('token', token)
    this.setState({'token': token}, () => this.load_data())
  }

  is_authenticated() {
    console.log(this.state.token)
    return !!this.state.token
  }

  logout() {
    this.set_token('')
  }

  get_token_from_storage() {
    const token = localStorage.getItem('token')
    this.setState({'token': token}, () => this.load_data())
  }

  get_headers() {
    let headers = {
      'Content-Type': 'application/json'
    }
    if (this.is_authenticated()) {
      headers['Authorization'] = 'Bearer ' + this.state.token
    }

    return headers
  }

  load_data() {
    const headers = this.get_headers()


    axios.get('http://127.0.0.1:8000/api/users', {headers})
      .then(response => {
        const users = response.data

        this.setState(
          {
            'users': users.results
          }
        )
      }).catch(error => console.log(error))
    
    axios.get('http://127.0.0.1:8000/api/projects', {headers})
      .then(response => {
        const projects = response.data

        this.setState(
          {
            'projects': projects.results
          }
        )
      }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/todos', {headers})
    .then(response => {
      const todos = response.data

      this.setState(
        {
          'todos': todos.results
        }
      )
    }).catch(error => console.log(error))
  }

  

  componentDidMount() {
    this.get_token_from_storage()
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <nav>
            <ul>
              <li><Link to='/users'>Users</Link></li>
              <li><Link to='/projects'>Projects</Link></li>
              <li>
                  {this.is_authenticated() ? <button onClick={() => this.logout()}>Log out</button> : <Link to='/login'>Login</Link>}
              </li>
            </ul>
          </nav>
            

          <Switch>

            <Route exact path='/' component={() => <UserList users = {this.state.users} />} /> 
            <Redirect from='/users' to='/'/>
            
            <Route exact path='/projects' component={() => <ProjectList projects = {this.state.projects}/>} />
            <Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)}/>} />

            <Route path='/project/:id'>
              <ProjectToDoList todos={this.state.todos}/>   
            </Route> 

            <Route component={NotFound404}/>

          </Switch>  

          <Footer/>
          
        </BrowserRouter>
      </div>
    )
  }
}




export default App;
