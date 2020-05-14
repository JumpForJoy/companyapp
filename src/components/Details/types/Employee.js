import React, {Fragment} from 'react'
import {connect} from 'react-redux'

import ButtonInfo from '../../Button/ButtonInfo'

import {getDetails} from '../../../store/actions/data/'

const Employee = (props) => {
	const {employee, projects, companyId, getDetails} = props
	const {firstName, lastName, dateOfBirth, jobTitle, jobArea, jobType, projects: projectsIds} = employee

	return (
		<Fragment>
			<mark>employee</mark>

			<h3>
				{`${firstName} ${lastName}`}
			</h3>

			<h5>Date of birth:</h5>

			<p>
				{new Date(dateOfBirth).toLocaleDateString()}
			</p>

			<h5>Job title:</h5>

			<p>
				{jobTitle}
			</p>

			<h5>Job area:</h5>

			<p>
				{jobArea} 

				<ButtonInfo onClick={() => getDetails(jobArea, 'area', companyId)} />
			</p>

			<h5>Job type:</h5>

			<p>
				{jobType}
			</p>

			<h5>Projects:</h5>

			{projectsIds.length ? projectsIds.map(id => {
				const {name, department} = projects[id]

				return (
					<p key={'project-info-' + id}>
						{name} ({department})

						<ButtonInfo onClick={() => getDetails(id, 'project')} />
					</p>
				)
			}) : null}
		</Fragment>
	)
}

const mapStateToProps = (state) => {
	const {employees, projects, details} = state.data
	const {id, companyId} = details

	return {
		employee: employees[id],
		projects,
		companyId
	}
}

const mapDispatchToProps = (dispatch) => ({
	getDetails: (id, dataType, companyId) => dispatch(getDetails(id, dataType, companyId))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Employee)
