import requests from "@/utils/request";

export default {
    addTeam(name) {
        return requests({
            url: '/teams',
            method: 'POST',
            data: {
                name
            }
        });
    },
    queryAllTeams() {
        return requests({
            url: '/teams',
            method: 'GET',
        });
    },
    queryTeamMember(team_id) {
        return requests({
            url: `/team/${team_id}`,
            method: 'GET',
        });
    },
    updateTeamName(team_id,name) {
        return requests({
            url: `/team/${team_id}`,
            method: 'PATCH',
            data:{
                name
            }
        });
    },
    deleteTeam(team_id) {
        return requests({
            url: `/team/${team_id}`,
            method: 'DELETE',
        });
    },
    inviteTeamMember(team,invitee) {
        return requests({
            url: '/team-invites',
            method: 'POST',
            data:{
                team, invitee
            }
        });
    },
    queryInvitation(team) {
        return requests({
            url: '/team-invites',
            method: 'GET',
            data:{
                team
            }
        });
    },
    acceptInvitation(team_id,accept) {
        return requests({
            url: `/team-invite/resolve/${team_id}`,
            method: 'POST',
            data:{
                accept
            }
        });
    },
    addAdmin(team_id,member) {
        return requests({
            url: `/team-invite/resolve/${team_id}/admin/add`,
            method: 'POST',
            data:{
                member
            }
        });
    },
    deleteAdmin(team_id,member) {
        return requests({
            url: `/team-invite/resolve/${team_id}/admin/remove`,
            method: 'POST',
            data:{
                member
            }
        });
    },
    deleteTeamMember(team_id,member) {
        return requests({
            url: `/team-invite/resolve/${team_id}/member/remove`,
            method: 'POST',
            data:{
                member
            }
        });
    },
    queryAllUser(search) {
        console.log(`users?${search}`)
        return requests({
            url: `users?search=${search}`,
            method: 'GET',
        });
    },
}