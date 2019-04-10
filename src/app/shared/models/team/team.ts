import { TeamSeason } from './team-season';

export class Team {
    name: string;
    mascot: string;
    yearEstablished: number;
    yearEnd: number;
    webPageLink: string;

    teamSeasons: TeamSeason[];

    constructor(name: string, mascot: string, yearEstablished: number, yearEnd: number, webPageLink: string) {
        this.name = name;
        this.mascot = mascot;
        this.yearEstablished = yearEstablished;
        this.yearEnd = yearEnd;
        this.webPageLink = webPageLink;
    }
}
