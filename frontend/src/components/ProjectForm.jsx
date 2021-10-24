import React from 'react'


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
              name: '',
              link: '',
              users: [],
          }
    }

    handleChange(event)
    {
        this.setState(
            {
                [event.target.name]: event.target.value
            });
    }

    handleSubmit(event) {
        this.props.createProject(this.state.name, this.state.link, this.state.users)

      event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="name">name</label>
                    <input type="text" className="form-control" name="name" value={this.state.name}
                           onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="link">link</label>
                    <input type="text" className="form-control" name="link" value={this.state.link}
                           onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="users">users</label>
                    <select name="author" className='form-control' onChange={(event)=>this.handleChange(event)}>
                        {this.props.users.map((user)=><option value={user.id}>{user.username}</option>)}
                    </select>

                </div>
                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );
    }
}

export default ProjectForm;
