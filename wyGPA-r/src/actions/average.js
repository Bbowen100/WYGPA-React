export const updateAverage = (average)=>{
  return {
    type: '@@UPDATE_AVERAGE',
    payload: average,
  }
}
