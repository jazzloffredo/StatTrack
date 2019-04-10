import { Team } from '../team/team';
import { Player } from '../player/player';
import { TeamGame } from '../team/team-game';

export class User {
    username: string;
    email: string;
    firstName: string;
    lastName: string;

    userTeamFavorites: Team[];
    userGameFavorites: TeamGame[];
    userPlayerFavorites: Player[];

    constructor(username: string, email: string, firstName: string, lastName: string) {
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
