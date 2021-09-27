import react from 'react';
import UserList from './components/User.jsx';
import Footer from './components/Footer.jsx';
import Menu from './components/Menu.jsx';
import axios from 'axios';


class App extends react.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': []
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/users')
      .then(response => {
        const users = response.data
        console.log(users)
        this.setState(
          {
            'users': users
          }
        )
      }).catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <Menu/>
        <UserList users = {this.state.users}/>
        <Footer/>
      </div>
    )
  }
}




export default App;
