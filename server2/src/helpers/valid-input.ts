import validator from 'validator';

class ValidInput {
	name(name: string): boolean {
		return validator.matches(name, /^.{1,15}/);
	}

	password(password: string): boolean {
		return validator.matches(password, /^[\w~!@#$%^&*()_+.<>?\[\]{};\/]{8,21}$/g);
	}
}

export default ValidInput;