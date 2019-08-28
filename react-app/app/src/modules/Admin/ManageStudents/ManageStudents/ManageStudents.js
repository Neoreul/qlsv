import React from 'react';
import { Link } from 'react-router-dom';

import { getStudents } from '../ManageStudents.services';
import { getClasses }  from '../../ManageClasses/ManageClasses.services';
import { getSubjects } from '../../ManageSubjects/ManageSubjects.services';

import { myDateFormat } from '../../../Utils/DateFormat';

import Admin from '../../Admin';

class ManageStudents extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			students: [],
			count: 0,
			classes: [],
			subjects: [],

			skip: "0",
			limit: "10",
			pages: 0,
			pagers: [],
			classId: 'all',
			subjectId: 'all',
			keyword: null
		};
	}

	componentDidMount() {
		this.getClasses();
		this.getSubjects();

		// First load
		this.getStudents();
	}

	getClasses() {
		getClasses()
			.then(res => {
				this.setState({ classes: res.data.classes });
			})
			.catch(err => {
				console.log(err);
			});
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

	getStudents(page=0) {
		const { limit, classId, subjectId, keyword } = this.state;

		getStudents({
			skip      : page,
			limit,
			class_id  : classId,
			subject_id: subjectId,
			keyword
		})
		.then(res => {
			let resData = res.data;

			// console.log("students: ", resData);

			this.setState({ 
				students: resData.students,
				count   : resData.count,
				skip    : (Number(resData.skip) + 1).toString(),
				limit   : resData.limit,
				pages   : (Number(resData.limit) !== 0) ? Math.ceil(Number(resData.count) / Number(resData.limit)) : 0
			}, () => {
				this.initPagers();
			});
		})
		.catch(err => {
			console.log(err);
		});
	}

	initPagers() {
		let pagers = [];
		for(let i = 1; i <= this.state.pages; i++){
			pagers.push(i);
		}

		this.setState({ pagers });
	}

	viewPage(skip=0) {
		let skipPage = Number(skip) > 0 ? Number(skip) - 1 : 0;
		this.getStudents(skipPage);
	}

	render() {
		const { students, count, classes, subjects } = this.state;

		return (
			<Admin>
				<div className="page">

					<div className="head-content clearfix">
						<h1 className="title">Management Students</h1>
						<div className="action">
							<Link className="button" to="/admin/students/create">+ Add Student</Link>
						</div>
					</div>

					<div className="body-content">

						{/* Toolbar */}
						<div className="toolbar clearfix">
							<div className="filter clearfix">
								<select className="classes" onChange={(e) => {
									this.setState({ classId: e.target.value }, () => {
										this.viewPage();
									});
								}}>
									<option key="all_classes" value="all">All Classes</option>
									{ classes.map((item, index) => (
										<option key={index} value={item._id}>{item.name}</option>
									)) }
								</select>
								<select className="subjects" onChange={(e) => {
									this.setState({ subjectId: e.target.value }, () => {
										this.viewPage();
									});
								}}>
									<option key="all_subjects" value="all">All Subjects</option>
									{ subjects.map((item, index) => (
										<option key={index} value={item._id}>{item.name}</option>
									)) }
								</select>
								<div className="search clearfix">
									<input type="text" name="search-input" id="search-input" placeholder="Enter keyword..." onKeyDown={(e) => {
										if(e.keyCode === 13) {
											this.setState({ keyword: e.target.value }, () => {
												this.viewPage();
											});
										}
									}} />
									<button onClick={this.viewPage}>Search</button>
								</div>
							</div>

							<div className="pagination clearfix">
								<span>View: </span>
								<select onChange={(e) => {
									this.setState({ limit: e.target.value }, () => {
										this.viewPage();
									});
								}}>
									<option key="2" value="2">2</option>
									<option key="10" value="10">10</option>
									<option key="20" value="20">20</option>
									<option key="50" value="50">50</option>
									<option key="100" value="100">100</option>
									<option key="0" value="0">All</option>
								</select>
								<span>Page: </span>
								{ this.createPagers() }
								<span>{students.length} / {count} students</span>
							</div>
						</div>
						{/* End Toolbar */}

						{/* Students table */}
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
								{ students.length > 0 && this.createTable() }
							</tbody>
						</table>
						{/* End Students table */}
					</div>

				</div>
			</Admin>
		);
	}

	createPagers() {
		const { pagers } = this.state;

		let options = [];
		for(let i = 0; i < pagers.length; i++) {
			options.push(<option key={i} value={pagers[i]}>{pagers[i]}</option>);
		}

		return <select onChange={(e) => this.viewPage(e.target.value)}>{options}</select>;
	}

	createTable() {
		let table = [];
		let students = this.state.students;
		let studentsLength = students.length;

		for(let i = 0; i < studentsLength; i++) {
			let children = [];

			children.push(<td key={students[i]._id + '1'}>{students[i].student_number}</td>);
			children.push(<td key={students[i]._id + '2'}>{students[i].first_name}</td>);
			children.push(<td key={students[i]._id + '3'}>{students[i].last_name}</td>);
			children.push(<td key={students[i]._id + '4'}>{students[i].email}</td>);
			children.push(<td key={students[i]._id + '5'}><span className="status">{students[i].status}</span></td>);
			children.push(<td key={students[i]._id + '6'}>{myDateFormat(students[i].date_modified)}</td>);
			children.push(<td key={students[i]._id + '7'}>
				<Link to={`/admin/students/edit/${students[i]._id}`}>
					<i className="fa fa-pencil-square-o" aria-hidden="true"></i>
					Edit
				</Link>
			</td>);

			table.push(<tr key={students[i]._id}>{children}</tr>);
		}

		return table;
	}
}

export default ManageStudents;