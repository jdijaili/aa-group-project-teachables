const EDIT_PROJECT = "draft/EDIT_PROJECT";
const CREATE_STEP = "draft/CREATE_STEP";
const EDIT_STEP = "draft/EDIT_STEP";
const TRASH_STEP = "draft/TRASH_STEP";
const CLEAR_DRAFT = "draft/CLEAR_DRAFT";

const editProject = (project) => ({
	type: EDIT_PROJECT,
	project
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

export const putProjectDraft = function (project) {
	return async dispatch => {
		dispatch(editProject(project));
	}
}

export const postStepDraft = function (step) {
	return async dispatch => {
		dispatch(createStep(step));
	}
}

export const putStepDraft = function (step) {
	return async dispatch => {
		dispatch(editStep(step));
	}
}

export const deleteStepDraft = function (stepNumber) {
	return async dispatch => {
		dispatch(trashStep(stepNumber));
	}
}

export default function reducer(stateDotDraft = { project: {} }, action) {
	let updatedState = { ...stateDotDraft };
	switch (action.type) {
		case EDIT_PROJECT:
			updatedState.project = action.project;
			return updatedState;
		case CREATE_STEP:
		case EDIT_STEP:
			updatedState[action.step.stepNumber] = action.step;
			return updatedState;
		case TRASH_STEP:
			delete updatedState[action.stepNumber];

			// cascading step number decrementing
			Object.values(updatedState).forEach(projectOrStep => {
				if (projectOrStep?.stepNumber > action.stepNumber) {
					updatedState[projectOrStep.stepNumber - 1] = projectOrStep;
					delete updatedState[projectOrStep.stepNumber];
				}
			})
			return updatedState;
		case CLEAR_DRAFT:
			return { project: {} };
		default:
			return stateDotDraft;
	}
}
