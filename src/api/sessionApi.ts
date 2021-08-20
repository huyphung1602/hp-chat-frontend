import { standardPost, standardGet } from './ajax';

export const createSession = async (email, password): Promise<any> => {
  const data = await standardPost('/api/v1/login', {
    email: email,
    password: password,
  });
  return data;
}

export const checkLoginStatus = async (): Promise<any> => {
  const data = await standardGet('/api/v1/logged_in');
  return data;
}
