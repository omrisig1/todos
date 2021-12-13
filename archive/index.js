import fs, { copyFileSync } from "fs";
import fs1 from "fs/promises";

let TODOS_HELP_FILE = 'help.txt';

class Task  {
    constructor(name,id) {
        this.id = id,
        this.name = name;
        this.done = 'false';
    }
  };

async function runTodos(myArgs){
    let filename = 'tasks.json';
    let content;
    let tasks;
    let task;
    let id;
    let title;
    let arg; 
    let status;

    await createFileIfNotExists(filename);

    let base_function = myArgs[0];
    switch(base_function){
        case ('create'):
            content = await MyReadFile(filename);
            arg = checkParam(myArgs[1],['-t','--title']);
            if (arg!=-1) {
                title = myArgs[1].split('=')[1];
                content = await MyReadFile(filename);
                id= ++content.last_id
                task = new Task(title,id);
                tasks = await addToTaskList(content.tasks, task);
                content.last_id = id;
                content.tasks = tasks;
                await writeToFile(filename, content);
            }
            else{
                console.log(showHelp(TODOS_HELP_FILE));
            }
            break;
        case ('update'):
            content = await MyReadFile(filename);
            id =  checkParam(myArgs[1],['--id']);
            id = myArgs[1].split('=')[1];
            //verify id with typescript
            if(myArgs.length>=3){
                status =  checkParam(myArgs[2],['--status']);
                //verify status with typescript
                status = myArgs[2].split('=')[1];
                if (status == -1) {
                    console.log(showHelp(TODOS_HELP_FILE));
                    break;
                }
            }
            else{
                status = 'false';
            }
            if(id) {
                content.tasks = await updateTask(content.tasks, id, status);
                await writeToFile(filename, content);
            }
            else{
                console.log(showHelp(TODOS_HELP_FILE));
            }
            break;
        case ('show'):
            readTasks(filename, myArgs[1]);
            break;    
        case ('delete'):
            content = await MyReadFile(filename);
            id = checkParam(myArgs[1],['--id']);
            id = myArgs[1].split('=')[1];
            if(id!= -1) {
                content.tasks = deleteTask(content.tasks, id);
                await writeToFile(filename, content);
            }
            else{
                console.log(showHelp(TODOS_HELP_FILE));
            }
            break;
        case ('remove-comepleted'):
             content = await MyReadFile(filename);
             content.tasks = removeCompleted(content.tasks);
             await writeToFile(filename, content);
            break;
        case ('help'):
        default:
            console.log(showHelp(TODOS_HELP_FILE));
            break;
        }


}
async function start() {
    var myArgs = process.argv.slice(2);
    switch(myArgs[0]){
        case 'todos':
            runTodos(myArgs.slice(1));
            break;
        case 'other_app':
        default:
            break;
    }

}
await start();

async function addToTaskList(content, taskname){
    content.push(taskname);
    return content;

}
function updateTask(tasklist, task_id,status="false"){

    let foundIndex = -1;
    for (let i=0 ; i<tasklist.length; i++) {
        if(tasklist[i].id == task_id) {
            tasklist[i].done = status;
            break;
        }
    }
    if(foundIndex == -1){
        return tasklist;
    }

    return tasklist;
}

async function readTasks(filename, filter = null){
     let argument = checkParam(filter, ['--filter', '-f']);

    if(filter ){
        if(argument != -1){
            filter = filter.split('=')[1];

        }
        else{
            console.log('Bad argument entered');
            showHelp(TODOS_HELP_FILE);
            return;
        }
    }
    else{
        filter = 'all';
    }
    let content = await MyReadFile(filename);

    switch(filter){
        case('completed'):
            content = content.tasks.filter((element)=>element.done == 'true');
            break;
        case('open'):
            content = content.tasks.filter((element)=>element.done == 'false');
            break
        case('all'):
        default:
            break;
    }
    console.log(content);

}

function removeCompleted(content){
    content = content.filter(element => element.done == false);
    return content;
}

function deleteTask(content, task_id){
    let foundIndex = -1;
    for (let i=0 ; i<content.length; i++) {
        if(content[i].id == task_id) {
            content.splice(i,1);
            return content;

        }
    }
    if(foundIndex == -1){
        return content;
    }
    return content;

}

async function showHelp(filename){
    //console.log('help menu:\n your options are:\n \"create\" and task name\n \"update\" and task name in order to set to completed\n \"read all\" to see all tasks, all is the default\n \"read completed\" to see commpleted tasks\n \"read open\" to see open tasks\n \"delete\" and task name to delete a specific task\n \"remove-completed\" to remove completed tasks from list\n \"help\" to see your options\n');
    let content = await MyReadFile(filename, false);
    console.log(content);
}
//Add parameters to display either all tasks, completed tasks or open tasks
async function createFileIfNotExists(filename){
    if ( fs.existsSync(filename)) {
        return 1;
    }

    let Todo = {
        last_id : 0,
        tasks : []

    }

    await fs1.writeFile(filename, JSON.stringify(Todo), err => {
        if (err) {
            console.error(err);
            return 0;
        }
        return 1;
    })
   
}

async function MyReadFile(filename, json = true) {
    if(json){
        return JSON.parse(( fs.readFileSync(filename, 'utf-8' , (err, data) => {
            if (err) {
              console.error(err)
            }
          })))
    }
    else{
        return (await fs.readFileSync(filename, 'utf-8' , (err, data) => {
            if (err) {
              console.error(err)
            }
          }))
    }

}

async function writeToFile(filename, content) {
    await createFileIfNotExists(filename);
    await fs1.writeFile(filename, JSON.stringify(content,null,4), err => {
        if (err) {
          console.error(err)
          return 0;
        }
        return 1;
      })
}
function checkParam(argument, paramList) {
   
    if(argument){
        for (const element of paramList) {
            let length = element.length;
            if(argument.substring(0,length)== element){

                return element;
            }
        }
    }
    return -1;
}


//src
    //--index.js
    //storage
    //util
    //

    functions:
    // createFileIfNotExists
    // MyReadFile
    // checkParam - validation (check param and also need to check function)
    // writeToFile
    // task manipulation - remove from tasks, add to tasks, update task, remove completed, filter