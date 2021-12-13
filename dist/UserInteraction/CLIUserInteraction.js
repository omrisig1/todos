import { CLIParser } from "../Parser/CLIParser.js";
export class CLIUserInteraction {
    storage;
    parser;
    constructor(db) {
        this.storage = db;
        this.parser = new CLIParser();
    }
}
