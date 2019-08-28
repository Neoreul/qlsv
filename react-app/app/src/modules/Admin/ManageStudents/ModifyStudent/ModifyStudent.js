import React from 'react';

import { getStudent, removeStudent, createOrModifyStudent } from '../ManageStudents.services';
import { getSubjects } from '../../ManageSubjects/ManageSubjects.services';
import { getClasses } from '../../ManageClasses/ManageClasses.services';

import Admin from '../../Admin';

import { Student } from './Student';

class ModifyStudent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title    : "",
			studentId: "",
			studentItem: Student,
			isError  : false,
			notify   : "",
			isDone   : false,
			tab      : 'general',
			classes  : [],
			subjects : []
		};

		this.createOrModify = this.createOrModify.bind(this);
		this.delete = this.delete.bind(this);
	}

	componentDidMount() {
		this.getClasses();
		this.checkMode();
	}

	changeTab(tab) {
		this.setState({ tab });
	}

	getSubjects() {
		getSubjects()
			.then(res => {
				let subjects = res.data.subjects;

				if(this.state.studentId) {
					subjects.forEach(s => {
						s["checked"] = false;

						for(let i = 0; i < this.state.studentItem["subjects"].length; i++) {
							if(this.state.studentItem["subjects"][i] === s["_id"]) {
								s["checked"] = true;
							}
						}
					});

					this.setState({ subjects });
				}
			})
			.catch(err => {
				console.log(err);
			});
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

	checkMode() {
		let studentId = this.props.match.params.id;

		if(studentId && !isNaN(Number(studentId))) {
			this.setState({
				title: 'Edit Student',
				studentId
			}, () => {
				this.getStudent();
			});
		} else {
			this.setState({
				studentItem: Student,
				title: 'Create Student'
			});
			this.getSubjects();
		}
	}

	getStudent() {
		const { studentId } = this.state;

		getStudent(Number(studentId))
			.then(res => {
				this.setState({ studentItem: res.data }, () => {
					this.getSubjects();
				});
			})
			.catch(err => {
				console.log(err);
			});
	}

	createOrModify(isContinue=false) {
		this.setState({
			notify: "",
			isError: false,
			isDone: false
		});

		const { studentItem } = this.state;

		studentItem["subjects"] = [];
		this.state.subjects.forEach(s => {
			if(s["checked"] === true) {
				studentItem["subjects"].push(s["_id"]);
			}
		});

		createOrModifyStudent(studentItem)
			.then(res => {
				let resData = res.data;
				if(resData.ok && resData.ok === 1) {
					this.setState({ isDone: true });

					if(!isContinue) {
						this.setState({ studentItem: Student }, () => {
							this.props.history.push("/admin/students");
						});
					} else {
						this.setState({ studentItem });
					}
				}

				if(resData.err && resData.err === 1) {
					this.setState({
						notify: resData.msg,
						isError: true
					});
				}
			})
			.catch(err => {
				console.log(err);
			});
	}

	delete() {
		let isConfirm = window.confirm("Are you sure delete this student?");
		if(isConfirm) {
			const { studentId } = this.state;
			removeStudent(Number(studentId))
				.then(res => {
					this.props.history.push('/admin/students');
				})
				.catch(err => {
					console.log(err);
				});
		}
	}

	render() {
		const { title, studentId, studentItem, isError, notify, isDone, subjects, classes, tab } = this.state;

		let deleteBtn;
		if(studentId) {
			deleteBtn = <a className="button" onClick={this.delete}>Delete</a>;
		} else {
			deleteBtn = null;
		}

		return (
			<Admin>
				<div className="page">
					<div className="head-content clearfix">
						<h1 className="title">{title}</h1>

						<div className="action">
							{ deleteBtn }
							<a className="button" onClick={() => this.createOrModify()}>Save</a>
							<a className="button" onClick={() => this.createOrModify(true)}>Save And Continue</a>
						</div>
					</div>
					<div className="body-content">
						<form>
							<div className={"notify " + (isError? 'active' : '')}>{notify}</div>
							<div className={"notify success " + (isDone? 'active' : '')}>Saved!</div>

							<ul className="tabs clearfix">
								<li className={tab === 'general' ? 'active': ''} onClick={() => this.changeTab('general')}>General</li>
								{/*<li className={tab === 'addresses' ? 'active': ''} onClick={() => this.changeTab('addresses')}>Addresses</li>*/}
								<li className={tab === 'subjects' ? 'active': ''} onClick={() => this.changeTab('subjects')}>Subjects</li>

							</ul>

							<div className={'tab-content ' + (tab === 'general'? 'show': '')}>

								<div className="input">
									<label htmlFor="student_number">
										Student Number
										<span className="required">*</span>
									</label>
									<input type="text" id="student_number" name="student_number" value={studentItem.student_number} onChange={(e) => this.onChangeStudentItem("student_number", e.target.value)} />
								</div>

								<div className="col2">

									<div className="input">
										<label htmlFor="first_name">
											First Name
											<span className="required">*</span>
										</label>
										<input type="text" id="first_name" name="first_name" value={studentItem.first_name} onChange={(e) => this.onChangeStudentItem("first_name", e.target.value)} />
									</div>

									<div className="input">
										<label htmlFor="last_name">
											Last Name
											<span className="required">*</span>
										</label>
										<input type="text" id="last_name" name="last_name" value={studentItem.last_name} onChange={(e) => this.onChangeStudentItem("last_name", e.target.value)} />
									</div>									

								</div>

								{ this.renderPasswordContent() }

								<div className="col2">

									<div className="input">
										<label htmlFor="email">
											Email
											<span className="required">*</span>
										</label>
										<input type="text" id="email" name="email" value={studentItem.email} onChange={(e) => this.onChangeStudentItem("email", e.target.value)} />
									</div>

									<div className="input">
										<label htmlFor="age">
											Age
										</label>
										<select onChange={(e) => {this.onChangeStudentItem('age', e.target.value)}}>
											<option key="noage" value=""></option>
											<option key="15" value="15">15</option>
											<option key="16" value="16">16</option>
											<option key="17" value="17">17</option>
											<option key="18" value="18">18</option>
											<option key="19" value="19">19</option>
											<option key="20" value="20">20</option>
											<option key="21" value="21">21</option>
											<option key="22" value="22">22</option>
											<option key="23" value="23">23</option>
											<option key="24" value="24">24</option>
											<option key="25" value="25">25</option>
											<option key="26" value="26">26</option>
										</select>
									</div>

								</div>

								<div className="col2">

									<div className="input">
										<label htmlFor="class_id">
											Class
										</label>
										<select value={studentItem.class_id} onChange={(e) => this.onChangeStudentItem("class_id", e.target.value)}>
											<option key="class_id_none" value=""></option>
											{ classes.map((item, index) => (
												<option key={index} value={item._id}>{item.name}</option>
											)) }
										</select>
									</div>

									<div className="input">
										<label htmlFor="faculty">
											Faculty
										</label>
										<select value={studentItem.faculty} onChange={(e) => this.onChangeStudentItem("faculty", e.target.value)}>
											<option value="it">Information Teachnology</option>
											<option value="ms">Mathematics and Statistics</option>
										</select>
									</div>

								</div>

								<div className="col2">

									<div className="input">
										<label htmlFor="marjor">
											Marjor
										</label>
										<select value={studentItem.marjor} onChange={(e) => this.onChangeStudentItem("marjor", e.target.value)}>
											<option value="knpm">Software Engineer</option>
										</select>
									</div>

									<div className="input">
										<label htmlFor="status">
											Status
											<span className="required">*</span>
										</label>
										<select onChange={(e) => this.onChangeStudentItem("status", e.target.value)}>
											<option value="studying">Studying</option>
											<option value="leaved">Leaved</option>
										</select>
									</div>

								</div>

							</div>

							{/*<div className={'tab-content ' + (tab === 'addresses'? 'show': '')}>

							</div>*/}

							<div className={'tab-content ' + (tab === 'subjects'? 'show': '')}>

								<ul className="list-checkbox">

									{ subjects.map((item, index) => (
										<li key={index}>
											<label className="container">{item.name}
												<input type="checkbox" name={item._id} defaultChecked={item.checked} onChange={() => this.onChangeSubjects(item, index)} />
												<span className="checkmark"></span>
											</label>
										</li>
									)) }

								</ul>

							</div>

						</form>
					</div>
				</div>
			</Admin>
		);
	}

	renderPasswordContent() {
		const { studentItem } = this.state;

		if(!this.state.studentId) {
			return (
				<div className="col2">

					<div className="input">
						<label htmlFor="password">
							Password
							<span className="required">*</span>
						</label>
						<input type="text" id="password" name="password" value={studentItem.password} onChange={(e) => this.onChangeStudentItem("password", e.target.value)} />
					</div>

					<div className="input">
						<label htmlFor="confirm_password">
							Confirm Password
							<span className="required">*</span>
						</label>
						<input type="text" id="confirm_password" name="confirm_password" value={studentItem.confirm_password} onChange={(e) => this.onChangeStudentItem("confirm_password", e.target.value)} />
					</div>

				</div>
			);
		} else {
			return null;
		}
	}

	onChangeStudentItem(key, value) {
		this.setState(prevState => {
			let studentItem = {...prevState.studentItem};

			studentItem[key] = value;

			return {
				studentItem
			};
		});
	}

	onChangeSubjects(item, index) {

		this.setState((prevState) => {
			let subjects = [...prevState.subjects];

			item["checked"] = !item["checked"];

			subjects[index] = item;

			return {
				subjects
			};
		});
	}
}

export default ModifyStudent;