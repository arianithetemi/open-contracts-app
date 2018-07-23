export class Comment {
    _id?: string;
    userId: string;
    comment: string;
    contractId: string;
    dateTime: string;
    reply?: {
        _id?: string,
        replyUserId: string,
        replyComment: string,
        replyDateTime: string
    };
    constructor() {
        this._id = '';
        this.userId = '';
        this.comment = '';
        this.contractId = '';
        this.dateTime = '';
        this.reply = {
            _id: null,
            replyUserId: null,
            replyComment: null,
            replyDateTime: null
        };
}
}
