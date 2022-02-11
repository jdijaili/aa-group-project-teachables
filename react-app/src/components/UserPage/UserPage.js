import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getProjects } from '../../store/projects';
import ProjectCard from '../ProjectCard/ProjectCard';
import './UserPage.css';

const UserPage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getProjects());
    }, dispatch, userId);

    const allProjects = useSelector(state => {
        return state.projects;
    });
    const allUsers = useSelector(state => {
        return state.session;
    });
    const selectedUser = Object.values(Object.values(allUsers).filter(user => user.id === parseInt(userId)))[0];
    const usersProjects = Object.values(allProjects).filter(project => project.userId === parseInt(selectedUser.id));

    const handleHome = () => {
        history.push('/');
    }
    return (
        <div className={usersProjects.length > 3 ? 'user-page-body' : 'user-page-body-short'}>
            <div className='user-header'>
                {selectedUser.username}'s Page
            </div>
            <div className='container-header'>
                {selectedUser.username}'s Teachables
            </div>
            {usersProjects.length ?
                usersProjects.length > 3 ?
                    <div className='user-cards-container-overflow'>
                        {usersProjects.map(project => {
                            return (
                                <ProjectCard project={project} />
                            )
                        })}
                    </div>
                    :
                    <div className='user-cards-container'>
                        {usersProjects.map(project => {
                            return (
                                <ProjectCard project={project} />
                            )
                        })}
                    </div>
                :
                <div className='user-card-container'>
                    <div className='user-text'>
                        Oops! {selectedUser.username} does not have any Teachables yet!
                    </div>
                    <button className='user-back-to-home-button' onClick={handleHome}>
                        Back to Home
                    </button>
                </div>
            }
        </div>
    )
};

export default UserPage;
