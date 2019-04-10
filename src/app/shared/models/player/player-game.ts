import { PlayerOffensiveGameStats } from './player-offensive-game-stats';
import { PlayerDefensiveGameStats } from './player-defensive-game-stats';

export class PlayerGame {
    playerOffensiveGameStats: PlayerOffensiveGameStats;
    playerDefensiveGameStats: PlayerDefensiveGameStats;
    date: Date;

    constructor(playerOffensiveGameStats: PlayerOffensiveGameStats, playerDefensiveGameStats: PlayerDefensiveGameStats, date: Date) {
        this.playerOffensiveGameStats = playerOffensiveGameStats;
        this.playerDefensiveGameStats = playerDefensiveGameStats;
        this.date = date;
    }
}
