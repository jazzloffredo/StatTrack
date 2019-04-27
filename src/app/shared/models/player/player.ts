export class Player {
    playerID: string;
    firstName: string;
    lastName: string;
    height: string;
    totalGames: number;
    totalRuns: number;
    totalHits: number;
    totalRBIs: number;
    totalHomeruns: number;
    totalHomerunsRank: number;
    favorite: boolean;

    constructor(playerID: string,
                firstName: string,
                lastName: string,
                height: string,
                totalGames: number,
                totalRuns: number,
                totalHits: number,
                totalRBIs: number,
                totalHomeruns: number,
                totalHomerunsRank: number) {

        this.playerID = playerID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.height = height;
        this.totalGames = totalGames;
        this.totalRuns = totalRuns;
        this.totalHits = totalHits;
        this.totalRBIs = totalRBIs;
        this.totalHomeruns = totalHomeruns;
        this.totalHomerunsRank = totalHomerunsRank;
    }


}
