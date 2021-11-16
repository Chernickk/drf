import React from 'react';
import { Link } from 'react-router-dom';

const ProjectItem = ({project, deleteProject}) => {
    const { id, name, link, user } = project
    return (
        <tr>
            
            <td><Link to={`project/${id}`}>{ name }</Link></td>
            <td>{ link }</td>
            <td>{ user.map((us) => us.username) }</td>
            <td><button type='button' onClick={()=>deleteProject(id)}>Delete</button></td>
        </tr>
    );
};

const ProjectList = ({projects, deleteProject}) => {
    return (
        <div>
            <Link to='/projects/create'>Create</Link>
            <table>
            <tbody>
                {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
            </tbody>
        </table>
        </div>
    );
};

export default ProjectList;