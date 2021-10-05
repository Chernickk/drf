import React from 'react';

const ToDoItem = ({todo}) => {
    const { user, text } = todo
    return (
        <tr>
            <td>{ text }</td>
            <td>{ user.username }</td>
        </tr>
    );
};

const ToDoList = ({todos}) => {
    return (
        <div>
            <table>
                <tbody>
                    {todos.map((todo) => <ToDoItem todo={todo}/>)}
                </tbody>
            </table>
        </div>
    );
};

export default ToDoList;