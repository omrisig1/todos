
import { JsonFileStorage } from './Storage/JsonFileStorage';
import { CLIUserInteraction } from './UserInteraction/CLIUserInteraction.js';

function init() {
    let storage = new JsonFileStorage('tasks.json');
    let userInteraction = new CLIUserInteraction(storage);
    let taskHandler = new TaskHandler(userInteraction);

    taskHandler.handleClient();
}




