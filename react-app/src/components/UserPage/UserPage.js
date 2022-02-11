import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { getProjects } from '../../store/projects';
import { fetchUserData } from '../../store/session';
import './UserPage.css';

const UserPage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUserId = useSelector(state => state.session?.user?.id);

    useEffect(() => {
        dispatch(getProjects());
        dispatch(fetchUserData({ userId: userId }));
    }, dispatch, userId);

    const allProjects = useSelector(state => {
        return state.projects;
    });
    const selectedUser = useSelector(state => {
        return Object.values(state.session)[0];
    });
    const usersProjects = Object.values(allProjects).filter(project => project.userId === parseInt(selectedUser.id));

    const handleHome = () => {
        history.push('/');
    }
    return (
        <div className='user-page-body'>
            <div className='user-header'>
                {selectedUser.username}'s Page
            </div>
            <div className='container-header'>
                {selectedUser.username}'s Teachables
            </div>
            {usersProjects.length ?
                <>PROJECTS</> :
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
