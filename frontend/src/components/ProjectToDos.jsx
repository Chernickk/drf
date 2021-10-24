import React from 'react';
import {Link, useParams} from 'react-router-dom';

const ToDoItem = ({todo, users, deleteToDo}) => {
    const { id, user, text } = todo
    const author = users.filter((item) => item.id === user)[0]
    return (
       <p>
           <b>{ text }</b>
           <br />
           author: {author.username}
           <br/>
           <button type='button' onClick={()=>deleteToDo(id)}>Delete</button>
        </p> 
    );
};

const ProjectToDoList = ({todos, users, deleteToDo}) => {
    let { id } = useParams();
    let filtered_todos = todos.filter((todo) => parseInt(todo.project) === parseInt(id));

    if (filtered_todos.length === 0) {
        return (
        <div>Project doesnt has todos yet.</div>
        )
    }

    return (
        <div>
            <ul>
                {filtered_todos.map((todo) => <li><ToDoItem todo={todo} users={users} deleteToDo={deleteToDo}/></li>)}
            </ul>
            <Link to='/todo/create'>Create</Link>
        </div>
    );
    
};

export default ProjectToDoList;