export const authSuccess = (user)=>{
  return {
    type: '@@AUTH_SUCCESS',
    payload: user,
  }
}

export const authFail = ()=>{
  return {
    type: '@@AUTH_FAIL',
  }
}
