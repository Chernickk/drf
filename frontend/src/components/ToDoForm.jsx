import React from 'react'


class ToDoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
              text: '',
              project: '',
              user: '',
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
        this.props.createToDo(this.state.text, this.state.project, this.state.user)


      event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="text">text</label>
                    <input type="text" className="form-control" name="text" value={this.state.text}
                           onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="project">link</label>
                    <select name="project" className='form-control' onChange={(event)=>this.handleChange(event)}>
                        {this.props.projects.map((project)=><option value={project.id}>{project.name}</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="user">user</label>
                    <select name="user" className='form-control' onChange={(event)=>this.handleChange(event)}>
                        {this.props.users.map((user)=><option value={user.id}>{user.username}</option>)}
                    </select>

                </div>
                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );
    }
}

export default ToDoForm;
