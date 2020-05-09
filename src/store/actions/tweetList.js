import api from '../../services/api';

export const setTweetList = data => ({
  type: 'SET_TWEET_LIST',
  payload: data,
});

export const setTweetListLoading = data => ({
  type: 'SET_TWEET_LIST_LOADING',
  payload: data,
});

export const fetchTweets = () => async dispatch => {
  try {
    dispatch(setTweetListLoading(true));
    const {data} = await api.get('tweets', {});
    dispatch(setTweetList([...data]));
    dispatch(setTweetListLoading(false));
  } catch (e) {
    dispatch(setTweetListLoading(false));
    console.log(e);
  }
};

export default {
  fetchTweets,
};
