const INITIAL_STATE = {
  logged: false,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LOGIN':
      return {...state, logged: true};
    case 'LOGOUT':
      return {...state, logged: false};
    default:
      return state;
  }
}
