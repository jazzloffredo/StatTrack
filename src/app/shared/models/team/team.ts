export class Team {
    teamID: string;
    teamName: string;
    isActive: string;
    totalGames: number;
    totalWins: number;
    totalLosses: number;
    winLossRatio: number;
    leagueWins: number;
    worldSeriesWins: number;
    favorite = false;

    constructor(teamID: string,
                teamName: string,
                isActive: string,
                totalGames: number,
                totalWins: number,
                totalLosses: number,
                winLossRatio: number,
                leagueWins: number,
                worldSeriesWins: number) {

        this.teamID = teamID;
        this.teamName = teamName;
        this.isActive = isActive;
        this.totalGames = totalGames;
        this.totalWins = totalWins;
        this.totalLosses = totalLosses;
        this.winLossRatio = winLossRatio;
        this.leagueWins = leagueWins;
        this.worldSeriesWins = worldSeriesWins;
    }
}
