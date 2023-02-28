import axios from 'axios';

interface ICredentialType {
  email: string;
  password: string;
}

export const loginApi = async (credentials: ICredentialType) => axios.post('http://localhost:3004/login', {
  ...credentials,
})
  .then((response) => response.data)
  .catch((err) => Promise.reject(err));
