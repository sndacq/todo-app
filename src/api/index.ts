import axios from 'axios';
import { ITodo } from '@/utils/types';

interface ICredential {
  email: string;
  password: string;
}

export const loginApi = async (credentials: ICredential) => axios.post('http://localhost:3004/login', {
  ...credentials,
})
  .then((response) => response.data)
  .catch((err) => Promise.reject(err));

export const registerApi = async (credentials: ICredential) => axios.post('http://localhost:3004/register', {
  ...credentials,
})
  .then((response) => response.data)
  .catch((err) => Promise.reject(err));

export const getTodosListApi = async (userId: string) => axios.get(`http://localhost:3004/todos?userId=${userId}`)
  .then((response) => response.data)
  .catch((err) => Promise.reject(err));

export const getTodoDetailsApi = async (todoId: string) => axios.get(`http://localhost:3004/todos/${todoId}`)
  .then((response) => response.data)
  .catch((err) => Promise.reject(err));

export const createTodoApi = async (data: ITodo) => axios.post('http://localhost:3004/todos', {
  // TODO: add createdAt date here
  ...data,
})
  .then((response) => response.data)
  .catch((err) => Promise.reject(err));

export const udateTodoApi = async (todoId: string, data: ITodo) => axios.patch(`http://localhost:3004/todos/${todoId}`, {
  // TODO: add updatedAt date here
  ...data,
})
  .then((response) => response.data)
  .catch((err) => Promise.reject(err));

export const deleteTodoApi = async (todoId: string) => axios.delete(`http://localhost:3004/todos/${todoId}`)
  .then((response) => response.data)
  .catch((err) => Promise.reject(err));
