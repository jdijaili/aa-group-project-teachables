import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CategoriesView = () => {
    const [projects, setProjects] = useState([]);
    const { categoryId } = useParams();

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/categories/${categoryId}`);
            const projects = await response.json();
            setProjects(projects);
        })();
    }, [categoryId]);

    console.log(projects);

    return (
        <div>
            {projects}
        </div>
    )
};

export default CategoriesView;
