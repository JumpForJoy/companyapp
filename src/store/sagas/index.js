import {fork, call} from 'redux-saga/effects'

import {watchAppData} from './data/'

function* fetchAll() {
	yield fork(watchAppData)
}

function* rootSaga() {
	yield call(fetchAll)
}

export default rootSaga
