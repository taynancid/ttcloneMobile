import api from '../../services/api';

export const setUserList = data => ({
  type: 'SET_USER_LOGGED_LIST',
  payload: data,
});

export const setUserListLoading = data => ({
  type: 'SET_USER_LOGGED_LIST_LOADING',
  payload: data,
});

export const fetchUsers = () => async dispatch => {
  try {
    dispatch(setUserListLoading(true));
    const {data} = await api.get('users', {});
    dispatch(setUserList([...data]));
    dispatch(setUserListLoading(false));
  } catch (e) {
    dispatch(setUserListLoading(false));
    console.log(e);
  }
};

export default {
  fetchUsers,
};
