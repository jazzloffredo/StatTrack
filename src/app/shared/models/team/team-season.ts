export class TeamSeason {
    year: number;
    league: string;
    wins: number;
    losses: number;
    winLossRatio: number | string;
    wsWinner: string;
    runsScored: number;
    runsAgainst: number;
    hittingStats: string;
    hitsAllowed: number;
    errors: number;
    homeAttendance: number;

    constructor(year: number,
                league: string,
                wins: number,
                losses: number,
                winLossRatio: number,
                wsWinner: string,
                runsScored: number,
                runsAgainst: number,
                hittingStats: string,
                hitsAllowed: number,
                errors: number,
                homeAttendance: number) {

        this.year = year;
        this.league = league;
        this.wins = wins;
        this.losses = losses;
        this.winLossRatio = winLossRatio;
        this.wsWinner = wsWinner;
        this.runsScored = runsScored;
        this.runsAgainst = runsAgainst;
        this.hittingStats = hittingStats;
        this.hitsAllowed = hitsAllowed;
        this.errors = errors;
        this.homeAttendance = homeAttendance;
    }
}
