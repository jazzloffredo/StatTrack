export class UserTwitterFavorites {
    userTeamNames: string[];
    userPlayerNames: string[];

    constructor(userTeamNames: string[], userPlayerNames: string[]) {
        this.userTeamNames = userTeamNames;
        this.userPlayerNames = userPlayerNames;
    }
}
