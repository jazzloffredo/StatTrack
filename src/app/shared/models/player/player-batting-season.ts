export class PlayerBattingSeason {
    year: number;
    teamName: string;
    games: number;
    atBats: number;
    hits: number;
    battingAverage: number | string;
    RBIs: number;
    baseOnBalls: number;
    hittingStats: string;
    strikeouts: number;
    runs: number;
    stolenBases: number;
    hitByPitch: number;
    sacFly: number;

    constructor(year: number,
                teamName: string,
                games: number,
                atBats: number,
                hits: number,
                battingAverage: number,
                RBIs: number,
                baseOnBalls: number,
                hittingStats: string,
                strikeouts: number,
                runs: number,
                stolenBases: number,
                hitByPitch: number,
                sacFly: number) {

        this.year = year;
        this.teamName = teamName;
        this.games = games;
        this.atBats = atBats;
        this.hits = hits;
        this.battingAverage = battingAverage;
        this.RBIs = RBIs;
        this.baseOnBalls = baseOnBalls;
        this.hittingStats = hittingStats;
        this.strikeouts = strikeouts;
        this.runs = runs;
        this.stolenBases = stolenBases;
        this.hitByPitch = hitByPitch;
        this.sacFly = sacFly;
    }
}
