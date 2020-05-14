import {
	INIT_APP_DATA_SUCCESS,
	SET_ADDRESS,
	SET_PROJECTS,
	SET_DETAILS,
	TOGGLE_EDIT_MODE,
	UPDATE_PROJECT_NAME,
	ADD_TO_PROJECT,
	DELETE_FROM_PROJECT
} from '../../actions/data/'

const initialState = {
	companies: {},
	employees: {},
	projects: {},
	details: null,
	editMode: false
}

const setAppData = (state, {data}) => {
	const {companies: companiesSrc, employees: employeesSrc, projects: projectsSrc} = data

	const companies = companiesSrc.reduce((companies, company) => {
		companies[company.id] = {
			...company,
			address: {},
			jobArea: {},
			projects: {},
			employees: []
		}

		return companies
	}, {})

	const employees = employeesSrc.reduce((employees, employee) => {
		const {id, firstName, lastName, companyId, jobArea} = employee
		const employeeData = {
			id,
			name: `${firstName} ${lastName}`
		}

		companies[companyId].jobArea[jobArea] ? 
			companies[companyId].jobArea[jobArea].push(employeeData) : 
			companies[companyId].jobArea[jobArea] = [employeeData]

		companies[companyId].employees.push(employee.id)

		employees[id] = {
			...employee,
			projects: Object.values(projectsSrc).filter(project => project.employeesId.includes(id)).map(project => project.id)
		}

		return employees
	}, {})

	const projects = Object.values(projectsSrc).reduce((projects, project) => {
		projects[project.id] = {
			...project
		}

		return projects
	}, {})

	return {
		...state,
		companies,
		employees,
		projects
	}
}

const setAddress = (state, currentCompanyId, newAddress) => {
	const {companies} = state
	const company = companies[currentCompanyId]
	const {id, companyId, ...address} = newAddress

	return company ? {
		...state,
		companies: {
			...companies,
			[currentCompanyId]: {
				...company,
				address
			}
		}
	} : state
}

const setProjects = (state, currentCompanyId, projects) => {
	const {companies} = state
	const company = companies[currentCompanyId]

	return company ? {
		...state,
		companies: {
			...companies,
			[currentCompanyId]: {
				...company,
				projects
			}
		}
	} : state
}

const setDetails = (state, id, dataType, companyId = null) => ({
	...state,
	details: {
		id,
		dataType,
		companyId
	}
})

const toggleEditMode = (state, isEdited) => ({
	...state,
	editMode: isEdited
})

const updateProjectName = (state, id, name) => {
	const projects = JSON.parse(JSON.stringify(state.projects))

	return {
		...state,
		projects: {
			...projects,
			[id]: {
				...projects[id],
				name
			}
		}
	}
}

const addToProject = (state, id, projectId) => {
	const projects = JSON.parse(JSON.stringify(state.projects))
	const employees = JSON.parse(JSON.stringify(state.employees))
	const projectsIds = [...employees[id].projects]
	const employeesIds = [...projects[projectId].employeesId]

	if (!employeesIds.includes(id)) {
		employeesIds.push(id)
	}

	if (!projectsIds.includes(projectId)) {
		projectsIds.push(projectId)
	}

	return {
		...state,
		employees: {
			...employees,
			[id]: {
				...employees[id],
				projects: projectsIds
			}
		},
		projects: {
			...projects,
			[projectId]: {
				...projects[projectId],
				employeesId: employeesIds
			}
		}
	}
}

const deleteFromProject = (state, id, projectId) => {
	const projects = JSON.parse(JSON.stringify(state.projects))
	const employees = JSON.parse(JSON.stringify(state.employees))
	const projectsIds = [...employees[id].projects]
	const employeesIds = [...projects[projectId].employeesId]

	let index = employeesIds.indexOf(id)

	if (index > -1) {
		employeesIds.splice(index, 1);
	}

	index = projectsIds.indexOf(projectId)

	if (index > -1) {
		projectsIds.splice(index, 1);
	}

	return {
		...state,
		employees: {
			...employees,
			[id]: {
				...employees[id],
				projects: projectsIds
			}
		},
		projects: {
			...projects,
			[projectId]: {
				...projects[projectId],
				employeesId: employeesIds
			}
		}
	}
}

const reducers = (state = initialState, action) => {
	const {id, name, data, dataType, companyId, address, projects, projectId, isEdited} = action

	switch (action.type) {
		case INIT_APP_DATA_SUCCESS:
			return setAppData(state, data)
		case SET_ADDRESS:
			return setAddress(state, id, address)
		case SET_PROJECTS:
			return setProjects(state, id, projects)
		case SET_DETAILS:
			return setDetails(state, id, dataType, companyId)
		case TOGGLE_EDIT_MODE:
			return toggleEditMode(state, isEdited)
		case UPDATE_PROJECT_NAME:
			return updateProjectName(state, id, name)
		case ADD_TO_PROJECT:
			return addToProject(state, id, projectId)
		case DELETE_FROM_PROJECT:
			return deleteFromProject(state, id, projectId)
		default:
			return state
	}
}

export default reducers

export const getAddress = (state, id) => state.data.companies[id] ? state.data.companies[id].address : null
export const getCompanyProjects = (state, id) => state.data.companies[id] ? state.data.companies[id].projects : null
