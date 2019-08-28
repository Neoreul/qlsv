import React from 'react';
import { Link } from 'react-router-dom';

import { getSubject, removeSubject, createOrModifySubject } from '../ManageSubjects.services';
import { getStudents } from '../../ManageStudents/ManageStudents.services';

import Admin from '../../Admin';

import { Subject } from './Subject';

class ModifySubject extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			subjectId: '',
			subjectItem: Subject,

			isError: false,
			notify: '',
			isDone: false,

			tab: 'general',

			students: [],
			removedStudents: [],
			addedStudents: [],

			studentKeyword: '',
			searchStudentNotify: ''
		};

		this.createOrModify = this.createOrModify.bind(this);
		this.delete         = this.delete.bind(this);
		this.searchStudents = this.searchStudents.bind(this);
	}

	componentDidMount() {
		this.checkMode();
	}

	checkMode() {
		let subjectId = this.props.match.params.id;

		if(subjectId && !isNaN(Number(subjectId))) {
			this.setState({
				title: 'Edit Subject',
				subjectId
			}, () => {
				this.getSubject();
			});
		} else {
			this.setState({
				subjectItem: Subject,
				title: 'Create Subject'
			});
		}
	}

	changeTab(tab) {
		this.setState({ tab });
	}

	getSubject() {
		getSubject(Number(this.state.subjectId))
			.then(res => {
				this.setState({ subjectItem: res.data }, () => {

					this.getStudents();
				});
			})
			.catch(err => {
				console.log(err);
			});
	}

	getStudents() {
		getStudents({ subject_id: Number(this.state.subjectId) })
			.then(res => {
				this.setState({ students: res.data.students });
			})
			.catch(err => {
				console.log(err);
			});
	}

	removeStudent(id) {
		this.setState((prevState) => {
			let removedStudents = [...prevState.removedStudents];
			let students        = [...prevState.students];

			removedStudents.push(id);
			students = students.filter((s) => {
				return s["_id"] !== id;
			});

			return {
				removedStudents,
				students
			};
		});
	}

	addStudent(student) {
		this.setState((prevState) => {
			let addedStudents = [...prevState.addedStudents];
			let students      = [...prevState.students];

			addedStudents.push(student["_id"]);
			students.push(student);

			return {
				addedStudents,
				students
			};
		});
	}

	searchStudents() {
		if(!this.state.studentKeyword) return;

		this.setState({ searchStudentNotify: '' });

		getStudents({ keyword: this.state.studentKeyword })
			.then(res => {
				if(res.data.count && res.data.count === 1) {
					let isExistStudent = this.state.students.find(s => s["student_number"] === res.data.students[0]["student_number"]);
					if(!isExistStudent) {
						this.addStudent(res.data.students[0]);
					} else {
						this.setState({ searchStudentNotify : 'This student has added before!' });
					}
				} else {
					this.setState({ searchStudentNotify: 'Not found this students!' });
				}
			})
			.catch(err => {
				console.log(err);
			});
	}

	createOrModify(isContinue=false) {
		this.notify = "";
		this.isError= false;
		this.isDone = false;

		this.setState({
			notify: '',
			isError: false,
			isDone: false
		});

		this.removeTheSameStudentsBeforeUpdate(() => {

			// console.log(this.state.subjectItem);

			createOrModifySubject(this.state.subjectItem)
				.then(res => {
					// console.log("create or modify subject: ", res.data);
					const resData = res.data;

					if(resData.ok && resData.ok === 1) {

						this.setState({ isDone: true });

						if(!isContinue) {
							this.setState({ subjectItem: Subject }, () => {
								this.props.history.push('/admin/subjects');
							});
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
		});
	}

	removeTheSameStudentsBeforeUpdate(cb) {
		let dupplicatedStudents = this.state.removedStudents.filter((s) => { return this.state.addedStudents.indexOf(s) > -1; });

		let addedStudents = this.state.addedStudents.filter((s) => { return dupplicatedStudents.indexOf(s) === -1; });
		let removedStudents = this.state.removedStudents.filter((s) => { return dupplicatedStudents.indexOf(s) === -1; });

		this.setState((prevState) => {
			let subjectItem = {...prevState.subjectItem};
			subjectItem["removed_students"] = removedStudents;
			subjectItem["added_students"]   = addedStudents;

			return {
				subjectItem,
				removedStudents,
				addedStudents
			};
		}, () => {
			cb();
		});
	}

	delete() {
		let isConfirm = window.confirm("Are you sure delete this subject?");
		if(isConfirm) {
			const { subjectId } = this.state;
			removeSubject(Number(subjectId))
				.then(res => {
					this.props.history.push('/admin/subjects');
				})
				.catch(err => {
					console.log(err);
				});
		}
	}

	render() {
		const { title, subjectId, subjectItem, isError, notify, isDone, students, tab } = this.state;

		let deleteBtn;
		if(subjectId) {
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
								<li className={tab === 'students' ? 'active': ''} onClick={() => this.changeTab('students')}>Manage Students</li>

							</ul>

							<div className={'tab-content ' + (tab === 'general'? 'show': '')}>

								<div className="input">
									<label htmlFor="subject_number">
										Subject Number
										<span className="required">*</span>
									</label>
									<input type="text" id="subject_number" name="subject_number" value={subjectItem.subject_number} onChange={(e) => this.onChangeSubjectItem("subject_number", e.target.value)} />
								</div>

								<div className="input">
									<label htmlFor="name">
										Name
										<span className="required">*</span>
									</label>
									<input type="text" id="name" name="name" value={subjectItem.name} onChange={(e) => this.onChangeSubjectItem("name", e.target.value)} />
								</div>								

								<div className="col2">

									{/*Started-End years*/}
									<div className="input">
										<label htmlFor="started_year">
											Started Year
											<span className="required">*</span>
										</label>
										<select value={subjectItem.started_year} onChange={(e) => this.onChangeSubjectItem("started_year", e.target.value)}>
											<option key="snone" value=""></option>
											<option key="s2014" value="2014">2014</option>
											<option key="s2015" value="2015">2015</option>
											<option key="s2016" value="2016">2016</option>
											<option key="s2017" value="2017">2017</option>
											<option key="s2018" value="2018">2018</option>
											<option key="s2019" value="2019">2019</option>
											<option key="s2020" value="2020">2020</option>
											<option key="s2021" value="2021">2021</option>
											<option key="s2022" value="2022">2022</option>
										</select>
									</div>
									<div className="input">
										<label htmlFor="ended_year">
											Ended Year
											<span className="required">*</span>
										</label>
										<select value={subjectItem.ended_year} onChange={(e) => this.onChangeSubjectItem("ended_year", e.target.value)}>
											<option key="enone" value=""></option>
											<option key="e2014" value="2014">2014</option>
											<option key="e2015" value="2015">2015</option>
											<option key="e2016" value="2016">2016</option>
											<option key="e2017" value="2017">2017</option>
											<option key="e2018" value="2018">2018</option>
											<option key="e2019" value="2019">2019</option>
											<option key="e2020" value="2020">2020</option>
											<option key="e2021" value="2021">2021</option>
											<option key="e2022" value="2022">2022</option>
										</select>
									</div>

								</div>

								<div className="input">
									<label htmlFor="description">
										Description
									</label>
									<input type="text" id="description" name="description" value={subjectItem.description} onChange={(e) => this.onChangeSubjectItem("description", e.target.value)} />
								</div>

								<div className="input">
									<label htmlFor="status">
										Status
										<span className="required">*</span>
									</label>
									<select onChange={(e) => this.onChangeSubjectItem("status", e.target.value)}>
										<option value="enabled">Enabled</option>
										<option value="disabled">Disabled</option>
									</select>
								</div>

							</div>

							<div className={'tab-content ' + (tab === 'students'? 'show': '')}>

								{ this.state.searchStudentNotify !== '' ? 
									<p style={{fontSize: '13px', color: '#222'}}>{this.state.searchStudentNotify}</p> : null }

								<div className="search clearfix" style={{marginBottom: '25px'}}>
									<input type="text" name="search-input" id="search-input" placeholder="Enter Student Number" value={this.state.studentKeyword} onChange={(e) => {
										this.setState({ studentKeyword: e.target.value });
									}} />
									<button style={{padding: '8px 15px 9px 15px', fontSize: '14px', textTransform: 'capitalize', backgroundColor: '#6d7d85'}} onClick={this.searchStudents}>Add Student</button>
								</div>

								<p style={{marginBottom: '3px'}}>
									<strong style={{fontWeight: 500}}>List students</strong>
								</p>

								<ul className="list-checkbox students">

									{ students.map((item, index) => (
										<li key={index}>
											<label className="container">
												<Link to={'/admin/students/edit/' + item._id} style={{color: 'var(--text)'}} title={item.student_number}>
													<span className="student-number">{item.student_number}</span>
													<span className="student-name">{item.first_name} {item.last_name}</span>
												</Link>
												<input type="checkbox" name={item._id} checked={true} onChange={() => this.removeStudent(item._id)} />
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

	onChangeTeacherItem(key, value) {
		this.setState(prevState => {
			let teacherItem = {...prevState.teacherItem};

			teacherItem[key] = value;

			return {
				teacherItem
			};
		});
	}
}; 

export default ModifySubject;