import { Team } from '../team/team';
import { Player } from '../player/player';
import { TeamGame } from '../team/team-game';

export class RegisteredUser {
    firstName: string;
    lastName: string;
    username: string;
    email: string;

    userTeamFavorites: Team[];
    userGameFavorites: TeamGame[];
    userPlayerFavorites: Player[];

    constructor(firstName: string, lastName: string, username: string, email: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
    }
}
