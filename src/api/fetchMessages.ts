import axios from 'axios';

export default async (): Promise<any> => {
  const { data } = await axios.get('messages');
  return data;
}