import { standardPost } from './ajax';

export const createUser = async (name, email, password): Promise<any> => {
  const data = await standardPost('api/v1/sign_up', {
    name: name,
    email: email,
    password: password,
  });
  return data;
}
