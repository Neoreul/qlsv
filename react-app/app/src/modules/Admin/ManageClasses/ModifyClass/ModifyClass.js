import React from 'react';

import { getClass, removeClass, createOrModifyClass } from '../ManageClasses.services';
import { getTeachers } from '../../ManageTeachers/ManageTeachers.services';

import Admin from '../../Admin';

const intitalClassItem = {
	class_number: "",
	name: "",
	started_year: "",
	ended_year: "",
	homeroom_teacher: "",
	description: "",
	status: "opening"
};

class ModifyClass extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title    : "",
			classId  : "",
			classItem: intitalClassItem,
			isError  : false,
			notify   : "",
			isDone   : false,
			teachers : []
		};

		this.createOrModify = this.createOrModify.bind(this);
		this.delete = this.delete.bind(this);
	}

	componentDidMount() {
		this.getTeachers();
		this.checkMode();
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

	checkMode() {
		let classId = this.props.match.params.id;

		if(classId && !isNaN(Number(classId))) {
			this.setState({
				title: 'Edit Class',
				classId
			}, () => {
				this.getClass();
			});
		} else {
			this.setState({
				classItem: intitalClassItem,
				title: 'Create Class'
			});
		}
	}

	getClass() {
		const { classId } = this.state;

		getClass(Number(classId))
			.then(res => {
				this.setState({ classItem: res.data });
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

		const { classItem } = this.state;

		createOrModifyClass(classItem)
			.then(res => {
				let resData = res.data;
				if(resData.ok && resData.ok === 1) {
					this.setState({ isDone: true });

					if(!isContinue) {
						this.setState({ classItem: {} }, () => {
							this.props.history.push("/admin/classes");
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
	}

	delete() {
		let isConfirm = window.confirm("Are you sure delete this class?");
		if(isConfirm) {
			const { classId } = this.state;
			removeClass(Number(classId))
				.then(res => {
					this.props.history.push('/admin/classes');
				})
				.catch(err => {
					console.log(err);
				});
		}
	}

	render() {
		const { title, classId, classItem, isError, notify, isDone, teachers } = this.state;

		let deleteBtn;
		if(classId) {
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

							<div className="input">
								<label htmlFor="class_number">
									Class Number
									<span className="required">*</span>
								</label>
								<input type="text" id="class_number" name="class_number" value={classItem.class_number} onChange={(e) => this.onChangeClassItem("class_number", e.target.value)} />
							</div>

							<div className="input">
								<label htmlFor="name">
									Name
									<span className="required">*</span>
								</label>
								<input type="text" id="name" name="name" value={classItem.name} onChange={(e) => this.onChangeClassItem("name", e.target.value)} />
							</div>

							<div className="col2">

								<div className="input">
									<label htmlFor="started_year">
										Started Year
										<span className="required">*</span>
									</label>
									<select value={classItem.started_year} onChange={(e) => this.onChangeClassItem("started_year", e.target.value)}>
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
									<select value={classItem.ended_year} onChange={(e) => this.onChangeClassItem("ended_year", e.target.value)}>
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
								<label htmlFor="homeroom_teacher">
									Homeroom Teacher
									<span className="required">*</span>
								</label>
								<select value={classItem.homeroon_teacher} onChange={(e) => this.onChangeClassItem("homeroom_teacher", e.target.value)}>
									<option key="none_homeroom_teacher" value=""></option>
									{teachers.map((item, index) => (
										<option key={index} value={item._id}>{item.first_name} {item.last_name}</option>
									))}
								</select>
							</div>

							<div className="input">
								<label htmlFor="description">
									Description
								</label>
								<textarea rows="5" id="description" name="description" value={classItem.description} onChange={(e) => this.onChangeClassItem("description", e.target.value)}></textarea>
							</div>

							<div className="input">
								<label htmlFor="status">
									Status
									<span className="required">*</span>
								</label>
								<select value={classItem.status} onChange={(e) => this.onChangeClassItem("status", e.target.value)}>
									<option key="opening" value="opening">Opening</option>
									<option key="closed" value="closed">Closed</option>
								</select>
							</div>

						</form>
					</div>
				</div>
			</Admin>
		);
	}

	onChangeClassItem(key, value) {
		this.setState(prevState => {
			let classItem = {...prevState.classItem};

			classItem[key] = value;

			return {
				classItem
			};
		});
	}
}

export default ModifyClass;