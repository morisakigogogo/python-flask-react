import { BaseAction, actionTypes } from '../types';
const { GET_COURSES, GET_COURSE } = actionTypes;

export interface IStudy {
  id: number;
  title: string;
}

export interface ILesson {
  id: number;
  title: string;
  studies: Array<IStudy>;
}

export interface ICourse {
  id?: number;
  title?: string;
  description?: string;
  color?: string;
  order?: number;
  lessons?: Array<ILesson>;
}
/*
export interface TypeCourseList {
  id: number;
  title: string;
  description: string;
  color: string;
  order: number;
  lessons: Array<ILesson>;
}
*/
export interface TypeCourses {
  // list: Array<TypeCourseList>;
  list: Array<ICourse>;
}

export interface TypeCourse {
  coursesList: TypeCourses;
  course?: ICourse;
}

export interface TypeCourseOne {
  id: number;
  title: string;
}

let initialState: TypeCourse = {
  coursesList: {
    list: []
  },
  course: {}
};

export default (state: TypeCourse = initialState, action: BaseAction) => {
  switch (action.type) {
    case `${GET_COURSES}_SUCCESS`:
      return { ...state, coursesList: action.payload };
    case `${GET_COURSE}_SUCCESS`:
      return { ...state, course: action.payload.course };
    default:
      return state;
  }
};
