import Cookies from "js-cookie";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { putStepDraft } from "../../store/draft";
import './PublishPage.css';

const StepForm = ({ currentStep }) => {
	const dispatch = useDispatch();

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [image, setImage] = useState(null);
	const [imageURL, setImageURL] = useState('');
	const [imageLoading, setImageLoading] = useState(false);

	const addStepToStore = () => {
		const step = {
			stepNumber: currentStep,
			title,
			description,
			image
		};

		dispatch(putStepDraft(step));
	};

	const updateTitle = (e) => {
		setTitle(e.target.value);
		addStepToStore();
	};

	const updateDescription = (e) => {
		setDescription(e.target.value);
		addStepToStore();
	};

	const uploadImage = async (e) => {
		e.preventDefault();
		setImageLoading(true);
		const formData = new FormData();
		formData.append("image", image);
		const res = await fetch('/api/images', {
			method: "POST",
			body: formData
		});
		setImageLoading(false);
		if (res.ok) {
			let data = await res.json();
			setImageURL(data.url);
		}
	};

	return (
		<div className='new-step'>
			<form>
				<input type="hidden" name="csrf_token" value={Cookies.get('XSRF-TOKEN')} />
				<h4 className='step-counter'>Step {currentStep}</h4>
				<label className='step-element'>
					Step Title
					<input
						type='text'
						required
						onBlur={updateTitle}
						placeholder='Enter step title'
					/>
				</label>

				<label className='step-element'>
					Description
					<input
						type='text'
						required
						onBlur={updateDescription}
						placeholder='Write a detailed description of this step'
					/>
				</label>

				<label className='step-element'>
					Image
					{imageURL ? <img src={imageURL} alt={`Step ${currentStep} Image`} /> : ""}
					<input
						type="file"
						accept="image/*"
						onChange={e => setImage(e.target.files[0])}
						placeholder='Include an image to illustrate this step (optional)'
					/>
					<button onClick={uploadImage}>{imageLoading ? "Loading..." : "Upload"}</button>
				</label>
			</form>
		</div>
	)
}

export default StepForm
