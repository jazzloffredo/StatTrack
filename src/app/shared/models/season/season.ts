export class Season {
    startYear: number;

    constructor(startYear: number) {
        this.startYear = startYear;
    }

    public equals(otherSeason: Season) {
        if (this.startYear === otherSeason.startYear) {
            return true;
        }

        return false;
    }
}
