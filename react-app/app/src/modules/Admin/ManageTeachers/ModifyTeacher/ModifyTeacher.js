import React from 'react';

import { getTeacher, removeTeacher, createOrModifyTeacher } from '../ManageTeachers.services';
import { getSubjects } from '../../ManageSubjects/ManageSubjects.services';

import Admin from '../../Admin';

import { Teacher } from './Teacher';

class ModifyTeacher extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title    : "",
			teacherId  : "",
			teacherItem: Teacher,
			isError  : false,
			notify   : "",
			isDone   : false,
			tab      : 'general',
			subjects : []
		};

		this.createOrModify = this.createOrModify.bind(this);
		this.delete = this.delete.bind(this);
	}

	componentDidMount() {
		this.checkMode();
	}

	changeTab(tab) {
		this.setState({ tab });
	}

	getSubjects() {
		getSubjects()
			.then(res => {
				let subjects = res.data.subjects;

				if(this.state.teacherId) {
					subjects.forEach(s => {
						s["checked"] = false;

						for(let i = 0; i < this.state.teacherItem["subjects"].length; i++) {
							if(this.state.teacherItem["subjects"][i] === s["_id"]) {
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

	checkMode() {
		let teacherId = this.props.match.params.id;

		if(teacherId && !isNaN(Number(teacherId))) {
			this.setState({
				title: 'Edit Teacher',
				teacherId
			}, () => {
				this.getTeacher();
			});
		} else {
			this.setState({
				teacherItem: Teacher,
				title: 'Create Teacher'
			});
		}
	}

	getTeacher() {
		const { teacherId } = this.state;

		getTeacher(Number(teacherId))
			.then(res => {
				let teacher = res.data;
				teacher["age"] = teacher["age"].toString();

				this.setState({ teacherItem: teacher }, () => {
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

		const { teacherItem } = this.state;

		teacherItem["subjects"] = [];
		this.state.subjects.forEach(s => {
			if(s["checked"] === true) {
				teacherItem["subjects"].push(s["_id"]);
			}
		});

		createOrModifyTeacher(teacherItem)
			.then(res => {
				let resData = res.data;
				if(resData.ok && resData.ok === 1) {
					this.setState({ isDone: true });

					if(!isContinue) {
						this.setState({ teacherItem: Teacher }, () => {
							this.props.history.push("/admin/teachers");
						});
					} else {
						this.setState({ teacherItem });
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
		let isConfirm = window.confirm("Are you sure delete this teacher?");
		if(isConfirm) {
			const { teacherId } = this.state;
			removeTeacher(Number(teacherId))
				.then(res => {
					this.props.history.push('/admin/teachers');
				})
				.catch(err => {
					console.log(err);
				});
		}
	}

	render() {
		const { title, teacherId, teacherItem, isError, notify, isDone, subjects, tab } = this.state;

		let deleteBtn;
		if(teacherId) {
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
								<li className={tab === 'address' ? 'active': ''} onClick={() => this.changeTab('address')}>Address</li>
								<li className={tab === 'subjects' ? 'active': ''} onClick={() => this.changeTab('subjects')}>Subjects</li>

							</ul>

							<div className={'tab-content ' + (tab === 'general'? 'show': '')}>

								<div className="input">
									<label htmlFor="teacher_number">
										Teacher Number
										<span className="required">*</span>
									</label>
									<input type="text" id="teacher_number" name="teacher_number" value={teacherItem.teacher_number} onChange={(e) => this.onChangeTeacherItem("teacher_number", e.target.value)} />
								</div>

								<div className="col2">

									<div className="input">
										<label htmlFor="first_name">
											First Name
											<span className="required">*</span>
										</label>
										<input type="text" id="first_name" name="first_name" value={teacherItem.first_name} onChange={(e) => this.onChangeTeacherItem("first_name", e.target.value)} />
									</div>

									<div className="input">
										<label htmlFor="last_name">
											Last Name
											<span className="required">*</span>
										</label>
										<input type="text" id="last_name" name="last_name" value={teacherItem.last_name} onChange={(e) => this.onChangeTeacherItem("last_name", e.target.value)} />
									</div>									

								</div>

								<div className="col2">

									<div className="input">
										<label htmlFor="email">
											Email
											<span className="required">*</span>
										</label>
										<input type="text" id="email" name="email" value={teacherItem.email} onChange={(e) => this.onChangeTeacherItem("email", e.target.value)} />
									</div>

									<div className="input">
										<label htmlFor="age">
											Age
										</label>
										<select value={teacherItem.age} onChange={(e) => {this.onChangeTeacherItem('age', e.target.value)}}>
											<option value=""></option>
											<option value="23">23</option>
											<option value="24">24</option>
											<option value="25">25</option>
											<option value="26">26</option>
											<option value="27">27</option>
											<option value="28">28</option>
											<option value="29">29</option>
											<option value="30">30</option>
											<option value="31">31</option>
											<option value="32">32</option>
											<option value="33">33</option>
											<option value="34">34</option>
											<option value="35">35</option>
										</select>
									</div>

								</div>

								<div className="col2">

									<div className="input">
										<label htmlFor="faculty">
											Faculty
										</label>
										<select value={teacherItem.faculty} onChange={(e) => this.onChangeTeacherItem("faculty", e.target.value)}>
											<option value="it">Information Teachnology</option>
											<option value="ms">Mathematics and Statistics</option>
										</select>
									</div>

									<div className="input">
										<label htmlFor="marjor">
											Marjor
										</label>
										<select value={teacherItem.marjor} onChange={(e) => this.onChangeTeacherItem("marjor", e.target.value)}>
											<option value="knpm">Software Engineer</option>
										</select>
									</div>

								</div>

								<div className="input">
									<label htmlFor="status">
										Status
										<span className="required">*</span>
									</label>
									<select onChange={(e) => this.onChangeTeacherItem("status", e.target.value)}>
										<option value="teaching">Teaching</option>
										<option value="leaved">Leaved</option>
									</select>
								</div>

							</div>

							<div className={'tab-content ' + (tab === 'address'? 'show': '')}>

								<div className="input">
									<label htmlFor="special_name">
										Special Name
									</label>
									<input type="text" id="special_name" name="special_name" value={teacherItem.special_name} onChange={(e) => this.onChangeTeacherItem("special_name", e.target.value)} />
								</div>

								<div className="input">
									<label htmlFor="street_address1">
										Street Address
									</label>
									<input type="text" id="street_address1" name="street_address1" value={teacherItem.street_address1} onChange={(e) => this.onChangeTeacherItem("street_address1", e.target.value)} />
								</div>

								<div className="input">
									<label htmlFor="street_address2">
										Apartment, Floor, etc.
									</label>
									<input type="text" id="street_address2" name="street_address2" value={teacherItem.street_address2} onChange={(e) => this.onChangeTeacherItem("street_address2", e.target.value)} />
								</div>

								<div className="col2">

									<div className="input">
										<label htmlFor="city">
											City
										</label>
										<input type="text" id="city" name="city" value={teacherItem.city} onChange={(e) => this.onChangeTeacherItem("city", e.target.value)} />
									</div>

									<div className="input">
										<label htmlFor="state">
											State
										</label>
										<select onChange={(e) => {this.onChangeTeacherItem('state', e.target.value)}}>
											<option value="AL">Alabama</option>
											<option value="AK">Alaska</option>
											<option value="CA">California</option>
											<option value="FL">Florida</option>
											<option value="HI">Hawaii</option>
											<option value="IN">Indiana</option>
											<option value="KY">Kentucky</option>
											<option value="MI">Michigan</option>
											<option value="NV">Nevada</option>
											<option value="OH">Ohio</option>
										</select>
									</div>

								</div>

								<div className="col2">

									<div className="input">
										<label htmlFor="zipcode">
											Zipcode
										</label>
										<input type="text" id="zipcode" name="zipcode" value={teacherItem.zipcode} onChange={(e) => this.onChangeTeacherItem("zipcode", e.target.value)} />
									</div>

									<div className="input">
										<label htmlFor="phone">
											Phone
										</label>
										<input type="text" id="phone" name="phone" value={teacherItem.phoney} onChange={(e) => this.onChangeTeacherItem("phone", e.target.value)} />
									</div>

								</div>

							</div>

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

	onChangeTeacherItem(key, value) {
		this.setState(prevState => {
			let teacherItem = {...prevState.teacherItem};

			teacherItem[key] = value;

			return {
				teacherItem
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

export default ModifyTeacher;