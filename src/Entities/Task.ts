
class Task{
    name : string;
    done : string;
    id:number;
    constructor(name: string,id: number) {
        this.id = id,
        this.name = name;
        this.done = 'false';
        } 
    }

export {Task}