import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProjects } from '../../store/projects';
import { getSteps } from '../../store/steps';
import Comment from '../Comment/comment'
import CommentInput from './CommentInput';
import './ProjectView.css';

const ProjectView = () => {
	const { projectId } = useParams();
	const dispatch = useDispatch();
	const userId = useSelector(state => state.session?.user?.id);

	useEffect(() => {
		dispatch(getProjects());
		dispatch(getSteps({ projectId }));
		console.log(window.location.hash);
		if (!window.location.hash) {
			window.scrollTo(0, 0);
		}
	}, [dispatch, projectId]);

	const allProjects = useSelector(state => {
		return state.projects
	});
	const selectedProject = Object.values(allProjects).filter(project => project.id === parseInt(projectId));
	const allSteps = useSelector(state => {
		return Object.values(state.steps)
	});

	return (
		<>
			{selectedProject.map(project => {
				const supplies = selectedProject[0].suppliesText;
				const suppliesRegex = / ?- /;
				const suppliesArr = supplies?.split(suppliesRegex);
				return (
					<div className='project-view' key={project.id}>
						<div className='project-header'>
							{project.title}
						</div>
						<div className='project-author'>
							By <Link to={`/users/${project.user.id}`} style={{ "color": "black" }}>{project.user.username}</Link>
						</div>
						<img className='project-image' src={project.suppliesImage ? project.suppliesImage :
							project.projectImage ? project.projectImage : 'https://teachables.s3.us-west-1.amazonaws.com/noimage.png'} alt="Project overview" />
						<div className='project-description'>
							{project.description}
						</div>

						{
							project.userId === userId ?
								<div className='edit-delete-options'>
									<Link to={`/projects/${projectId}/edit`}>
										<button className='option-button edit'>
											Edit Project
										</button>
									</Link>
									<Link to={`/projects/${projectId}/delete`}>
										<button className='option-button delete'>
											Delete Project
										</button>
									</Link>
								</div>
								: ''
						}

						{
							project.suppliesText ?
								<>
									<div className='project-section-header'>
										Supplies
									</div>
									<ul className='project-supplies'>
										{suppliesArr.map(supply => {
											if (supply) {
												return (
													<li>{supply}</li>
												)
											} else {
												return (<></>)
											}
										})}
									</ul>
								</>
								: ''
						}
						<div className='project-section-header'>
							Steps
						</div>
						<ol className='project-steps'>
							{allSteps.map(step => {
								return (
									<section id={`step-${step.stepNumber}`} key={step.stepNumber}>
										<li className='step'>
											<h3>Step {step.stepNumber}: {step.title}</h3>
											{step.image ?
												<img className='step-image' src={step.image} key={step.id} alt="Illustration of step" /> :
												''}
											<p className='step-text'>{step.description}</p>
										</li>
										<CommentInput authorId={userId} projectId={projectId} stepId={step.id} />
									</section>
								)
							})}
						</ol>
						<Comment />
					</div >
				)
			})}
		</>
	)
};

export default ProjectView;
