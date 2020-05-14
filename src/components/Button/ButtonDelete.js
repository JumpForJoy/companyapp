import React from 'react'

const ButtonDelete = (props) => {
	const {onClick} = props

	return (
		<button className="btn-delete" onClick={onClick}>x</button>
	)
}

export default ButtonDelete
