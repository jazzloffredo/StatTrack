export class PlayerPitchingSeason {
    year: number;
    teamName: string;
    wins: number;
    losses: number;
    games: string;
    completeGames: number;
    shutouts: number;
    saves: number;
    hitsAllowed: number;
    homerunsAllowed: number;
    earnedRuns: number;
    ERA: number | string;
    walks: number;
    strikeouts: number;
    opponentAverage: number | string;

    constructor(year: number,
                teamName: string,
                wins: number,
                losses: number,
                games: string,
                completeGames: number,
                shutouts: number,
                saves: number,
                hitsAllowed: number,
                homerunsAllowed: number,
                earnedRuns: number,
                ERA: number,
                walks: number,
                strikeouts: number,
                opponentAverage: number) {

        this.year = year;
        this.teamName = teamName;
        this.wins = wins;
        this.losses = losses;
        this.games = games;
        this.completeGames = completeGames;
        this.shutouts = shutouts;
        this.saves = saves;
        this.hitsAllowed = hitsAllowed;
        this.homerunsAllowed = homerunsAllowed;
        this.earnedRuns = earnedRuns;
        this.ERA = ERA === null ? 'No data.' : ERA;
        this.walks = walks;
        this.strikeouts = strikeouts;
        this.opponentAverage = opponentAverage;

    }
}
