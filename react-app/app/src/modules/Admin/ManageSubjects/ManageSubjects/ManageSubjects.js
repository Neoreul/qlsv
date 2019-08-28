import React from 'react';
import { Link } from 'react-router-dom';

import { myDateFormat } from '../../../Utils/DateFormat';

import {
	getSubjects
} from '../ManageSubjects.services';

import Admin from '../../Admin';

class ManageSubjects extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			subjects: []
		};
	}

	componentDidMount() {
		this.getSubjects();
	}

	getSubjects() {
		getSubjects()
			.then(res => {
				this.setState({ subjects: res.data.subjects });
			})
			.catch(err => {
				console.log(err);
			});
	}

	render() {

		const { subjects } = this.state;

		return (
			<Admin>
				<div className="page">
					<div className="head-content clearfix">
						<h1 className="title">Management Subjects</h1>
						<div className="action">
							<Link className="button" to="/admin/subjects/create">+ Add Subject</Link>
						</div>
					</div>
					<div className="body-content">
						<table>
							<thead>
								<tr>
									<th>ID.</th>
									<th>Name</th>
									<th>Description</th>
									<th>Status</th>
									<th>Str-End Years</th>
									<th>Last Modified</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{ subjects.length > 0 && this.createTable() }
							</tbody>
						</table>
					</div>
				</div>
			</Admin>
		);
	}

	createTable() {
		let table = [];
		let subjects = this.state.subjects;
		let subjectsLength = subjects.length;

		for(let i = 0; i < subjectsLength; i++) {
			let children = [];

			children.push(<td>{subjects[i].subject_number}</td>);
			children.push(<td>{subjects[i].name}</td>);
			children.push(<td><div className="description">{subjects[i].description}</div></td>);
			children.push(<td><span className="status">{subjects[i].status}</span></td>);
			children.push(<td>
				<span>{`${subjects[i].started_year} - `}</span>
				<span>{`${subjects[i].ended_year}`}</span>
			</td>);
			children.push(<td>{myDateFormat(subjects[i].date_modified)}</td>);
			children.push(<td>
				<Link to={`/admin/subjects/edit/${subjects[i]._id}`}>
					<i className="fa fa-pencil-square-o" aria-hidden="true"></i>
					Edit
				</Link>
			</td>);

			table.push(<tr key={subjects[i]._id}>{children}</tr>);
		}

		return table;
	}
}

export default ManageSubjects;