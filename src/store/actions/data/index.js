export const INIT_APP_DATA = 'INIT_APP_DATA'
export const INIT_APP_DATA_SUCCESS = 'INIT_APP_DATA_SUCCESS'
export const GET_DETAILS = 'GET_DETAILS'
export const SET_ADDRESS = 'SET_ADDRESS'
export const SET_PROJECTS = 'SET_PROJECTS'
export const SET_DETAILS = 'SET_DETAILS'

export const TOGGLE_EDIT_MODE = 'TOGGLE_EDIT_MODE'
export const UPDATE_PROJECT_NAME = 'UPDATE_PROJECT_NAME'
export const ADD_TO_PROJECT = 'ADD_TO_PROJECT'
export const DELETE_FROM_PROJECT = 'DELETE_FROM_PROJECT'

export const initAppData = () => ({
	type: INIT_APP_DATA
})

export const initAppDataSuccess = (data) => ({
	type: INIT_APP_DATA_SUCCESS,
	data
})

export const getDetails = (id, dataType, companyId) => ({
	type: GET_DETAILS,
	id,
	dataType,
	companyId
})

export const setAddress = (id, address) => ({
	type: SET_ADDRESS,
	id,
	address
})

export const setProjects = (id, projects) => ({
	type: SET_PROJECTS,
	id,
	projects
})

export const setDetails = (id, dataType, companyId) => ({
	type: SET_DETAILS,
	id,
	dataType,
	companyId
})

export const toggleEditMode = (isEdited) => ({
	type: TOGGLE_EDIT_MODE,
	isEdited
})

export const updateProjectName = (id, name) => ({
	type: UPDATE_PROJECT_NAME,
	id,
	name
})

export const addToProject = (id, projectId) => ({
	type: ADD_TO_PROJECT,
	id,
	projectId
})

export const deleteFromProject = (id, projectId) => ({
	type: DELETE_FROM_PROJECT,
	id,
	projectId
})
