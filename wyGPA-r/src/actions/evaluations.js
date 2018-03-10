import axios from 'axios';

export const getEval = (course_id)=>{
  return{
    type:'@@GET_EVAL_REQUEST',
    payload: course_id
  }
}

export const getEvalSuccess = (courses)=>{
  return{
    type:'@@GET_EVAL_SUCCESS',
    payload: courses,
  }
}

export const getEvalFailure = (error)=>{
  return{
    type: '@@GET_EVAL_FAILURE',
    payload: error
  }
}

export const addCurrCrsEval = (assign)=>{
  let request = axios.post('/api/curr-courses/evals', assign);
  return((dispatch)=>{
    request.then((data)=>{
      let index = data.data.courses
        .findIndex((course)=> course._id === assign.course_id);
      let currCourse = data.data.courses[index];
      let currCourses = data.data.courses;
      dispatch({
        type: '@@ADD_CURR_CRS_EVAL_SUCCESS',
        payload: {currCourse, currCourses}
      });
    });
  });

}

export const delCurrCrsEval = (eval_id, course_id)=>{
  let request = axios.delete(`/api/curr-courses/evals?course_id=${course_id}&eval_id=${eval_id}`);
  return((dispatch)=>{
    request.then((data)=>{
      let index = data.data.courses
        .findIndex((course)=> course._id === course_id);
      let currCourse = data.data.courses[index];
      let currCourses = data.data.courses;
      dispatch({
        type: '@@DEL_CURR_CRS_EVAL_SUCCESS',
        payload: {currCourse, currCourses},
      });
    });
  });
}
