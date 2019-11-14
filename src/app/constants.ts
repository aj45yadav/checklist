export class Constants {
    static responses: Qresponse[] = [
        { qId: '1', ans: 'yes' },
        { qId: '2', ans: 'no' },
    ];
}
export interface Qresponse {
    qId: string;
    ans: string;
}
