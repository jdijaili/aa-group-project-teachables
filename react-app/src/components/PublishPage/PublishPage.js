import { useImperativeHandle, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postProject } from "../../store/projects";

const PublishPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const userId = useSelector(state => state.session.user.id);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState(1);
    const [suppliesText, setSuppliesText] = useState('');
    const [suppliesImage, setSuppliesImage] = useState('');
    const [errors, setErrors] = useState([]);

    const updateTitle = (e) => setTitle(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateCategoryId = (e) => setCategoryId(e.target.value);
    const updateSuppliesText = (e) => setSuppliesText(e.target.value);
    const updateSuppliesImage = (e) => setSuppliesImage(e.target.value);

    const handleSubmit = () => {
        const newProject = {
            title,
            description,
            categoryId,
            suppliesText,
            suppliesImage
        };

        const submittedProject = await dispatch(postProject(newProject))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })

        if (submittedProject) {
            history.push('/')
        }
    }

    const handleCancel = () => {
        // TO DO: clear store and navigate to home page
    }

    return (
        <div>
            <form>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>

                <label>
                    Project Title
                    <input
                        type='text'
                        required
                        value={title}
                        onChange={updateTitle}
                        placeholder='What did you make?'
                    />
                </label>

                <label>
                    Project Description
                    <input
                        type='text'
                        required
                        value={description}
                        onChange={updateDescription}
                        placeholder='Briefly describe what you made and why'
                    />
                </label>

                <label>
                    Category
                    <select value={categoryId} onChange={updateCategoryId}>
                        <option selected value={1} required>Chess Openings</option>
                        <option value={2} required>Game Development</option>
                        <option value={3} required>Jewelry Design</option>
                        <option value={4} required>Knitting</option>
                    </select>
                </label>

                <label>
                    Supplies
                    <input
                        type='text'
                        required
                        value={suppliesText}
                        onChange={updateSuppliesText}
                        placeholder='List all the supplies required for this project'
                    />
                </label>

                <label>
                    Supplies Image
                    <input
                        type='text'
                        required
                        value={suppliesImage}
                        onChange={updateSuppliesImage}
                        placeholder='Include an imageof your supplies (optional)'
                    />
                </label>
            </form>

            <button onSubmit={handleSubmit}>Submit</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    )
}

export default PublishPage
