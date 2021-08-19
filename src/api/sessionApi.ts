import { standardPost } from './ajax';

export const createSession = async (email, password): Promise<any> => {
  const data = await standardPost('/api/v1/login', {
    email: email,
    password: password,
  });
  localStorage.setItem("user", JSON.stringify(data));
  return data;
}
