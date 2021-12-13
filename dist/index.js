import { TaskHandler } from './Handler/TaskHandler.js';
import { JsonFileStorage } from './Storage/JsonFileStorage.js';
import { CLIUserInteraction } from './UserInteraction/CLIUserInteraction.js';
function init() {
    let storage = new JsonFileStorage('tasks.json');
    console.log("111");
    let userInteraction = new CLIUserInteraction(storage);
    console.log("222");
    let taskHandler = new TaskHandler(userInteraction);
    console.log("33");
    taskHandler.handleClient();
}
init();
