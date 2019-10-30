export class Constants {
    static responses: Qresponse[] = [
        { qId: 1, ans: 'yes' },
        { qId: 2, ans: 'no' },
        { qId: 3, ans: 'both' }
    ];
}
export interface Qresponse {
    qId: number;
    ans: string;
}
