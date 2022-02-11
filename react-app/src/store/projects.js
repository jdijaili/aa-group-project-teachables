import { csrfFetch } from "../helpers";

const LOAD_PROJECTS = "projects/LOAD_PROJECTS";
const CREATE_PROJECT = "projects/CREATE_PROJECT";
const EDIT_PROJECT = "projects/EDIT_PROJECT";
const TRASH_PROJECT = "projects/TRASH_PROJECT";

const loadProjects = (projects) => ({
	type: LOAD_PROJECTS,
	projects
})

const createProject = (project) => ({
	type: CREATE_PROJECT,
	project
})

const editProject = (project) => ({
	type: EDIT_PROJECT,
	project
})

const trashProject = (projectId) => ({
	type: TRASH_PROJECT,
	projectId
})

export const getProjects = function () {
	return async (dispatch) => {
		const response = await csrfFetch("/api/projects");

		if (response.ok) {
			const projects = await response.json();
			dispatch(loadProjects(projects));
		} else if (response.status < 500) {
			const data = await response.json();
			if (data.errors) {
				return data.errors;
			}
		} else {
			return ['An error occurred. Please try again.'];
		}
	}
}

export const postProject = function ({ userId, title, description, categoryId, suppliesText, suppliesImage, projectImage }) {
	return async (dispatch) => {
		const response = await csrfFetch("/api/projects/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				user_id: userId,
				title,
				description,
				category_id: categoryId,
				supplies_text: suppliesText,
				supplies_image: suppliesImage,
				project_image: projectImage
			})
		})

		if (response.ok) {
			const project = await response.json();
			dispatch(createProject(project));
			return project;
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

export const putProject = function ({ projectId, title, description, categoryId, suppliesText, suppliesImage, projectImage }) {
	return async (dispatch) => {
		const response = await csrfFetch("/api/projects/", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				id: projectId,
				title,
				description,
				category_id: categoryId,
				supplies_text: suppliesText,
				supplies_image: suppliesImage,
				project_image: projectImage
			})
		})

		if (response.ok) {
			const project = await response.json();
			dispatch(editProject(project));
			return project;
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

export const deleteProject = function ({ projectId }) {
	return async (dispatch) => {
		console.log('hello')
		const response = await csrfFetch("/api/projects/", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ id: projectId })
		})
		console.log('hello')

		if (response.ok) {
			dispatch(trashProject(projectId));
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

export default function reducer(stateDotProjects = {}, action) {
	let updatedState = { ...stateDotProjects };
	switch (action.type) {
		case LOAD_PROJECTS:
			action.projects.forEach(project => {
				updatedState[project.id] = project;
			})
			return updatedState;
		case CREATE_PROJECT:
		case EDIT_PROJECT:
			updatedState[action.project.id] = action.project;
			return updatedState;
		case TRASH_PROJECT:
			delete updatedState[action.projectId];
			return updatedState;
		default:
			return stateDotProjects;
	}
}
