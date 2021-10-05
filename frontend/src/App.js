import react from 'react';
import axios from 'axios';
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';
import UserList from './components/User.jsx';
import ProjectList from './components/Project.jsx';
import ProjectToDoList from './components/ProjectToDos.jsx';
import Footer from './components/Footer.jsx';
import Menu from './components/Menu.jsx';
import NotFound404 from './components/NotFound404.jsx';


class App extends react.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': [],
      'todos': [],
      'projects': []
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/users')
      .then(response => {
        const users = response.data

        this.setState(
          {
            'users': users.results
          }
        )
      }).catch(error => console.log(error))
    
    axios.get('http://127.0.0.1:8000/api/projects')
      .then(response => {
        const projects = response.data

        this.setState(
          {
            'projects': projects.results
          }
        )
      }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/todos')
    .then(response => {
      const todos = response.data

      this.setState(
        {
          'todos': todos.results
        }
      )
    }).catch(error => console.log(error))
  }


  render() {
    return (
      <div>
        <BrowserRouter>

          <Menu/>

          <Switch>

            <Route exact path='/' component={() => <UserList users = {this.state.users} />} /> 
            <Redirect from='/users' to='/'/>
            
            <Route exact path='/projects' component={() => <ProjectList projects = {this.state.projects}/>} />

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
