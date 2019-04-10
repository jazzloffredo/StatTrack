export class PlayerDefensiveGameStats {
    soloTackles: number;
    assistedTackles: number;
    totalTackles: number;
    sacks: number;
    interceptions: number;
    interceptionReturnYards: number;
    interceptionsReturnTDs: number;
    passesDefended: number;
    fumblesRecovered: number;
    fumbleReturnYards: number;
    fumbleReturnTDs: number;

    constructor(soloTackles: number,
                assistedTackles: number,
                sacks: number,
                interceptions: number,
                interceptionReturnYards: number,
                interceptionReturnTDs: number,
                passesDefended: number,
                fumblesRecovered: number,
                fumbleReturnYards: number,
                fumbleReturnTDs: number) {
                    this.soloTackles = soloTackles;
                    this.assistedTackles = assistedTackles;
                    this.totalTackles = soloTackles + assistedTackles;
                    this.sacks = sacks;
                    this.interceptions = interceptions;
                    this.interceptionReturnYards = interceptionReturnYards;
                    this.interceptionsReturnTDs = interceptionReturnTDs;
                    this.passesDefended = passesDefended;
                    this.fumblesRecovered = fumblesRecovered;
                    this.fumbleReturnYards = fumbleReturnYards;
                    this.fumbleReturnTDs = fumbleReturnTDs;
                }
}
