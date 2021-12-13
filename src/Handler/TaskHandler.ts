class TaskHandler{

    interact : userInteraction;
    constructor(userInteraction : userInteraction) {
        this.interact = userInteraction
        
    }
    
    createTask(name: string, id : number){
        return new Task(name, id)
    }

    handleClient(){
        //get args
        var myArgs = process.argv.slice(2);
        //get function and params with user interactions(Task)
        let UserRequest = this.interact.parser.parse(myArgs);
        console.log(UserRequest);
        //parse(cli)
        //validate(cli)
        //activate function
    }
    // HandleClient(args : string[]) {
    //     let operation = args[0];
    //     switch(operation){
    //          case ('create'):
    //              content = await MyReadFile(filename);
    //              arg = checkParam(myArgs[1],['-t','--title']);
    //              if (arg!=-1) {
    //                  title = myArgs[1].split('=')[1];
    //                  content = await MyReadFile(filename);
    //                  id= ++content.last_id
    //                  task = new Task(title,id);
    //                  tasks = await addToTaskList(content.tasks, task);
    //                  content.last_id = id;
    //                  content.tasks = tasks;
    //                  await writeToFile(filename, content);
    //              }
    //              else{
    //                  console.log(showHelp(TODOS_HELP_FILE));
    //              }
    //              break;
    //          case ('update'):
    //                  content = await MyReadFile(filename);
    //                  id =  checkParam(myArgs[1],['--id']);
    //                  id = myArgs[1].split('=')[1];
    //                  //verify id with typescript
    //                  if(myArgs.length>=3){
    //                      status =  checkParam(myArgs[2],['--status']);
    //                      //verify status with typescript
    //                      status = myArgs[2].split('=')[1];
    //                      if (status == -1) {
    //                          console.log(showHelp(TODOS_HELP_FILE));
    //                          break;
    //                      }
    //                  }
    //                  else{
    //                      status = 'false';
    //                  }
    //                  if(id) {
    //                      content.tasks = await updateTask(content.tasks, id, status);
    //                      await writeToFile(filename, content);
    //                  }
    //                  else{
    //                      console.log(showHelp(TODOS_HELP_FILE));
    //                  }
    //                  break;
    //              case ('show'):
    //                  readTasks(filename, myArgs[1]);
    //                  break;    
    //              case ('delete'):
    //                  content = await MyReadFile(filename);
    //                  id = checkParam(myArgs[1],['--id']);
    //                  id = myArgs[1].split('=')[1];
    //                  if(id!= -1) {
    //                      content.tasks = deleteTask(content.tasks, id);
    //                      await writeToFile(filename, content);
    //                  }
    //                  else{
    //                      console.log(showHelp(TODOS_HELP_FILE));
    //                  }
    //                  break;
    //              case ('remove-comepleted'):
    //                   content = await MyReadFile(filename);
    //                   content.tasks = removeCompleted(content.tasks);
    //                   await writeToFile(filename, content);
    //                  break;
    //              case ('help'):
    //              default:
    //                  console.log(showHelp(TODOS_HELP_FILE));
    //                  break;
    //              }
         
         
    //      }
    //  }
    

}


