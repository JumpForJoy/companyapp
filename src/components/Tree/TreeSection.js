import React from 'react'

import Tree from './Tree'
import Details from '../Details/Details'

const TreeSection = (props) => (
	<div className="section-tree">
		<h1>Company app</h1>

		<div className="section__body">
			<div className="section__content">
				<Tree />
			</div>

			<div className="section__aside">
				<Details sticky />
			</div>
		</div>
	</div>
)

export default TreeSection
