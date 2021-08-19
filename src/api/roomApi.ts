import { standardGet } from './ajax';

export const fetchRooms = async (): Promise<any> => {
  return await standardGet('api/v1/rooms');
}
