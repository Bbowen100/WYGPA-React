import axios from 'axios';

export const getCurrCourses = () => {
  return dispatch => {
    axios.get('/api/curr-courses').then(resp => {
      if (resp.data) {
        dispatch({
          type: '@@GET_CURR_COURSES_SUCCESS',
          payload: resp.data.courses
        });
      }
    });
  };
};

export const getCurrCoursesSuccess = courses => {
  return {
    type: '@@GET_CURR_COURSES_SUCCESS',
    payload: courses
  };
};

export const getCurrCoursesFailure = error => {
  return {
    type: '@@GET_CURR_COURSES_FAILURE',
    payload: error
  };
};

export const addCurrCourse = course => {
  let request = axios.post('/api/curr-courses', { currCourse: course });
  return dispatch => {
    request.then(resp => {
      dispatch({
        type: '@@ADD_CURR_COURSE_SUCCESS',
        payload: resp.data.courses
      });
    });
  };
};

export const addCurrCourseSuccess = course => {
  return {
    type: '@@ADD_CURR_COURSE_SUCCESS',
    payload: course
  };
};

export const addCurrCourseFailure = course => {
  return {
    type: '@@ADD_CURR_COURSE_FAILURE',
    payload: course
  };
};

export const delCurrCourse = course_id => {
  let request = axios.delete('/api/curr-courses?course_id=' + course_id);
  return dispatch => {
    request.then(resp => {
      dispatch({
        type: '@@DEL_CURR_COURSE_SUCCESS',
        payload: resp.data.courses
      });
    });
  };
};

export const delCurrCourseSuccess = course => {
  return {
    type: '@@DEL_CURR_COURSE_SUCCESS',
    payload: course
  };
};

export const delCurrCourseFailure = course => {
  return {
    type: '@@DEL_CURR_COURSE_FAILURE',
    payload: course
  };
};

export const setCurrCourse = course => {
  return {
    type: '@@SET_CURR_COURSE',
    payload: course
  };
};
