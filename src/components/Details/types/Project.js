import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'

import Button from '../../Button/Button'
import ButtonInfo from '../../Button/ButtonInfo'
import ButtonDelete from '../../Button/ButtonDelete'

import {getDetails} from '../../../store/actions/data/'
import {toggleEditMode, updateProjectName, addToProject, deleteFromProject} from '../../../store/actions/data/'

class Project extends Component {
	state = {
		projectName: this.props.project.name,
		employeeToAdd: null
	}

	componentDidMount() {
		const {toggleEditMode} = this.props

		toggleEditMode(false)
	}

	onSelect = (id) => {
		this.setState({employeeToAdd: id ? id : null})
	}

	render() {
		const {projectName, employeeToAdd} = this.state
		const {
			employees, 
			project, 
			getDetails, 
			toggleEditMode, 
			updateProjectName, 
			addToProject, 
			deleteFromProject, 
			editMode
		} = this.props
		const {id: projectId, name, department, employeesId, company} = project
		const employeesList = editMode ? Object.values(employees).reduce((employeesList, employee, index) => {
			if (!employeesId.includes(employee.id)) {
				employeesList.push((
					<option key={'employees-list-' + employee.id} value={employee.id}>
						{`${employee.firstName} ${employee.lastName}`}
					</option>
				))
			}

			return employeesList
		}, []) : null

		return (
			<Fragment>
				<mark>project</mark>

				<div className="details__actions">
					<Button onClick={() => toggleEditMode(!editMode)}>
						{editMode ? 'exit edit mode' : 'edit'}
					</Button>
				</div>

				{editMode ? (
					<div className="field">
						<label htmlFor="project-name" className="hidden">Project name</label>

						<input 
							type="text" 
							id="project-name" 
							name="project-name" 
							value={projectName} 
							onChange={event => this.setState({projectName: event.target.value})}
						/>

						<Button color="orange" onClick={() => updateProjectName(projectId, projectName)}>save</Button>
					</div>
				) : (
					<h3>{name}</h3>
				)}

				<h5>Company:</h5>

				<p>
					{company}
				</p>

				<h5>Department:</h5>

				<p>
					{department}
				</p>

				<h5>Employees on the project:</h5>

				{editMode && (
					<div className="field">
						<label htmlFor="add-employee-to-project" className="hidden">Add an employee to the project</label>
						
						<select 
							className="select" 
							name="add-employee-to-project" 
							id="add-employee-to-project"
							onChange={event => this.onSelect(event.target.value)}
						>
							<option key="employees-list-no-value" value="">
								Choose an employee
							</option>

							{employeesList}
						</select>

						<Button 
							color="orange" 
							onClick={() => (employeeToAdd === null) ? null : addToProject(employeeToAdd, projectId)}
						>
							add
						</Button>
					</div>
				)}

				{employeesId.length ? employeesId.map(employeeId => {
					const {firstName, lastName, companyId, projects} = employees[employeeId]
					const projectsCount = projects.length

					return (
						<p key={'employee-info-' + employeeId}>
							{firstName + ' ' + lastName} 

							<ButtonInfo onClick={
								() => getDetails(employeeId, 'employee', companyId)
							} /> - {projectsCount} project{projectsCount !== 1 ? 's' : ''}

							{editMode && (
								<ButtonDelete onClick={
									() => deleteFromProject(employeeId, projectId)
								} />
							)}
						</p>
					)
				}) : null}
			</Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	const {companies, employees, projects, details, editMode} = state.data
	const project = projects[details.id]

	project.company = companies[project.companyId].name

	return {
		employees,
		project,
		editMode
	}
}

const mapDispatchToProps = (dispatch) => ({
	getDetails: (id, dataType, companyId) => dispatch(getDetails(id, dataType, companyId)),
	updateProjectName: (id, name) => dispatch(updateProjectName(id, name)),
	addToProject: (id, projectId) => dispatch(addToProject(id, projectId)),
	deleteFromProject: (id, projectId) => dispatch(deleteFromProject(id, projectId)),
	toggleEditMode: (isEdited) => dispatch(toggleEditMode(isEdited))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Project)
