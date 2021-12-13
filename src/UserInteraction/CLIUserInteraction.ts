import { CLIParser } from "../Parser/CLIParser.js";
import { JsonFileStorage } from "../Storage/JsonFileStorage.js";

export class CLIUserInteraction {
    
    storage : JsonFileStorage;
    parser : CLIParser;
    constructor(db : JsonFileStorage) {
        this.storage = db;
        this.parser = new CLIParser();
         
    }

    
    

}