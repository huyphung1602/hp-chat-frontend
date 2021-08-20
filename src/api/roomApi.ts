import { standardGet } from './ajax';

export const fetchRooms = async (): Promise<any> => {
  return await standardGet('api/v1/rooms');
}

export const fetchMessages = async (id): Promise<any> => {
  return await standardGet(`api/v1/rooms/${id}`);
}
