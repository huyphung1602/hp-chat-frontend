import { standardPost, standardGet } from './ajax';

export const createSession = async (email, password): Promise<any> => {
  const data = await standardPost('/api/v1/login', {
    email: email,
    password: password,
  });
  return data;
}

export const destroySession = async (): Promise<any> => {
  const data = await standardPost('/api/v1/log_out');
  return data;
}

export const fetchCurrentUserInfo = async (): Promise<any> => {
  const data = await standardGet('/api/v1/current_user_info');
  return data;
}
