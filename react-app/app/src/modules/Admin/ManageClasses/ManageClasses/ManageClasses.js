import React from 'react';
import { Link } from 'react-router-dom';

import { myDateFormat } from '../../../Utils/DateFormat';

import {
	getClasses
} from '../ManageClasses.services';

import Admin from '../../Admin';

class ManageClasses extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			classes: []
		};
	}

	componentDidMount() {
		this.getClasses();
	}

	getClasses() {
		getClasses()
			.then(res => {
				// console.log("classes: ", res.data);
				this.setState({ classes: res.data.classes });
			})
			.catch(err => {
				console.log(err);
			});
	}

	render() {

		const { classes } = this.state;

		return (
			<Admin>
				<div className="page">
					<div className="head-content clearfix">
						<h1 className="title">Management Classes</h1>
						<div className="action">
							<Link className="button" to="/admin/classes/create">+ Add Class</Link>
						</div>
					</div>
					<div className="body-content">
						<table>
							<thead>
								<tr>
									<th>ID.</th>
									<th>Class Name</th>
									<th>Description</th>
									<th>Status</th>
									<th>Str-End Years</th>
									<th>Last Modified</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{ classes.length > 0 && this.createTable() }
							</tbody>
						</table>
					</div>
				</div>
			</Admin>
		);
	}

	createTable() {
		let table = [];
		let classes = this.state.classes;
		let classesLength = classes.length;

		for(let i = 0; i < classesLength; i++) {
			let children = [];

			children.push(<td>{classes[i].class_number}</td>);
			children.push(<td>{classes[i].name}</td>);
			children.push(<td><div className="description">{classes[i].description}</div></td>);
			children.push(<td><span className="status">{classes[i].status}</span></td>);
			children.push(<td>
				<span>{`${classes[i].started_year} - `}</span>
				<span>{`${classes[i].ended_year}`}</span>
			</td>);
			children.push(<td>{myDateFormat(classes[i].date_modified)}</td>);
			children.push(<td>
				<Link to={`/admin/classes/edit/${classes[i]._id}`}>
					<i className="fa fa-pencil-square-o" aria-hidden="true"></i>
					Edit
				</Link>
			</td>);

			table.push(<tr key={classes[i]._id}>{children}</tr>);
		}

		return table;
	}
}

export default ManageClasses;