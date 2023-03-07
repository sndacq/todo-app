import axios from 'axios';
import { ITodo, IComment } from '@/utils/types';

interface ICredential {
  email: string;
  password: string;
}

const BASE_PATH = 'http://localhost:5000/api';
const TODOS_API = `${BASE_PATH}/todos`;

let token;
if (typeof window !== 'undefined') {
  token = localStorage.getItem('token');
}

axios.defaults.headers.common['x-access-token'] = token;

export const loginApi = async (credentials: ICredential) => axios.post(`${BASE_PATH}/login`, {
  ...credentials,
})
  .then((response) => response.data)
  .catch((err) => Promise.reject(err));

export const registerApi = async (credentials: ICredential) => axios.post(`${BASE_PATH}/register`, {
  ...credentials,
})
  .then((response) => response.data)
  .catch((err) => Promise.reject(err));

// Todos APIs
export const getTodosListApi = async () => axios.get(TODOS_API)
  .then((response) => response.data)
  .catch((err) => Promise.reject(err));

export const getTodoDetailsApi = async (todoId: string) => axios.get(`${TODOS_API}/${todoId}`)
  .then((response) => response.data)
  .catch((err) => Promise.reject(err));

export const createTodoApi = async (data: ITodo) => axios.post(TODOS_API, {
  // TODO: add createdAt date here
  ...data,
})
  .then((response) => response.data)
  .catch((err) => Promise.reject(err));

export const updateTodoApi = async (todoId: string, data: ITodo) => axios.put(`${TODOS_API}/${todoId}`, {
  // TODO: add updatedAt date here
  ...data,
})
  .then((response) => response.data)
  .catch((err) => Promise.reject(err));

export const deleteTodoApi = async (todoId: string) => axios.delete(`${TODOS_API}/${todoId}`)
  .then((response) => response.data)
  .catch((err) => Promise.reject(err));

// Comments APIs
export const createCommentApi = async (data: IComment, todoId: string) => axios.post(`${TODOS_API}/${todoId}/comments`, {
  // TODO: add createdAt date here
  ...data,
})
  .then((response) => response.data)
  .catch((err) => Promise.reject(err));

export const getCommentsListApi = async (todoId: string) => axios.get(`${TODOS_API}/${todoId}/comments`)
  .then((response) => response.data)
  .catch((err) => Promise.reject(err));

export const updateCommentApi = async (todoId: string, data: IComment) => axios.put(`${TODOS_API}/${todoId}/comments/${data.id}`, {
  // TODO: add updatedAt date here
  ...data,
})
  .then((response) => response.data)
  .catch((err) => Promise.reject(err));

export const deleteCommentApi = async (todoId: string, commentId: string) => axios.delete(`${TODOS_API}/${todoId}/comments/${commentId}`)
  .then((response) => response.data)
  .catch((err) => Promise.reject(err));
