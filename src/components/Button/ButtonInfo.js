import React from 'react'

const ButtonInfo = (props) => {
	const {onClick} = props

	return (
		<button className="btn-info" onClick={onClick}>i</button>
	)
}

export default ButtonInfo
