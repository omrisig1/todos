class Task{
    id : number;
    name : string;
    done : string;
    constructor(name: string,id: number) {
        this.id = id,
        this.name = name;
        this.done = 'false';
    } 
}