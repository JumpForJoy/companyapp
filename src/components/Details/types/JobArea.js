import React, {Fragment} from 'react'
import {connect} from 'react-redux'

import ButtonInfo from '../../Button/ButtonInfo'

import {getDetails} from '../../../store/actions/data/'

const JobArea = (props) => {
	const {areaId, areaEmployees, companyId, getDetails} = props
	const employeesProjects = areaEmployees.map(({id, name, projectsCount}) => (
		<p key={'job-area-info-' + id}>
			{name} 

			<ButtonInfo onClick={
				() => getDetails(id, 'employee', companyId)
			} /> - {projectsCount} project{projectsCount !== 1 ? 's' : ''}
		</p>
	))

	return (
		<Fragment>
			<mark>job area</mark>

			<h3>{areaId}</h3>

			<h5>Employees engaged:</h5>

			<p>{areaEmployees.length}</p>

			<h5>Employees (projects):</h5>

			{employeesProjects || null}
		</Fragment>
	)
}

const mapStateToProps = (state) => {
	const {companies, employees, details} = state.data
	const {id, companyId} = details
	const areaEmployees = companies[companyId].jobArea[id].map(employee => ({
		...employee,
		projectsCount: employees[employee.id].projects.length
	}))

	return {
		areaId: id,
		companyId,
		areaEmployees
	}
}

const mapDispatchToProps = (dispatch) => ({
	getDetails: (id, dataType, companyId) => dispatch(getDetails(id, dataType, companyId))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(JobArea)
