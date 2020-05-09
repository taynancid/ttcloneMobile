const INITIAL_STATE = {
  tweetListLoading: false,
  tweetList: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_TWEET_LIST_LOADING':
      return {...state, tweetListLoading: action.payload};
    case 'SET_TWEET_LIST':
      return {...state, tweetList: action.payload};
    default:
      return state;
  }
}
