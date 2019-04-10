import { Player } from './player';
import { Season } from '../season/season';
import { PlayerOffensiveGameStats } from './player-offensive-game-stats';

export class PlayerSeason {
    player: Player;
    season: Season;
    universityClass: string;
    offensiveGameStats: PlayerOffensiveGameStats[];

    constructor(player: Player, season: Season, universityClass: string) {
        this.player = player;
        this.season = season;
        this.universityClass = universityClass;
    }
}
