import React from 'react';
import { useParams } from 'react-router-dom';

const ToDoItem = ({todo}) => {
    const { user, text } = todo
    return (
       <p>
           <b>{ text }</b>
           <br />
           author: { user.username }
        </p> 
    );
};

const ProjectToDoList = ({todos}) => {
    let { id } = useParams();
    let filtered_todos = todos.filter((todo) => todo.project.id == id);

    if (filtered_todos.length === 0) {
        return (
        <div>Project doesnt has todos yet.</div>
        )
    };
    return (
        <div>
            <ul>
                {filtered_todos.map((todo) => <li><ToDoItem todo={todo}/></li>)}
            </ul>
        </div>
    );
    
};

export default ProjectToDoList;