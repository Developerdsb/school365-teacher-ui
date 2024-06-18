import axios from 'axios';

export const customBase = axios.create({
  baseURL: 'https://api.schooldays365.com/api/teacher'
});

export const adminBase = axios.create({
  baseURL: 'https://api.schooldays365.com/admin'
});

const token = localStorage.getItem('authToken');

export const apiAuth = axios.create({
  baseURL: 'https://api.schooldays365.com/api/teacher',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
});

// export const studentAuth = axios.create({
//   baseURL: 'https://api.schooldays365.com/api/student/',
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${localStorage.getItem('authToken')}`
//   }
// });
export const studentAuth = axios.create({
  baseURL: 'https://api.schooldays365.com/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('authToken')}`
  }
});
