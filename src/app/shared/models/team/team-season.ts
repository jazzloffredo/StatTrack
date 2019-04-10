import { Season } from '../season/season';
import { TeamGame } from './team-game';

export class TeamSeason {
    coach: string;
    notes: string;

    season: Season;
    teamGames: TeamGame[];

    constructor(coach: string, notes: string, season: Season, teamGames: TeamGame[]) {
        this.coach = coach;
        this.notes = notes;
        this.season = season;
        this.teamGames = teamGames;
    }
}
