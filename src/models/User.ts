export class User {
    public winsCount: number;
    public rooms: number[];
    public name: string;
    public password: string;
    public index: string;

    constructor(  name: string, password: string, id: string, ) {
        this.winsCount = 0;
        this.rooms = [];
        this.name = name;
        this.password = password;
        this.index = id;

    }
    public createGameRoom() { }
    public joinGameRoom (){}
}