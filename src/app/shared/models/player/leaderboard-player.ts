export class LeaderboardPlayer {
    playerID: string;
    rank: number;
    name: string;
    stat: string | number;
    favorite = false;

    constructor(playerID: string, rank: number, name: string, stat: string | number) {
        this.playerID = playerID;
        this.rank = rank;
        this.name = name;
        this.stat = stat;
    }
}
