export class Task {
    public id: string;
    public taskName: string;
    public taskDetails: string;
    public isCompleted: boolean;
    constructor(name:string, detail:string){
        this.taskName = name;
        this.taskDetails = detail;
    }
}