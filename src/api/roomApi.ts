import { standardGet, standardPost } from './ajax';

export const fetchRooms = async (): Promise<any> => {
  return await standardGet('api/v1/rooms');
}

export const fetchMessages = async (id): Promise<any> => {
  return await standardGet(`api/v1/rooms/${id}`);
}

export const createRoom = async (room): Promise<any> => {
  return await standardPost('api/v1/rooms', {
    room,
  });
}
