import react from 'react';
import axios from 'axios';
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';
import UserList from './components/User.jsx';
import ProjectList from './components/Project.jsx';
import ProjectToDoList from './components/ProjectToDos.jsx';
import Footer from './components/Footer.jsx';
import NotFound404 from './components/NotFound404.jsx';
import LoginForm from './components/Login.jsx';
import ProjectForm from "./components/ProjectForm";
import ToDo from "./components/ToDo";
import ToDoForm from "./components/ToDoForm";


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
          'todos': todos.results.filter((todo) => todo.is_active === true)
        }
      )
    }).catch(error => console.log(error))
  }

  createProject(name, link, users) {
    const headers = this.get_headers()
    const data = {name: name, link: link, user: [parseInt(users)]}
    axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers})
        .then(response => {
          let new_project = response.data
          const user = this.state.users.filter((user) => user.id === new_project.user)[0]
          new_project.user = user
          this.setState({projects: [...this.state.projects, new_project]})
        }).catch(error => console.log(error))
  }


  deleteProject(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
        .then(response => {
          this.setState({projects: this.state.projects.filter((project) => project.id !== id)})
        }).catch(error => console.log(error))
  }

  createToDo(text, project, user) {
    const headers = this.get_headers()
    const data = {text: text, project: project, user: user}
    axios.post(`http://127.0.0.1:8000/api/todos/`, data, {headers})
        .then(response => {
          let new_todo = response.data
          // const user = this.state.users.filter((user) => user.id === new_project.user)[0]
          // new_project.user = user
          this.setState({projects: [...this.state.todos, new_todo]})
        }).catch(error => console.log(error))
  }

  deleteToDo(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/todos/${id}`, {headers})
        .then(response => {
          this.setState({todos: this.state.todos.filter((todo) => todo.id !== id)})
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
            
            <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} deleteProject={(id) => this.deleteProject(id)}/>} />
            <Route exact path='/projects/create' component={() => <ProjectForm
                createProject={(name, link, users) => this.createProject(name, link, users)}
                users={this.state.users}
            />}  />

            <Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)}/>} />

            <Route path='/project/:id'>
                <ProjectToDoList todos={this.state.todos}
                               users={this.state.users}
                               deleteToDo={(id) => this.deleteToDo(id)}/>

            </Route>
            <Route exact path='/todo/create' component={() => <ToDoForm
                createToDo={(text, project, user) => this.createToDo(text, project, user)}
                users={this.state.users}
                projects={this.state.projects}
            />}  />

            <Route component={NotFound404}/>

          </Switch>  

          <Footer/>
          
        </BrowserRouter>
      </div>
    )
  }
}




export default App;
