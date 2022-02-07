const ProjectCard = ({ project }) => {
    return (
        <div>
            <img src={project.image}/>
            <div>
                <h4>{project.title}</h4>
                <p>{}</p> //add author's username
            </div>
        </div>
    )
}

export default ProjectCard
