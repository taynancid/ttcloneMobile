const INITIAL_STATE = {
  userListLoading: false,
  userList: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_USER_LOGGED_LIST_LOADING':
      return {...state, userListLoading: action.payload};
    case 'SET_USER_LOGGED_LIST':
      return {...state, userList: action.payload};
    default:
      return state;
  }
}
