import { Task } from "../Entities/Task.js";
export class TaskHandler {
    interact;
    constructor(userInteraction) {
        this.interact = userInteraction;
    }
    createTask(name, id) {
        return new Task(name, id);
    }
    handleClient() {
        console.log("USER REQUEST:");
        var myArgs = process.argv.slice(2);
        let UserRequest = this.interact.parser.parse(myArgs);
        console.log("USER REQUEST:", UserRequest);
        // TaskValidator.CLIValidation(UserRequest.main_function, UserRequest.functions);
        // this.activate_function(UserRequest);
    }
    activate_function(request) {
        switch (request.main_function) {
            case 'create':
                this.create(request.functions);
                break;
            case 'update':
                this.update(request.functions);
                break;
            case 'show':
                this.show(request.functions);
                break;
            case 'delete':
                this.delete(request.functions);
                break;
            case 'remove-completed':
                this.remove(request.functions);
                break;
        }
    }
    create(elements) { }
    update(elements) { }
    show(elements) { }
    delete(elements) { }
    remove(elements) { }
}
