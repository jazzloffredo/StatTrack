export class PlayerFieldingSeason {
    year: number;
    teamName: string;
    position: string;
    games: number;
    gamesStarted: number;
    putouts: number;
    assists: number;
    doublePlays: number;
    errors: number;

    constructor(year: number,
                teamName: string,
                position: string,
                games: number,
                gamesStarted: number,
                putouts: number,
                assists: number,
                doublePlays: number,
                errors: number) {

        this.year = year;
        this.teamName = teamName;
        this.position = position;
        this.games = games;
        this.gamesStarted = gamesStarted;
        this.putouts = putouts;
        this.assists = assists;
        this.doublePlays = doublePlays;
        this.errors = errors;

    }
}
