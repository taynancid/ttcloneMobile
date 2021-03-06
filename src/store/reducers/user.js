const INITIAL_STATE = {
  data: {},
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_USER_LOGGED':
      return {...state, data: action.payload};
    default:
      return state;
  }
}
