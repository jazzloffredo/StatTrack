export class Tweet {
    text: string;
    userScreenName: string;
    userRealName: string;
    profileImageUrl: string;
    postedDate: Date;

    constructor(text: string, userScreenName: string, userRealName: string, profileImageUrl: string, postedDate: Date) {
        this.text = text;
        this.userScreenName = userScreenName;
        this.userRealName = userRealName;
        this.profileImageUrl = profileImageUrl;
        this.postedDate = postedDate;
    }
}
