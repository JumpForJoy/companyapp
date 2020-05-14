import React, {Fragment} from 'react'
import {connect} from 'react-redux'

import ButtonInfo from '../../Button/ButtonInfo'

import {getDetails} from '../../../store/actions/data/'

const Company = (props) => {
	const {company, projects, getDetails} = props
	const {name, business, slogan, address, projects: projectsIds} = company
	const {street, city, state, country} = address

	return (
		<Fragment>
			<mark>company</mark>

			<h3>{name}</h3>

			<h5>Business:</h5>

			<p>
				{business}
			</p>

			<h5>Slogan:</h5>

			<p>
				{slogan}
			</p>

			<h5>Address:</h5>

			<p>
				{`${street}, ${city}, ${state}, ${country}`}
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
	const {companies, projects, details} = state.data
	const {id} = details

	return {
		company: companies[id],
		projects
	}
}

const mapDispatchToProps = (dispatch) => ({
	getDetails: (id, dataType) => dispatch(getDetails(id, dataType))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Company)
