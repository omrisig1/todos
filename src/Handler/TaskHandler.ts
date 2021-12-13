interface UserRequest {
    main_function : string,
    functions : Request[]
}
class TaskHandler{
    interact : userInteraction;
    constructor(userInteraction : userInteraction) {
        this.interact = userInteraction
        
    }
    
    createTask(name: string, id : number){
        return new Task(name, id)
    }

    handleClient(){
        var myArgs = process.argv.slice(2);
        let UserRequest = this.interact.parser.parse(myArgs);
        console.log(UserRequest);
        TaskValidator.CLIValidation(UserRequest.main_function, UserRequest.functions);
        this.activate_function(UserRequest);
    }
    
    activate_function(request : UserRequest){
        switch(request.main_function){
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

    create(elements : Request[]){}
    update(elements : Request[]){}
    show(elements : Request[]){}
    delete(elements : Request[]){}
    remove(elements : Request[]){}

}


