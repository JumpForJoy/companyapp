import {all, call, put, select, takeLatest} from 'redux-saga/effects'

import {
	INIT_APP_DATA,
	GET_DETAILS,
	initAppDataSuccess,
	setAddress,
	setProjects,
	setDetails
} from '../../actions/data/'
import {toggleLoader} from '../../actions/loader/'
import AppServices from '../../../services/AppServices'

import {getAddress, getCompanyProjects} from '../../reducers/data/'

function* getAppData({cityId, unit, apiKey}) {
	try {
		const companies = yield call(AppServices.getCompanies)
		const employees = yield call(AppServices.getEmployees)
		const projects = yield call(AppServices.getProjects)
		
		yield put(initAppDataSuccess({
			data: {
				companies,
				employees,
				projects
			}
		}))
	} catch(error) {
		console.error(error)
	}

	yield put(toggleLoader())
}

function* getDetails({id, dataType, companyId}) {
	try {
		if (dataType === 'company') {
			const addressFromStore = yield select(getAddress, id)
			const projectsFromStore = yield select(getCompanyProjects, id)

			if (!Object.keys(addressFromStore).length) {
				const address = yield call(AppServices.getAddress, id)

				yield put(setAddress(id, address))
			}

			if (!Object.keys(projectsFromStore).length) {
				const projects = yield call(AppServices.getCompanyProjects, id)

				yield put(setProjects(id, projects.map(project => project.id)))
			}
		}

		yield put(setDetails(id, dataType, companyId))
	} catch(error) {
		console.error(error)
	}

	yield put(toggleLoader())
}

export function* watchAppData() {
	yield all([
		yield takeLatest(INIT_APP_DATA, getAppData),
		yield takeLatest(GET_DETAILS, getDetails)
	])
}
