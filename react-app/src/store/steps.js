const LOAD_STEPS = "steps/LOAD_STEPS";
const CREATE_STEP = "steps/CREATE_STEP";
const EDIT_STEP = "steps/EDIT_STEP";
const TRASH_STEP = "steps/TRASH_STEP";

const loadSteps = (steps) => ({
	type: LOAD_STEPS,
	steps
})

const createStep = (step) => ({
	type: CREATE_STEP,
	step
})

const editStep = (step) => ({
	type: EDIT_STEP,
	step
})

const trashStep = (stepId) => ({
	type: TRASH_STEP,
	stepId
})

export const getSteps = function ({ projectId }) {
	return async (dispatch) => {
		const response = await fetch(`/api/steps/${projectId}`);

		if (response.ok) {
			const steps = await response.json();
			dispatch(loadSteps(steps));
		} else if (response.status < 500) {
			const data = await response.json();
			if (data.errors) {
				return data.errors;
			}
		} else {
			return ['An error occured. Please try again.'];
		}
	}
}

export const postStep = function ({ projectId, title, description, image }) {
	return async (dispatch) => {
		const response = await fetch("/api/steps/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				project_id: projectId,
				title,
				description,
				image
			})
		})

		if (response.ok) {
			const step = await response.json();
			dispatch(createStep(step));
		} else if (response.status < 500) {
			const data = await response.json();
			if (data.errors) {
				return data.errors;
			}
		} else {
			return ['An error occured. Please try again.'];
		}
	}
}

export const putStep = function ({ stepId, title, description, image }) { //TODO #64 cascading step number adjustment
	return async (dispatch) => {
		const response = await fetch("/api/steps/", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				id: stepId,
				title,
				description,
				image
			})
		})

		if (response.ok) {
			const { step } = await response.json();
			dispatch(editStep(step));
		} else if (response.status < 500) {
			const data = await response.json();
			if (data.errors) {
				return data.errors;
			}
		} else {
			return ['An error occured. Please try again.'];
		}
	}
}

export const deleteStep = function ({ stepId }) {
	return async (dispatch) => {
		const response = await fetch("/api/steps/", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ stepId })
		})

		if (response.ok) {
			dispatch(trashStep(stepId));
		} else if (response.status < 500) {
			const data = await response.json();
			if (data.errors) {
				return data.errors;
			}
		} else {
			return ['An error occured. Please try again.'];
		}
	}
}

export default function reducer(stateDotSteps = {}, action) {
	let updatedState = { ...stateDotSteps };
	switch (action.type) {
		case LOAD_STEPS:
			action.steps.forEach(step => {
				updatedState[step.id] = step;
			})
			return updatedState;
		case CREATE_STEP:
		case EDIT_STEP:
			updatedState[action.step.id] = action.step;
			return updatedState;
		case TRASH_STEP:
			delete updatedState[action.stepId];
			return updatedState;
		default:
			return stateDotSteps;
	}
}
