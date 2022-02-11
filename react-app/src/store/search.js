import { csrfFetch } from "../helpers";

const LOAD_SEARCH_PROJECTS = "search/LOAD_SEARCH_PROJECTS";

const loadSearchProjects = (projects) => ({
	type: LOAD_SEARCH_PROJECTS,
	projects
})

export const getSearchProjects = function (query) {
	return async (dispatch) => {
		const response = await csrfFetch(`/api/search/${query}`);

		if (response.ok) {
			const projects = await response.json();
			dispatch(loadSearchProjects(projects));
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

export default function reducer(stateDotSearch = {}, action) {
    switch(action.type) {
        case LOAD_SEARCH_PROJECTS:
            let cleanState = {}
            action.projects.forEach(project => {
                cleanState[project.id] = project;
            });
            return cleanState;
        default:
            return stateDotSearch;
    }
}
