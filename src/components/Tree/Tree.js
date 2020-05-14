import React, {Component} from 'react'
import {connect} from 'react-redux'

import {getDetails} from '../../store/actions/data/'

class Tree extends Component {
	generateCompanies = (companies) => companies.length ? (
		<ul>
			{companies.map(company => {
				const {id, name} = company

				return (
					<li key={'company-' + id}>
						<h4>
							<button onClick={() => this.props.getDetails(id, 'company')}>{name}</button>
						</h4>

						{this.generateAreas(company.jobArea, id)}
					</li>
				)
			})}
		</ul>
	) : null

	generateAreas = (areas, companyId) => {
		const areasKeys = Object.keys(areas)

		return areasKeys.length ? (
			<ul>
				{areasKeys.map((area, index) => (
					<li key={'area-' + area + index}>
						<h5>
							<button onClick={() => this.props.getDetails(area, 'area', companyId)}>{area}</button>
						</h5>

						{this.generateEmployees(areas[area], companyId)}
					</li>
				))}
			</ul>
		) : null
	}

	generateEmployees = (employees, companyId) => employees.length ? (
		<ul>
			{employees.map(employee => {
				const {id, name} = employee

				return (
					<li key={'employee-' + id}>
						<p>
							<button onClick={() => this.props.getDetails(id, 'employee', companyId)}>{name}</button>
						</p>
					</li>
				)
			})}
		</ul>
	) : null

	render() {
		const {tree = {}} = this.props

		return (
			<div className="tree">
				{this.generateCompanies(Object.values(tree))}
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	tree: state.data.companies
})

const mapDispatchToProps = (dispatch) => ({
	getDetails: (id, dataType, companyId) => dispatch(getDetails(id, dataType, companyId))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Tree)
