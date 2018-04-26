import axios from 'axios';

export const getCompCourses = () => {
  let request = axios.get('/api/comp-courses');
  return dispatch => {
    request.then(resp => {
      if (resp.data) {
        dispatch({
          type: '@@GET_COMP_COURSES_SUCCESS',
          payload: resp.data.courses
        });
      }
    });
  };
};

export const getCompCoursesSuccess = courses => {
  return {
    type: '@@GET_COMP_COURSES_SUCCESS',
    payload: courses
  };
};

export const getCompCoursesFailure = error => {
  return {
    type: '@@GET_COMP_COURSES_FAILURE',
    payload: error
  };
};

export const addCompCourse = compCourse => {
  let request = axios.post('/api/comp-courses', { compCourse });
  return dispatch => {
    request.then(resp => {
      dispatch({
        type: '@@ADD_COMP_COURSE_SUCCESS',
        payload: resp.data.courses
      });
    });
  };
};

export const addCompCourseSuccess = courses => {
  return {
    type: '@@ADD_COMP_COURSE_SUCCESS',
    payload: courses
  };
};

export const addCompCourseFailure = error => {
  return {
    type: '@@ADD_COMP_COURSE_FAILURE',
    payload: error
  };
};

export const delCompCourse = course_id => {
  let request = axios.delete(`/api/comp-courses?course_id=${course_id}`);
  return dispatch => {
    request.then(resp => {
      dispatch({
        type: '@@DEL_COMP_COURSE_SUCCESS',
        payload: resp.data.courses
      });
    });
  };
};

export const delCompCourseSuccess = courses => {
  return {
    type: '@@DEL_COMP_COURSE_SUCCESS',
    payload: courses
  };
};

export const delCompCourseFailure = error => {
  return {
    type: '@@DEL_COMPCOURSE_FAILURE',
    payload: error
  };
};
