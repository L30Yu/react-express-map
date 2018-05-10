// action types
const API_CALL_REQUEST = "API_CALL_REQUEST";
const API_CALL_SUCCESS = "API_CALL_SUCCESS";
const API_CALL_FAILURE = "API_CALL_FAILURE";
const SET_QUERY = "SET_QUERY";

// reducer with initial state
const initialState = {
  fetching: false,
  addresses: null,
  error: null,
  query: null,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_QUERY:
        return { ...state, query: action.query };

    case API_CALL_REQUEST:
      return { ...state, fetching: true, error: null };
      
    case API_CALL_SUCCESS:
      return { ...state, fetching: false, addresses: action.addresses };
      
    case API_CALL_FAILURE:
      return { ...state, fetching: false, addresses: null, error: action.error };
      
    default:
      return state;
  }
}