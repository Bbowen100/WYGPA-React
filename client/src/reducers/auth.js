const initialState = {
  isAuthenticated: false,
  user: null,
}

export default function authReducer(state = initialState, action){
  switch( action.type ){
    case '@@AUTH_SUCCESS':
      return Object.assign({}, state, {isAuthenticated: true, user: action.payload});

    case '@@AUTH_FAIL':
      return Object.assign({}, state, {isAuthenticated: false});

    default:
      return state;
  }
}
