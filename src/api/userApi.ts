import axios from 'axios';

export const createUser = async (name, email, password): Promise<any> => {
  const { data } = await axios.post('sign_up', {
    name: name,
    email: email,
    password: password,
  })

  return data;
}
