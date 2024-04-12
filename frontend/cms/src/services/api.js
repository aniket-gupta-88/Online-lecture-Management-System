import axios from "axios";
import {
  LOGIN,
  REGISTER,
  CREATECOURSE,
  CREATELECTURE,
  GETALLCOURSE,
  GETCOURSEDETAILS,
  GETALLINSTRUCTORS,
  GETALLLECTURES,
  GETLECTUREDETAILS,
  GETPROFILE,
  DELETECOURSE,
  DELETELECTURE,
} from "../services/apiConstants.js";

export const login = async (data) => {
  return axios.post(LOGIN, data);
};

export const register = async (data) => {
  return axios.post(REGISTER, data);
};

export const createCourse = async (data) => {
  let token = getToken();
  return axios.post(CREATECOURSE, data, {
    headers: {
      auth: token,
    },
  });
};

export const createLecture = async (data) => {
  let token = getToken();
  return axios.post(CREATELECTURE, data, {
    headers: {
      auth: token,
    },
  });
};

export const getAllCourses = async () => {
  let token = getToken();
  return axios.get(GETALLCOURSE, {
    headers: {
      auth: token,
    },
  });
};

export const getAllLectures = async () => {
  let token = getToken();
  return axios.get(GETALLLECTURES, {
    headers: {
      auth: token,
    },
  });
};

export const getAllInstructors = async () => {
  let token = getToken();
  return axios.get(GETALLINSTRUCTORS, {
    headers: {
      auth: token,
    },
  });
};

export const getCourseDetails = async (courseId) => {
  let token = getToken();
  return axios.get(`${GETCOURSEDETAILS}/${courseId}`, {
    headers: {
      auth: token,
    },
  });
};

export const getLectureDetails = async (lectureId) => {
  let token = getToken();
  return axios.get(`${GETLECTUREDETAILS}/${lectureId}`, {
    headers: {
      auth: token,
    },
  });
};

export const getProfile = async () => {
  let token = getToken();
  return axios.get(GETPROFILE, {
    headers: {
      auth: token,
    },
  });
};

export const deleteCourse = async (courseId) => {
  let token = getToken();
  console.log(" checkign the api ", DELETECOURSE, courseId);
  return axios.delete(`${DELETECOURSE}/${courseId}`, {
    headers: {
      auth: token,
    },
  });
};

export const deleteLecture = async (lectureId) => {
  let token = getToken();
  return axios.delete(`${DELETELECTURE}/${lectureId}`, {
    headers: {
      auth: token,
    },
  });
};

export function getToken() {
  let user = localStorage.getItem("user");
  if (!user) return;
  const userObj = JSON.parse(user);
  return userObj.token;
}
