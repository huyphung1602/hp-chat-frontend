import { standardPost } from './ajax';

export const createMessage = async (content, roomId): Promise<any> => {
  return await standardPost('api/v1/messages', {
    content,
    room_id: roomId,
  });
}
