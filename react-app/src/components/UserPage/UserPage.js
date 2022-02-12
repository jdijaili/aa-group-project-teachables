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
        window.scrollTo(0,0);
    }, [dispatch]);

    const allProjects = useSelector(state => {
        return state.projects;
    });

    const usersProjects = Object.values(allProjects).filter(project => project.userId === parseInt(userId));
    const userName = usersProjects[0].user.username;

    const handleHome = () => {
        history.push('/');
    }
    return (
        <div className={usersProjects.length > 3 ? 'user-page-body' : 'user-page-body-short'}>
            <div className='user-header'>
                {userName}'s Page
            </div>
            <div className='container-header'>
                {userName}'s Teachables
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
                        Oops! {userName} does not have any Teachables yet!
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
