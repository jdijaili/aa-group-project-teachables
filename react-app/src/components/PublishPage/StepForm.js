import { useState } from "react";

const StepForm = () => {
    const [stepNumber, setStepNumber] = useState();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('')

    const updateStepNumber = (e) => setStepNumber(e.target.value);
    const updateTitle = (e) => setTitle(e.target.value);
    const updateDescription = (e) => setDescription(e.target.title);
    const updateImage = (e) => setImage(e.target.value);

    return(
        <div>
            <form>
                <label>
                    Step Number
                    <input
                        type='integer'
                        required
                        value={stepNumber}
                        onChange={updateStepNumber}
                    />
                </label>

                <label>
                    Step Title
                    <input
                        type='text'
                        required
                        value={title}
                        onChange={updateTitle}
                        placeholder='Enter step title'
                    />
                </label>

                <label>
                    Description
                    <input
                        type='text'
                        required
                        value={description}
                        onChange={updateDescription}
                        placeholder='Write a detailed description of this step'
                    />
                </label>

                <label>
                    Image
                    <input
                        type='text'
                        required
                        value={image}
                        onChange={updateImage}
                        placeholder='Include an image to illustrate this step (optional)'
                    />
                </label>
            </form>
        </div>
    )
}

export default StepForm
