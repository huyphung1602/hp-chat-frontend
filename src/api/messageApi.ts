import { standardGet } from './ajax';

export const fetchMessages = async (): Promise<any> => {
  return await standardGet('api/v1/messages');
}
