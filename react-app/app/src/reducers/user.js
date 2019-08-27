const initialState = {
	isLoggedIn: false,
	user: null
};

const user = (state = initialState, action) => {
	switch(action.type) {
		case 'SET_USER': 
			let newState = {...state};
			
			newState.user       = action.payload.user;
			newState.isLoggedIn = true;

			return newState;

		default: 
			return state;
	}
}

export default user;