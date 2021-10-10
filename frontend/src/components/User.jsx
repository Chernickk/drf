import React from 'react';

const UserItem = ({user}) => {
    const { username, first_name, last_name, email } = user
    return (
        <tr>
            <td>{ username }</td>
            <td>{ first_name }</td>
            <td>{ last_name }</td>
            <td>{ email }</td>
        </tr>
    );
};

const UserList = ({users}) => {
    return (
        <table>
            <tbody>
                {users.map((user) => <UserItem user={user}/>)}
            </tbody>
        </table>
    );
};

export default UserList;