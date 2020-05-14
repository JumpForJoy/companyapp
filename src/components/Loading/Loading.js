import React from 'react'

import LoadingIcon from '../../images/loading.svg'

function Loading(props) {
	return props.open ? (
		<div className="loading">
			<div className="loading__content">
				<img src={LoadingIcon} width={100} height={100} alt="Loading clock icon" />

				<p>Please, wait...</p>
			</div>
		</div>
	) : null
}

export default Loading