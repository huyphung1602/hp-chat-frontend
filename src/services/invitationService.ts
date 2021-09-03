import { acceptInvitation as acceptInvitationApi } from '../api/invitationApi';

export const acceptInvitation = async (store): Promise<any> => {
  if (store.getters.invitation.code !== '') {
    const invitation = store.getters.invitation;
    const data = await acceptInvitationApi({ code: invitation.code, id: invitation.id });
    if (data.room_id) {
      store.commit('setActiveRoomId', data.room_id);
    }
    store.commit('setInvitation', {code: '', id: ''});
  }
}
