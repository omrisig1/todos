import fs, { copyFileSync } from "fs";
let TODOS_HELP_FILE = 'help.txt';

let Task = class {
    constructor(name) {
      this.name = name;
      this.done = false;
    }
  };

async function runTodos(myArgs){
    let filename = 'tasks.json';
    let content;
    let tasks;
    let task;

    await createFileIfNotExists(filename);
    switch(myArgs[0]){
        case ('create'):
            if(myArgs.slice(1).join(' ')){
                task = new Task(myArgs.slice(1).join(' '));
                content = await readTasksFile(filename);
                tasks = await addToTaskList(content, task);
                await writeToFile(filename, tasks);
            }
            break;
        case ('update'):
            content = await readTasksFile(filename);
            tasks = await updateTask(content, myArgs[1]);
            await writeToFile(filename, tasks);
            break;
        case ('show'):
            readTasks(filename, myArgs[1]);
            break;    
        case ('delete'):
            content = await readTasksFile(filename);
            content = deleteTask(content, myArgs[1]);
            await writeToFile(filename, content);
            break;
        case ('remove-comepleted'):
             content = await readTasksFile(filename);
             content = removeCompleted(content);
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
function updateTask(tasklist, taskname){
    const foundIndex = tasklist.findIndex(element => element.name == taskname);
    if(foundIndex == -1){
        return tasklist;
    }
    tasklist[foundIndex].done = true;
    return tasklist;
}

async function readTasks(filename, filter = null){
     let argument = checkParam(filter, ['--filter', '-f']);
    if(filter ){
        if(argument){
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
    let content = await readTasksFile(filename);
    switch(filter){
        case('completed'):
            content = content.filter((element)=>element.done == true);
            break;
        case('open'):
            content = content.filter((element)=>element.done == false);
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


function deleteTask(content, taskname){
    const foundIndex = content.findIndex(element => element.name == taskname);
    if(foundIndex == -1){
        return content;
    }
    content.splice(foundIndex,1);
    return content;
}

async function showHelp(filename){
    //console.log('help menu:\n your options are:\n \"create\" and task name\n \"update\" and task name in order to set to completed\n \"read all\" to see all tasks, all is the default\n \"read completed\" to see commpleted tasks\n \"read open\" to see open tasks\n \"delete\" and task name to delete a specific task\n \"remove-completed\" to remove completed tasks from list\n \"help\" to see your options\n');
    let content = await MyReadFile(filename);
    console.log(content);
}
//Add parameters to display either all tasks, completed tasks or open tasks
async function createFileIfNotExists(filename){
    if ( fs.existsSync(filename)) {
        return 1;
    }
    fs.writeFile(filename, JSON.stringify(''), err => {
        if (err) {
          console.error(err)
          return 0;
        }
        return 1;
      })

}

async function readTasksFile(filename) {
     return  JSON.parse(await fs.readFileSync(filename, 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
        }
      }))

}

async function MyReadFile(filename) {
    return  (await fs.readFileSync(filename, 'utf8' , (err, data) => {
       if (err) {
         console.error(err)
       }
     }))

}

async function writeToFile(filename, content) {
    await createFileIfNotExists(filename);
    fs.writeFile(filename, JSON.stringify(content,null,4), err => {
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
    return false;
}