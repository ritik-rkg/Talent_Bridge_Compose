// export const USER_API_END_POINT="http://localhost:8000/api/v1/user";
// export const JOB_API_END_POINT="http://localhost:8000/api/v1/job";
// export const APPLICATION_API_END_POINT="http://localhost:8000/api/v1/application";
// export const COMPANY_API_END_POINT="http://localhost:8000/api/v1/company";

// export const USER_API_END_POINT="http://192.168.49.2:30007/api/v1/user";
// export const JOB_API_END_POINT="http://192.168.49.2:30007/api/v1/job";
// export const APPLICATION_API_END_POINT="http://192.168.49.2:30007/api/v1/application";
// export const COMPANY_API_END_POINT="http://192.168.49.2:30007/api/v1/company";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;
export const USER_API_END_POINT = `${API_BASE_URL}/api/v1/user`;
export const JOB_API_END_POINT = `${API_BASE_URL}/api/v1/job`;
export const APPLICATION_API_END_POINT = `${API_BASE_URL}/api/v1/application`;
export const COMPANY_API_END_POINT = `${API_BASE_URL}/api/v1/company`;
console.log("this is the ur",API_BASE_URL)