import Cookies from "js-cookie";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { putStepDraft } from "../../store/draft";
import './PublishPage.css';

const StepForm = ({ currentStep }) => {
	const dispatch = useDispatch();

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [imageURL, setImageURL] = useState('');

	const addStepToStore = (url) => {
		const step = {
			stepNumber: currentStep,
			title,
			description
		};
		if (url) {
			step.image = url;
		} else if (imageURL) {
			step.image = imageURL;
		}

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
		const formData = new FormData();
		formData.append("image", e.target.files[0]);
		const res = await fetch('/api/images', {
			method: "POST",
			body: formData
		});
		if (res.ok) {
			let data = await res.json();
			setImageURL(data.url);
			addStepToStore(data.url);
		}
	};

	return (
		<div className='new-step'>
			<form className='publish-meta-element'>
				<input type="hidden" name="csrf_token" value={Cookies.get('XSRF-TOKEN')} />
				<h4 className='step-counter'>Step {currentStep}</h4>
				<label className='step-element'>
					Step Title
					<input
						type='text'
						required
						onKeyUp={updateTitle}
						placeholder='Enter step title'
					/>
				</label>

				<label className='step-element'>
					Description
					<input
						type='text'
						required
						onKeyUp={updateDescription}
						placeholder='Write a detailed description of this step'
					/>
				</label>

				<label className='step-element'>
					Image
					{imageURL ? <img src={imageURL} alt={`Step ${currentStep}`} /> : ""}
					<input
						type="file"
						accept="image/*"
						onChange={e => uploadImage(e)}
						placeholder='Include an image to illustrate this step (optional)'
					/>
				</label>
			</form>
		</div>
	)
}

export default StepForm
