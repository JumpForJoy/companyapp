import React, {Component} from 'react'
import {connect} from 'react-redux'
import ReactDOM from 'react-dom'

import Company from './types/Company'
import JobArea from './types/JobArea'
import Employee from './types/Employee'
import Project from './types/Project'

class Details extends Component {
	state = {
		stickyEl: null,
		stickyParentEl: null,
		stickyWidth: null,
		stickyBegin: null,
		stickyEnd: null,
		stickyRight: null,
		stickyOnTop: false,
		stickyOnBottom: false
	}

	componentDidMount() {
		const {stickyEl} = this.state
		const {sticky} = this.props

		if (sticky) {
			const _this = this

			if (stickyEl) {
				this.initSticky()
			}

			window.addEventListener('scroll', function(event) {
				_this.manageStickyElement()
			})
			window.addEventListener('resize', function(event) {
				_this.initSticky()
			})
		}
	}

	componentDidUpdate(prevProps) {
		const {details} = this.props
		const {sticky} = this.props

		if (sticky && !prevProps.details && details) {
			this.initSticky()
		}
	}

	initSticky = () => {
		const stickyEl = ReactDOM.findDOMNode(this)

		if (stickyEl) {
			const stickyParentEl = stickyEl.parentNode
			const stickyWidth = stickyParentEl.offsetWidth
			const stickyBegin = stickyParentEl.offsetTop
			const stickyEnd = stickyBegin + stickyParentEl.offsetHeight - stickyEl.offsetHeight
			const stickyRight = document.body.offsetWidth - stickyParentEl.offsetLeft - stickyParentEl.offsetWidth
			const offsetTop = window.scrollY

			this.setState({
				stickyEl,
				stickyParentEl,
				stickyWidth,
				stickyBegin,
				stickyEnd,
				stickyRight,
				stickyOnTop: offsetTop >= stickyBegin,
				stickyOnBottom: offsetTop >= stickyEnd
			})
		}
	}

	manageStickyElement = () => {
		const {stickyEl, stickyBegin, stickyEnd} = this.state
		const offsetTop = window.scrollY

		if (stickyEl) {
			this.setState({
				stickyOnTop: offsetTop >= stickyBegin,
				stickyOnBottom: offsetTop >= stickyEnd
			})
		}
	}

	generateDetailsType = (details) => {
		const {dataType} = details

		let DetailsComponent = null

		switch (dataType) {
			case 'company':
				DetailsComponent = Company
				break
			case 'area':
				DetailsComponent = JobArea
				break
			case 'employee':
				DetailsComponent = Employee
				break
			case 'project':
				DetailsComponent = Project
				break
			default:
				DetailsComponent = null
				break
		}

		return <DetailsComponent />
	}

	render() {
		const {stickyWidth, stickyOnTop, stickyOnBottom, stickyRight} = this.state
		const {sticky, details} = this.props
		const styleTop = sticky && stickyOnTop && !stickyOnBottom ? {
			position: 'fixed',
			width: stickyWidth,
			top: 15,
			left: 'auto',
			right: stickyRight
		} : {}

		return details ? (
			<div
				className={
					'details' + 
					(stickyOnBottom ? ' bottom' : '')
				}
				style={styleTop}
			>
				{this.generateDetailsType(details)}
			</div>
		) : null
	}
}

const mapStateToProps = (state) => {
	return {
		details: state.data.details
	}
}

export default connect(mapStateToProps)(Details)