const initialState = {
  compCourses: [],
  currCourses: [],
  currCourse: {},
  currAverage: 0
};

export default function courseReducer(state = initialState, action) {
  switch (action.type) {
    case '@@ADD_COMP_COURSE_SUCCESS':
      return Object.assign({}, state, {
        compCourses: action.payload
      });
    case '@@ADD_COMP_COURSE_FAILURE':
      return Object.assign({}, state, {
        compCourses: action.payload
      });
    case '@@ADD_CURR_CRS_EVAL_SUCCESS':
      return Object.assign({}, state, {
        currCourse: action.payload.currCourse,
        currCourses: action.payload.currCourses
      });
    case '@@ADD_CURR_COURSE_SUCCESS':
      return Object.assign({}, state, {
        currCourses: action.payload
      });
    case '@@ADD_CURR_COURSE_FAILURE':
      return Object.assign({}, state, {
        currCourses: [...state.currCourses, action.payload]
      });
    case '@@SET_CURR_COURSE':
      return Object.assign({}, state, {
        currCourse: action.payload
      });
    case '@@GET_COMP_COURSES_SUCCESS':
      return Object.assign({}, state, {
        compCourses: action.payload
      });
    case '@@GET_COMP_COURSES_FAILURE':
      return Object.assign({}, state, {
        compCourses: action.payload
      });
    case '@@GET_CURR_COURSES_SUCCESS':
      return Object.assign({}, state, {
        currCourses: action.payload
      });
    case '@@GET_CURR_COURSES_FAILURE':
      return Object.assign({}, state, {
        currCourses: action.payload
      });
    case '@@DEL_COMP_COURSE_SUCCESS':
      return Object.assign({}, state, {
        compCourses: action.payload
      });
    case '@@DEL_COMP_COURSE_FAILURE':
      return Object.assign({}, state, {
        compCourses: action.payload
      });
    case '@@DEL_CURR_COURSE_SUCCESS':
      return Object.assign({}, state, {
        currCourses: action.payload
      });
    case '@@DEL_CURR_COURSE_FAILURE':
      return Object.assign({}, state, {
        currCourses: action.payload
      });
    case '@@DEL_CURR_CRS_EVAL_SUCCESS':
      return Object.assign({}, state, {
        currCourse: action.payload.currCourse,
        currCourses: action.payload.currCourses
      });
    case '@@UPDATE_AVERAGE':
      return Object.assign({}, state, {
        currAverage: action.payload
      });
    default:
      return state;
  }
}
