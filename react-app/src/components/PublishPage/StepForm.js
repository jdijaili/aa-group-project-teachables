import { useState } from "react";
import { useDispatch } from "react-redux";
import { putStepDraft } from "../../store/draft";

const StepForm = ({ currentStep }) => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('')

    const addStepToStore = () => {
        const step = {
            stepNumber: currentStep,
            title,
            description,
            image
        };

		dispatch(putStepDraft(step));
	};

	const updateStepNumber = (e) => {
		setStepNumber(e.target.value);
		addStepToStore();
	};

	const updateTitle = (e) => {
		setTitle(e.target.value);
		addStepToStore();
	};

	const updateDescription = (e) => {
		setDescription(e.target.value);
		addStepToStore();
	};
	const updateImage = (e) => {
		setImage(e.target.value);
		addStepToStore();
	};

    return(
        <div>
            <form>
                <h4>Step {currentStep}</h4>
                <label>
                    Step Title
                    <input
                        type='text'
                        required
                        onBlur={updateTitle}
                        placeholder='Enter step title'
                    />
                </label>

                <label>
                    Description
                    <input
                        type='text'
                        required
                        onBlur={updateDescription}
                        placeholder='Write a detailed description of this step'
                    />
                </label>

                <label>
                    Image
                    <input
                        type='text'
                        required
                        onBlur={updateImage}
                        placeholder='Include an image to illustrate this step (optional)'
                    />
                </label>
            </form>
        </div>
    )
}

export default StepForm
