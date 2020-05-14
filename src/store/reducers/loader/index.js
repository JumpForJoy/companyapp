import {TOGGLE_LOADER} from '../../actions/loader/'

const initialState = {
	loading: false
}

export default (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_LOADER:
			return {loading: action.loading}
		default:
			return state
	}
}
