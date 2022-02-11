import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProjects } from '../../store/projects';
import { fetchUserData } from '../../store/session';
import './UserPage.css';

const UserPage = () => {
    return (
        <>
            USER PAGE
        </>
    )
};

export default UserPage;
