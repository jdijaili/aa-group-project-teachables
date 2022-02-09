import { useState } from "react";
import { useDispatch } from "react-redux";
import { putStepDraft } from "../../store/draft";

const StepForm = () => {
	const dispatch = useDispatch();

	const [stepNumber, setStepNumber] = useState(1);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [image, setImage] = useState('')

	const addStepToStore = () => {
		const step = {
			stepNumber,
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

	return (
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
