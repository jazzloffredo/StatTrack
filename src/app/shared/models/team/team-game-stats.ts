export class TeamGameStats {
    teamSeasonID: number;
    oppenentTeamSeasonID: number;
    date: Date;
    pointsScored: number;
    winLossTie: string;
    firstDowns: number;
    rushAttempts: number;
    rushYards: number;
    rushTDs: number;
    passCompletions: number;
    passAttempts: number;
    passYards: number;
    passTDs: number;
    passInterceptions: number;
    totalYards: number;
    turnovers: number;
    penalties: number;
    lostYards: number;

    constructor(teamSeasonID: number,
                opponentTeamSeasonID: number,
                date: Date,
                pointsScored: number,
                winLossTie: string,
                firstDowns: number,
                rushAttempts: number,
                rushYards: number,
                rushTDs: number,
                passCompletions: number,
                passAttempts: number,
                passYards: number,
                passTDs: number,
                passInterceptions: number,
                turnovers: number,
                penalties: number,
                lostYards: number) {
                    this.teamSeasonID = teamSeasonID;
                    this.oppenentTeamSeasonID = opponentTeamSeasonID;
                    this.date = date;
                    this.pointsScored = pointsScored;
                    this.winLossTie = winLossTie;
                    this.firstDowns = firstDowns;
                    this.rushAttempts = rushAttempts;
                    this.rushYards = rushYards;
                    this.rushTDs = rushTDs;
                    this.passCompletions = passCompletions;
                    this.passAttempts = passAttempts;
                    this.passYards = passYards;
                    this.passTDs = passTDs;
                    this.passInterceptions = passInterceptions;
                    this.totalYards = rushYards + passYards;
                    this.turnovers = turnovers;
                    this.penalties = penalties;
                    this.lostYards = lostYards;
                }

    public equalsOpponent(otherTeamGameStats: TeamGameStats) {
        if (otherTeamGameStats.teamSeasonID === this.oppenentTeamSeasonID && otherTeamGameStats.date === this.date) {
            return true;
        }

        return false;
    }
}
