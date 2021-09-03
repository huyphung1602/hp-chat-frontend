import { standardPost } from './ajax';

export const createInvitation = async (roomId): Promise<any> => {
  const data = await standardPost('/api/v1/invitations/create', {
    room_id: roomId,
  });
  return data;
}

export const acceptInvitation = async ({code, id}): Promise<any> => {
  const data = await standardPost('/api/v1/invitations/accept', {
    code,
    id,
  });
  return data;
}
