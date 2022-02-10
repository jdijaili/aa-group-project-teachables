// import ProjectCard from "../ProjectCard/ProjectCard"
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProjects } from '../../store/projects';
import ProjectCard from '../ProjectCard/ProjectCard';
import './HomePage.css';
import ImageCarousel from './ImageCarousel';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch]);

    const allProjects = useSelector(state => {
        return state.projects
    });

    const projectsChess = Object.values(Object.values(allProjects).filter(project => project.categoryId === 1)).slice(0, 4);
    const projectsGame = Object.values(Object.values(allProjects).filter(project => project.categoryId === 2)).slice(0, 4);
    const projectsJewelry = Object.values(Object.values(allProjects).filter(project => project.categoryId === 3)).slice(0, 4);
    const projectsKnitting = Object.values(Object.values(allProjects).filter(project => project.categoryId === 4)).slice(0, 4);

    return (
        <>
            <ImageCarousel />
            <div className='flavor-text'>
                <div>
                    <h2 className='flavor-header'>STEP-BY-STEP</h2>
                    <p>We make it easy to learn how to make anything, one step at a time. From the stovetop to the workshop, you are sure to be inspired by the awesome projects that are shared everyday.</p>
                </div>
                <div>
                    <h2 className='flavor-header'>MADE BY YOU</h2>
                    <p>Teachables are created by you. No matter who you are, we all have secret skills to share. Come join our community of curious makers, innovators, teachers, and life long learners who love to share what they make.</p>
                </div>
                <div>
                    <h2 className='flavor-header'>A HAPPY PLACE</h2>
                    <p>Making things makes people happy. We can't prove it, but we know it to be true. Find your happy place, and join one of the friendliest online communities anywhere.</p>
                </div>
            </div>
            <div className='explorer-container'>
                <h2>EXPLORE PROJECTS</h2>
                <div className='explorer-category'>
                    <h4 className='explorer-header'><Link className='explorer-header' to='/categories/1'>Chess Openings</Link></h4>
                    <div className='explorer-cards'>
                        {projectsChess.map(project => {
                            return (
                                <ProjectCard project={project} key={project.id} />
                            )
                        })}
                    </div>
                </div>
                <div className='explorer-category'>
                    <h4 className='explorer-header'><Link className='explorer-header' to='/categories/3'>Game Development</Link></h4>
                    <div className='explorer-cards'>
                        {projectsGame.map(project => {
                            return (
                                <ProjectCard project={project} key={project.id}/>
                            )
                        })}
                    </div>
                </div>
                <div className='explorer-category'>
                    <h4 className='explorer-header'><Link className='explorer-header' to='/categories/4'>Jewelry Design</Link></h4>
                    <div className='explorer-cards'>
                        {projectsJewelry.map(project => {
                            return (
                                <ProjectCard project={project} key={project.id} />
                            )
                        })}
                    </div>
                </div>
                <div className='explorer-category'>
                    <h4 className='explorer-header'><Link className='explorer-header' to='/categories/2'>Knitting</Link></h4>
                    <div className='explorer-cards'>
                        {projectsKnitting.map(project => {
                            return (
                                <ProjectCard project={project} key={project.id} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
