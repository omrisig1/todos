class Task {
    name;
    done;
    id;
    constructor(name, id) {
        this.id = id,
            this.name = name;
        this.done = 'false';
    }
}
export { Task };
