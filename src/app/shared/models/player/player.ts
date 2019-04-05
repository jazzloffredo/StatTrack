export class Player {
    firstName: string;
    lastName: string;
    position: string;
    height: string;
    weight: number;
    webPageLink: string;

    constructor(firstName: string, lastName: string, position: string, height: string, weight: number, webPageLink: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.position = position;
        this.height = height;
        this.weight = weight;
        this.webPageLink = webPageLink;
    }
}
