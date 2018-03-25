import {getCompCourses, getCompCoursesSuccess,
        getCompCoursesfailure, addCompCourse, delCompCourse} from './comp-courses';
import {getCurrCourses, getCurrCoursesSuccess,
        getCurrCoursesFailure, addCurrCourse, delCurrCourse, setCurrCourse} from './curr-courses';
import {getEval, getEvalSuccess, getEvalFailure,
        addCurrCrsEval, delCurrCrsEval} from './evaluations';
import {authSuccess, authFail} from './auth';
import {updateAverage} from './average';

export {
    authSuccess,authFail,

    getCompCourses,getCompCoursesSuccess,getCompCoursesfailure,addCompCourse,
    delCompCourse,

    getCurrCourses,getCurrCoursesSuccess,getCurrCoursesFailure,addCurrCourse,
    delCurrCourse,setCurrCourse,

    getEval,getEvalSuccess,getEvalFailure,addCurrCrsEval,delCurrCrsEval,

    updateAverage,
  };
