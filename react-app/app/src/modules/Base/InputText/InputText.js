import React from 'react';

class InputText extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isFocus: false,
			className: 'input'
		};

		// console.log(props);

		this.onChange = this.onChange.bind(this);
		this.onFocus  = this.onFocus.bind(this);
		this.onBlur   = this.onBlur.bind(this);
	}

	onChange(e) {
		this.props.changeValue(e.target.value);
	}

	onFocus(e) {
		this.setState({ isFocus: true, className: 'input focused' });
	}

	onBlur(e) {
		if(e.target.value !== "") return;

		this.setState({ isFocus: false, className: 'input' });
	}

	render() {
		const className = this.state.className;

		return (
			<div className={className}  >
				<label htmlFor={this.props.id}>
					{this.props.label}
					{this.renderRequired()}
				</label>
				<input 
					type={this.props.type} 
					id={this.props.id} 
					name={this.props.name} 
					value={this.props.value}
					onChange={this.onChange}
					onFocus={this.onFocus}
					onBlur={this.onBlur} />
			</div>
		);
	}

	renderRequired() {
		const isRequired = this.props.required;
		if(isRequired === "true") {
			return <span className="required">*</span>;
		} else {
			return null;
		}
	}
}

export default InputText;