import React, {Component} from 'react'
import {connect} from 'react-redux'

import Wrapper from './components/Wrapper/Wrapper'
import Loading from './components/Loading/Loading'
import TreeSection from './components/Tree/TreeSection'

import {initAppData} from './store/actions/data/'
import {toggleLoader} from './store/actions/loader/'

class App extends Component {
	componentDidMount() {
		const {toggleLoader, initAppData} = this.props

		toggleLoader(true)
		initAppData()
	}

	render() {
		const {loading} = this.props
		
		return (
			<Wrapper>
				<TreeSection />

				<Loading open={loading} /> 
			</Wrapper>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.loader.loading
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		initAppData: () => dispatch(initAppData()),
		
		toggleLoader: (show) => dispatch(toggleLoader(show))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)