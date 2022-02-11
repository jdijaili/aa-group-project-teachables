const LOAD_PROJECT = "draft/LOAD_PROJECT";
const CREATE_STEP = "draft/CREATE_STEP";
const EDIT_STEP = "draft/EDIT_STEP";
const TRASH_STEP = "draft/TRASH_STEP";
const CLEAR_DRAFT = "draft/CLEAR_DRAFT";

const loadProject = (steps) => ({
	type: LOAD_PROJECT,
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

const trashStep = (stepNumber) => ({
	type: TRASH_STEP,
	stepNumber
})

const clearDraft = () => ({
	type: CLEAR_DRAFT
})

export const readProjectDraft = function (steps) {
	return async dispatch => {
		dispatch(loadProject(steps));
	}
}

export const postStepDraft = function ({ stepNumber, title, description, image }) {
	return async dispatch => {
		dispatch(createStep({ stepNumber, title, description, image }));
	}
}

export const putStepDraft = function ({ id, stepNumber, title, description, image }) {
	return async dispatch => {
		dispatch(editStep({ id, stepNumber, title, description, image }));
	}
}

export const deleteStepDraft = function (stepNumber) {
	return async dispatch => {
		dispatch(trashStep(stepNumber));
	}
}

export const discardDraft = function () {
	return async dispatch => {
		dispatch(clearDraft());
	}
}

export default function reducer(stateDotDraft = { }, action) {
	let updatedState = { ...stateDotDraft };
	switch (action.type) {
		case LOAD_PROJECT:
			action.steps.forEach(step => {
				updatedState[step.stepNumber] = step;
			})
			return updatedState;
		case CREATE_STEP:
		case EDIT_STEP:
			updatedState[action.step.stepNumber] = action.step;
			return updatedState;
		case TRASH_STEP:
			delete updatedState[action.stepNumber];

			// cascading step number decrementing
			Object.values(updatedState).forEach(step => {
				if (step?.stepNumber > action.stepNumber) {
					updatedState[step.stepNumber - 1] = step;
					delete updatedState[step.stepNumber];
				}
			})
			return updatedState;
		case CLEAR_DRAFT:
			return { };
		default:
			return stateDotDraft;
	}
}
