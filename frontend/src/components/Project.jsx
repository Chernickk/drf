import React from 'react';
import { Link } from 'react-router-dom';

const ProjectItem = ({project}) => {
    const { id, name, link, user } = project
    return (
        <tr>
            
            <td><Link to={`project/${id}`}>{ name }</Link></td>
            <td>{ link }</td>
            <td>{ user.map((us) => us.username) }</td>
            
        </tr>
    );
};

const ProjectList = ({projects}) => {
    return (
        <div>
            <table>
            <tbody>
                {projects.map((project) => <ProjectItem project={project}/>)}
            </tbody>
        </table>
        </div>
    );
};

export default ProjectList;