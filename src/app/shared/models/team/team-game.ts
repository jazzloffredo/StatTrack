import { TeamGameStats } from './team-game-stats';

export class TeamGame {
    homeTeamGameStats: TeamGameStats;
    awayTeamGameStats: TeamGameStats;
    date: Date;

    constructor(homeTeamGameStats: TeamGameStats, awayTeamGameStats: TeamGameStats, date: Date) {
        this.homeTeamGameStats = homeTeamGameStats;
        this.awayTeamGameStats = awayTeamGameStats;
        this.date = date;
    }
}
