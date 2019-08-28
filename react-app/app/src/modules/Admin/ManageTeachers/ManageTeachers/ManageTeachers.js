import React from 'react';
import { Link } from 'react-router-dom';

import { myDateFormat } from '../../../Utils/DateFormat';

import {
	getTeachers
} from '../ManageTeachers.services';

import Admin from '../../Admin';

class ManageTeachers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			teachers: []
		};
	}

	componentDidMount() {
		this.getTeachers();
	}

	getTeachers() {
		getTeachers()
			.then(res => {
				this.setState({ teachers: res.data.teachers });
			})
			.catch(err => {
				console.log(err);
			});
	}

	render() {

		const { teachers } = this.state;

		return (
			<Admin>
				<div className="page">
					<div className="head-content clearfix">
						<h1 className="title">Management Teachers</h1>
						<div className="action">
							<Link className="button" to="/admin/teachers/create">+ Add Teacher</Link>
						</div>
					</div>
					<div className="body-content">
						<table>
							<thead>
								<tr>
									<th>ID.</th>
									<th>First Name</th>
									<th>Last Name</th>
									<th>Email</th>
									<th>Status</th>
									<th>Last Modified</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{ teachers.length > 0 && this.createTable() }
							</tbody>
						</table>
					</div>
				</div>
			</Admin>
		);
	}

	createTable() {
		let table = [];
		let teachers = this.state.teachers;
		let teachersLength = teachers.length;

		for(let i = 0; i < teachersLength; i++) {
			let children = [];

			children.push(<td>{teachers[i].teacher_number}</td>);
			children.push(<td>{teachers[i].first_name}</td>);
			children.push(<td>{teachers[i].last_name}</td>);
			children.push(<td>{teachers[i].email}</td>);
			children.push(<td><span className="status">{teachers[i].status}</span></td>);
			children.push(<td>{myDateFormat(teachers[i].date_modified)}</td>);
			children.push(<td>
				<Link to={`/admin/teachers/edit/${teachers[i]._id}`}>
					<i className="fa fa-pencil-square-o" aria-hidden="true"></i>
					Edit
				</Link>
			</td>);

			table.push(<tr key={teachers[i]._id}>{children}</tr>);
		}

		return table;
	}
}

export default ManageTeachers;